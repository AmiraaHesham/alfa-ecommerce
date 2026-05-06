"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { FaCircle, FaTimes } from "react-icons/fa";
import {
  getCategories,
  getProductDetails,
  getThumbnailUrl,
} from "../../../../utils/functions.jsx";
import { postRequest, putRequest } from "../../../../utils/requestsUtils.js";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import { useIdContext } from "../../../../context/idContext.jsx";
import { GoStarFill } from "react-icons/go";
import { toast } from "react-toastify";
import Select from "react-select";

export default function FormProduct({ isFormOpen, setIsFormOpen }) {
  const [enabledActive, setEnabledActive] = useState(true);
  const [enabledFavorite, setEnabledFavorite] = useState(false);
  const [enabledAvailable, setEnabledAvailable] = useState(true);

  const { triggerRefresh } = useRefresh();
  const { selectedProductId, setSelectedProductId } = useIdContext();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const isBase64 = (src) => {
    return typeof src === "string" && src.startsWith("data:");
  };
  const images = [
    { key: "mainImage", label: "mainImage", inputId: "fileInput-mainImage" },
    { key: "img2", label: "img2", inputId: "fileInput-img2" },
    { key: "img3", label: "img3", inputId: "fileInput-img3" },
  ];

  const isEditMode = selectedProductId !== null;
  const [product, setProduct] = useState({
    nameEn: "",
    nameAr: "",
    price: null,
    oldPrice: null,
    descriptionEn: "",
    descriptionAr: "",
    category: {
      id: null,
      nameAr: "",
      nameEn: "",
    },
    code: "",
    mainImage: "",
    mainImagefile: "",
    img2: "",
    img2file: "",
    img2ID: null,
    img3: "",
    img3file: "",
    img3ID: null,
  });

  const [itemCategory, setItemCategory] = useState([]);

  const handleUpload = (e, photoKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProduct((prev) => ({
        ...prev,
        [photoKey]: reader.result,
        [photoKey + "file"]: file,
        [photoKey + "ID"]: null,
      }));
    };
    reader.readAsDataURL(file);
  };

  // جلب الفئات
  const showCategories = async () => {
    try {
      const resData = await getCategories();
      setItemCategory(resData.data || []);
    } catch (error) {
    }
  };

  // التحقق من صحة البيانات
  // const validateForm = () => {
  //   if (!product.nameEn || !product.nameAr) {
  //     toast.error(t("product_name_required"));
  //     return false;
  //   }
  //   if (!product.price) {
  //     toast.error(t("price_required"));
  //     return false;
  //   }
  //   if (!product.category.id) {
  //     toast.error(t("category_required"));
  //     return false;
  //   }
  //   if (!product.descriptionEn || !product.descriptionAr) {
  //     toast.error(t("description_required"));
  //     return false;
  //   }
  //   return true;
  // };

  // إعادة تعيين حالة النموذج فقط
  const resetFormState = () => {
    setProduct({
      nameEn: "",
      nameAr: "",
      price: null,
      oldPrice: null,
      descriptionAr: "",
      descriptionEn: "",
      category: { id: null, nameAr: "", nameEn: "" },
      code: "",
      mainImage: "",
      mainImagefile: "",
      img2: "",
      img2file: "",
      img2ID: null,
      img3: "",
      img3file: "",
      img3ID: null,
    });
    setEnabledFavorite(false);
    setEnabledActive(true);
    setEnabledAvailable(true);
  };

  const createFormData = () => {
    const formData = new FormData();
    const fields = {
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      code: product.code,
      price: product.price,
      oldPrice: product.oldPrice,
      descriptionAr: product.descriptionAr,
      descriptionEn: product.descriptionEn,
      favorite: enabledFavorite,
      active: enabledActive,
      available: enabledAvailable,
      itemCategoryId: product.category.id,
    };
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });
    if (product.mainImagefile) {
      formData.append("mainImage", product.mainImagefile);
    }
    [product.img2file, product.img3file].forEach((img) => {
      if (img) formData.append("itemImages", img);
    });
    isEditMode
      ? [product.img2ID, product.img3ID].forEach((imgID) => {
          if (imgID) formData.append("existingImageIdsToKeep", imgID);
        })
      : null;
    return formData;
  };

  // حذف الصورة
  const deleteImage = (photoKey) => {
    setProduct((prev) => ({
      ...prev,
      [photoKey]: "",
      ...(photoKey !== "mainImage" && {
        [photoKey + "file"]: "",
        [photoKey + "ID"]: null,
      }),
    }));
  };

  // إضافة منتج جديد
  const addProduct = async () => {
    // if (!validateForm()) return;

    const formData = createFormData();

    setLoading(true);
    try {
      await postRequest("/api/admin/items", formData, t("message"));
      resetFormState();
      triggerRefresh();
      setSelectedProductId(null);
      setIsFormOpen(false);
    } catch (err) {
      console.error("Error adding product:", err);
  
    } finally {
      setLoading(false);
    }
  };

  // جلب بيانات المنتج للتعديل
  const productData = async () => {
    try {
      setLoading(true);

      if (selectedProductId !== null) {
        resetFormState();
        const res = await getProductDetails(selectedProductId);
        const resData = res.data;

        setProduct((prev) => ({
          ...prev,
          nameEn: resData.nameEn,
          nameAr: resData.nameAr,
          code: resData.code,
          price: resData.price,
          oldPrice: resData.oldPrice,
          descriptionAr: resData.descriptionAr,
          descriptionEn: resData.descriptionEn,
          mainImage:
            process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + getThumbnailUrl(resData.mainImageURL)  ||
            "",
          img2:
            resData.images.length >= 1
              ? process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                getThumbnailUrl(resData.images[0].imageUrl)
              : null,
          img2ID:
            resData.images.length >= 1 ? resData.images[0].itemImageId : null,
          img3:
            resData.images.length >= 2
              ? process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                getThumbnailUrl(resData.images[1].imageUrl)
              : null,
          img3ID:
            resData.images.length >= 2 ? resData.images[1].itemImageId : null,
          category: {
            ...prev.category,
            id: resData.itemCategory.itemCategoryId,
            nameAr: resData.itemCategory.nameAr,
            nameEn: resData.itemCategory.nameEn,
          },
        }));

        setEnabledFavorite(resData.favorite);
        setEnabledActive(resData.active);
        setEnabledAvailable(resData.available);
      } else {
        resetFormState();
      }
    } catch (error) {
      console.error("Error loading product data:", error);
  
    } finally {
      setLoading(false);
    }
  };

  // تحديث المنتج
  const updateProduct = async () => {
    // if (!validateForm()) return;

    // التحقق من السعر
    if (product.oldPrice !== null && product.oldPrice < product.price) {
      toast.error(t("check_oldPrice"));
      return;
    }

    const formData = createFormData();
    console.log(formData);
    setLoading(true);
    try {
      await putRequest(
        `/api/admin/items/${selectedProductId}`,
        formData,
        t("message"),
      );
      resetFormState();
      setSelectedProductId(null);
      triggerRefresh();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    showCategories();
    productData();
  }, [selectedProductId]);

  return (
    <div
      id="add-product-form"
      className={` absolute w-full justify-end items-end h-full  ${isFormOpen ? "flex" : "hidden"}`}
    >
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Image
            src="/Images/logo.png"
            alt=""
            className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
            width={100}
            height={100}
            priority
          />
        </div>
      )}
      <form
        className="bg-white shadow-md shadow-slate-400 rounded-lg w-[550px] px-7 pb-10 border overflow-hidden xs:overflow-y-scroll h-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="h-16 flex justify-between items-center">
          <h1 id="nameFormProduct" className="text-xl font-semibold">
            {isEditMode ? t("edit_product") : t("add_product")}
          </h1>
          <button
            className="text-2xl text-gray-500 hover:text-red-800 transition-colors"
            onClick={() => {
              setIsFormOpen(false);
              setSelectedProductId(null);
              console.log(isEditMode);
            }}
            type="button"
          >
            <MdCancel />
          </button>
        </div>
        <hr className="h-1"></hr>

        <div className="flex flex-col text-gray-600  mt-2">
          <h1 className="text-xs font-semibold">{t("product_images")}</h1>

          <div className="mt-3 grid sm:grid-cols-3 xs:grid-cols-2 gap-6">
            {images.map((img) => (
              <div key={img.key}>
                {/* Delete button */}
                <div className="h-4 flex justify-end">
                  {product[img.key] && (
                    <button
                      type="button"
                      onClick={() => deleteImage(img.key)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete image"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                <label htmlFor={img.inputId} className="cursor-pointer">
                  <div className="flex flex-col items-center h-[140px] justify-center p-3 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50 transition-colors">
                    {/* Upload UI */}
                    {!product[img.key] ? (
                      <div className="flex flex-col items-center">
                        <IoCloudUploadSharp className="text-4xl text-red-600" />
                        <span className="text-xs text-gray-500">
                          {img.key === "mainImage"
                            ? t("photo_main")
                            : t("add-photo")}
                        </span>
                      </div>
                    ) : isBase64(product[img.key]) ? (
                      <img
                        src={product[img.key]}
                        alt={img.label}
                        className="max-h-full max-w-full"
                      />
                    ) : (
                      <Image
                        alt={img.label}
                        src={product[img.key] || "/images/no-image.png"}
                        width={100}
                        height={100}
                        className="max-h-full max-w-full"
                      />
                    )}
                  </div>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id={img.inputId}
                  className="hidden"
                  onChange={(e) => handleUpload(e, img.key)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col  mt-3">
          <div className=" w-full flex md:flex-row justify-between xs:flex-col gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-600 font-semibold block mb-1">
                {t("product_name")}* [En]
              </label>
              <input
                type="text"
                value={product.nameEn || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, nameEn: e.target.value }))
                }
                required
                className="w-full bg-[#F9FAFB] outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-600 font-semibold block mb-1">
                {t("product_name")}* [Ar]
              </label>
              <input
                type="text"
                value={product.nameAr || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, nameAr: e.target.value }))
                }
                required
                className="w-full bg-[#F9FAFB] outline-none  text-base my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center md:flex-row  xs:flex-col  justify-between gap-3 mt-3">
            <div className="w-full">
              <label className="text-xs text-gray-600 font-semibold block mb-1">
                {t("product_code")}
              </label>
              <input
                type="text"
                value={product.code || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, code: e.target.value }))
                }
                required
                className="w-full bg-[#F9FAFB] outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
              />
            </div>
            <div className="w-full ">
              <label className="text-xs text-gray-600 font-semibold block mb-1">
                {t("Category")}*
              </label>
              <Select
                isSearchable
                isClearable
                options={itemCategory.map((category) => ({
                  value: category.itemCategoryId,
                  label:
                    localStorage.getItem("lang") === "ar"
                      ? category.nameAr
                      : category.nameEn,
                  data: category,
                }))}
                value={
                  product.category.id
                    ? {
                        value: product.category.id,
                        label:
                          localStorage.getItem("lang") === "ar"
                            ? product.category.nameAr
                            : product.category.nameEn,
                      }
                    : null
                }
                onChange={(option) => {
                  if (option) {
                    setProduct((prev) => ({
                      ...prev,
                      category: {
                        id: option.value,
                        nameAr: option.data.nameAr,
                        nameEn: option.data.nameEn,
                      },
                    }));
                  } else {
                    setProduct((prev) => ({
                      ...prev,
                      category: {
                        id: null,
                        nameAr: "",
                        nameEn: "",
                      },
                    }));
                  }
                }}
                placeholder={t("select_category")}
                noOptionsMessage={() => t("no_categories")}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#F9FAFB",
                    borderColor: "#e5e7eb",
                    borderRadius: "0.375rem",
                    minHeight: "40px",
                    cursor: "pointer",
                    // outline: "none",
                    "&:hover": {
                      borderColor: "#e5e7eb",
                    },
                    "&:focus": {
                      borderColor: "#e5e7eb",
                      boxShadow: "0 0 0 3px rgba(185, 28, 28, 0.2)",
                      // outline: "n/one",
                    },
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#dc2626"
                      : state.isFocused
                        ? "#fee2e2"
                        : "#ffffff",
                    color: state.isSelected ? "#ffffff" : "#374151",
                    cursor: "pointer",
                    padding: "10px",
                    "&:hover": {
                      backgroundColor: state.isSelected ? "#dc2626" : "#fee2e2",
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#ffffff",
                    borderRadius: "0.375rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "#374151",
                  }),
                }}
              />
            </div>
          </div>

          <div className="flex md:flex-row  xs:flex-col items-start  justify-between gap-3">
            <div className="w-full">
              <label className="text-xs text-gray-600">{t("Price")}</label>
              <input
                type="number"
                value={product.price || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, price: e.target.value }))
                }
                required
                className=" bg-[#F9FAFB] w-full outline-none  text-base  my-1  p-1 border rounded-md"
              />
            </div>
            <div className="w-full">
              <label className="text-xs text-gray-600">{t("old_price")}</label>
              <input
                type="number"
                value={product.oldPrice || ""}
                onChange={(e) => {
                  setProduct((prev) => ({
                    ...prev,
                    oldPrice: e.target.value === "" ? null : e.target.value,
                  }));
                }}
                id="oldPrice"
                className=" bg-[#F9FAFB] w-full outline-none  text-base  my-1  p-1 border rounded-md"
              />
            </div>
          </div>
          <div className="w-full my-3">
            <label className="text-xs text-gray-600 font-semibold block mb-2">
              {t("product_state")}
            </label>
            <div className="flex md:flex-row  xs:flex-col items-center  justify-between gap-3">
              {/* متاح في المتجر */}
              <div className="bg-[#F9FAFB] flex items-center justify-between h-10 w-full    px-3 border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("visible_in_store")}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setEnabledActive(!enabledActive);
                  }}
                  className={`transition-colors duration-200 ${
                    enabledActive ? "text-green-600" : "text-gray-300"
                  }`}
                >
                  <FaCircle />
                </button>
              </div>
              <div className="bg-[#F9FAFB] flex items-center justify-between w-full  h-10   px-3  border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("featured-product")}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setEnabledFavorite(!enabledFavorite);
                  }}
                  className={`text-xl transition-colors duration-200 ${
                    enabledFavorite ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  <GoStarFill />
                </button>
              </div>
              <div className="bg-[#F9FAFB] flex items-center justify-between h-10 w-full    px-3 border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("available_in_store")}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setEnabledAvailable(!enabledAvailable);
                  }}
                  className={`transition-colors duration-200 ${
                    enabledAvailable ? "text-green-600" : "text-gray-300"
                  }`}
                >
                  <FaCircle />
                </button>
              </div>
            </div>
          </div>
          <label className="text-xs text-gray-700 font-semibold block mb-1">
            {t("description")}* [En]
          </label>
          <textarea
            required
            value={product.descriptionEn || ""}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                descriptionEn: e.target.value,
              }))
            }
            rows={3}
            className="w-full bg-[#F9FAFB] outline-none text-base p-2 border rounded-md focus:border-red-600 transition-colors resize-none"
          />
          <label className="text-xs text-gray-700 font-semibold block mb-1 mt-3">
            {t("description")}* [Ar]
          </label>

          <textarea
            required
            value={product.descriptionAr || ""}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                descriptionAr: e.target.value,
              }))
            }
            rows={3}
            className="w-full bg-[#F9FAFB] outline-none text-base p-2 border rounded-md focus:border-red-600 transition-colors resize-none"
          />
          <hr className="h-1"></hr>
        </div>
        <div className="flex bg-[#F9FAFB] px-4 h-auto py-4 mt-5 rounded-md justify-center items-center ">
          <div className="flex justify-between w-full gap-3 items-center">
            <div className="flex w-full items-center gap-2">
              <button
                type="submit"
                id="btn-saveProduct"
                className={`bg-red-600 h-8  px-3 text-white flex-1 hover:bg-red-800 rounded-lg transition-colors ${isEditMode ? "hidden" : ""}`}
                onClick={addProduct}
                disabled={loading}
              >
                {t("save")}
              </button>

              {isEditMode && (
                <button
                  type="submit"
                  id="btn-editProduct"
                  className={`bg-red-600 h-8  px-3 text-white flex-1  hover:bg-red-800 rounded-lg transition-colors ${isEditMode ? "" : "hidden"}`}
                  onClick={updateProduct}
                  disabled={loading}
                >
                  {t("save-changes")}
                </button>
              )}
            </div>

            <button
              type="button"
              className="bg-white w-full  border h-8  px-3 text-gray-700   hover:bg-red-800 hover:text-white rounded-lg transition-colors"
              onClick={() => {
                setIsFormOpen(false);
                setSelectedProductId(null);
              }}
              disabled={loading}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
