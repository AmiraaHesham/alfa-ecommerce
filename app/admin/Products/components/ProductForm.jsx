"use client";
import Image from "next/image";
import { MdBlock, MdCancel } from "react-icons/md";
import { IoCheckmarkCircleOutline, IoCloudUploadSharp } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { FaCircle } from "react-icons/fa";
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
import { ImBlocked } from "react-icons/im";

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
  // const images = [
  //   { key: "mainImage", label: "mainImage", inputId: "fileInput-mainImage" },
  //   { key: "img2", label: "img2", inputId: "fileInput-img2" },
  //   { key: "img3", label: "img3", inputId: "fileInput-img3" },
  // ];
  const isEditMode = selectedProductId !== null;
  const [product, setProduct] = useState({
    nameEn: "",
    nameAr: "",
    price: null,
    oldPrice: null,
    descriptionEn: "",
    descriptionAr: "",
    seoCode: '',
    category: {
      id: null,
      nameAr: "",
      nameEn: "",
    },
    code: "",
    ram: "",
    flash: "",
    company: "",
    contents: "",
    // mainImage: "",
    // mainImagefile: "",
    // img2: "",
    // img2file: "",
    // img2ID: null,
    // img3: "",
    // img3file: "",
    // img3ID: null,
  });
  const [itemCategory, setItemCategory] = useState([]);
  const [itemImages, setItemImages] = useState([]);
  const objectUrlsRef = useRef([]);

  const createObjectUrl = (file) => {
    const url = URL.createObjectURL(file);
    objectUrlsRef.current.push(url);
    return url;
  };

  const revokeObjectUrl = (url) => {
    URL.revokeObjectURL(url);
    objectUrlsRef.current = objectUrlsRef.current.filter((u) => u !== url);
  };

  const revokeImageUrls = () => {
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
  };


  const handleItemImagesUpload = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length === 0) return;

    const newImages = files.map((file) => ({
      file,
      preview: createObjectUrl(file),
      existingId: null,
    }));
    setItemImages((prev) => [...prev, ...newImages]);
  };



  const removeItemImage = (index) => {
    const target = itemImages[index];
    if (target?.preview) revokeObjectUrl(target.preview);
    setItemImages((prev) => prev.filter((_, i) => i !== index));
  };

  // جلب الأقسام
  const showCategories = async () => {
    try {
      const resData = await getCategories();
      setItemCategory(resData.data.content || []);
    } catch (error) { }
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
      seoCode: "",
      category: { id: null, nameAr: "", nameEn: "" },
      code: "",
      ram: "",
      flash: "",
      company: "",
      contents: "",
    });
    revokeImageUrls();
    setItemImages([]);
    setEnabledFavorite(false);
    setEnabledActive(true);
    setEnabledAvailable(true);
  };

    const fields = {
      nameEn: product.nameEn,
      nameAr: product.nameAr,
      code: product.code,
      price: product.price,
      oldPrice: product.oldPrice,
      seoCode: product.seoCode,
      ram: product.ram,
      flash: product.flash,
      company: product.company,
      contents: product.contents,
      descriptionAr: product.descriptionAr,
      descriptionEn: product.descriptionEn,
      favorite: enabledFavorite,
      active: enabledActive,
      available: enabledAvailable,
      itemCategoryId: product.category.id,
    };
  

  // إضافة منتج جديد
  const addProductData = async () => {
    setLoading(true);
    try {
     const respose = await postRequest("/api/admin/items", fields, t("message"));
      // resetFormState();
      // triggerRefresh();
      // setSelectedProductId(null);
      // setIsFormOpen(false);
      console.log(respose)
      productData()
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const addProductImges= async()=>{
    await postRequest("/api/admin/items/{itemId}/images",
      {
        itemImages:itemImages
      }
    )

  }
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
          seoCode: resData.seoCode,
          ram: resData.ram,
          flash: resData.flash,
          company: resData.company,
          contents: resData.contents,
          descriptionEn: resData.descriptionEn,
          category: {
            ...prev.category,
            id: resData.itemCategory.itemCategoryId,
            nameAr: resData.itemCategory.nameAr,
            nameEn: resData.itemCategory.nameEn,
          },
        }));


        setItemImages();

        setEnabledFavorite(resData.favorite);
        setEnabledActive(resData.active);
        setEnabledAvailable(resData.available);
      } else {
        resetFormState();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // تحديث المنتج
  const updateProduct = async () => {
    // if (!validateForm()) return;

    // التحقق من السعر
    if (
      product.oldPrice !== null &&
      Number(product.oldPrice) < Number(product.price)
    ) {
      toast.error(t("check_oldPrice"));
      return;
    }

    const formData = createFormData();
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
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    showCategories();
    productData();
  }, [selectedProductId]);

  useEffect(() => {
    return () => {
      revokeImageUrls();
    };
  }, []);

  return (
    <div
      id="add-product-form"
      className={` fixed inset-0 bg-black/40 flex items-center justify-end z-50 p-5  ${isFormOpen ? "flex" : "hidden"}`}
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
        className="bg-white shadow-md shadow-slate-400 rounded-lg w-full  px-7 pb-10 border overflow-hidden xs:overflow-y-scroll h-full"
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
              resetFormState()
            }}
            type="button"
          >
            <MdCancel />
          </button>
        </div>
        <hr className="h-1"></hr>


        {/* <hr className="my-5" /> */}
        <div className=" grid grid-cols-4 gap-3 mt-3">
          {/* <div className=" w-full  md:flex-row  xs:flex-col gap-3"> */}
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
              className="w-full  outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
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
              className="w-full  outline-none  text-base my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
            />
          </div>
          {/* </div> */}

          {/* <div className="flex items-center md:flex-row  xs:flex-col  justify-between gap-3 mt-3"> */}
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
              className="w-full  outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
            />
          </div>
            <div className="w-full">
            <label className="text-xs text-gray-600 font-semibold block mb-1">
              {t("Price")}</label>
            <input
              type="number"
              value={product.price || ""}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, price: e.target.value }))
              }
              required
              className="w-full  outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
            />
          </div>
          <div className="w-full">
            <label className="text-xs text-gray-600 font-semibold block mb-1">
              {t("old_price") + " "+ "["+t("option")+"]"} </label>
            <input
              type="number"
              value={product.oldPrice || ""}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, oldPrice: e.target.value }))
              }
               className="w-full  outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"

            />
          </div>
          <div className="w-full">
            <label className="text-xs text-gray-600 font-semibold block mb-1">
              {t("ram")}
            </label>
            <input
              type="text"
              value={product.ram || ""}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, ram: e.target.value }))
              }
              required
              className="w-full  outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
            />
          </div>
          <div className="w-full">
            <label className="text-xs text-gray-600 font-semibold block mb-1">
              {t("flash")}
            </label>
            <input
              type="text"
              value={product.flash || ""}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, flash: e.target.value }))
              }
              required
              className="w-full  outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
            />
          </div>
          <div className="w-full">
            <label className="text-xs text-gray-600 font-semibold block mb-1">
              {t("contents")}
            </label>
            <input
              type="text"
              value={product.contents || ""}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, contents: e.target.value }))
              }
              required
              className="w-full  outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
            />
          </div>
          <div className="w-full">
            <label className="text-xs text-gray-600 font-semibold block mb-1">
              {t("company")}
            </label>
            <input
              type="text"
              value={product.company || ""}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, company: e.target.value }))
              }
              required
              className="w-full  outline-none  text-base  my-1  p-2 border rounded-md focus:border-red-600 transition-colors"
            />
          </div>
          <div className="w-full my-1">
            <label className="text-xs text-gray-600 font-semibold block mb-1">
              {t("Category")}*
            </label>
            <div className=" border rounded-md">
              <Select
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
                isSearchable={false}
                placeholder={t("select_category")}
                noOptionsMessage={() => t("no_categories")}
                className="placeholder:text-sm"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "none",
                    boxShadow: "none",
                    fontWeight: "600",
                    height: "100%",
                    width: "100%",
                  }),
                  option: (provided) => ({
                    ...provided,
                    // backgroundColor: '#b91c1c',
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "600",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "#374151",
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
                      backgroundColor: state.isSelected
                        ? "#dc2626"
                        : "#fee2e2",
                    },
                  }),
                }}
              />
            </div>
          </div>
          {/* </div> */}

          {/* <div className="flex md:flex-row  xs:flex-col items-start  justify-between gap-3"> */}
        
          {/* </div> */}

          <div className="w-full">
            <label className="text-xs text-gray-600 font-semibold block mb-1">
              SEO {t("code")}</label>
            <input
              value={product.seoCode || ""}
              onChange={(e) => {
                setProduct((prev) => ({
                  ...prev,
                  seoCode: e.target.value,
                }));
              }}
              id="seoCode"
              className="  w-full outline-none  text-base  my-1  p-2 border rounded-md"
            />
          </div>
          <div className="w-full  col-span-3">
            <label className="text-xs text-gray-600 font-semibold block mb-2">
              {t("product_state")}
            </label>
            <div className="flex md:flex-row  xs:flex-col items-center  justify-between gap-3">
              {/* متاح في المتجر */}
              <div className=" flex items-center justify-between h-10 w-full    px-3 border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("visible_in_store")}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setEnabledActive(!enabledActive);
                  }}
                  className={`transition-colors duration-200 ${enabledActive ? "text-green-600" : "text-gray-300"
                    }`}
                >
                  <FaCircle />
                </button>
              </div>
              <div className=" flex items-center justify-between w-full  h-10   px-3  border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("featured-product")}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setEnabledFavorite(!enabledFavorite);
                  }}
                  className={`text-xl transition-colors duration-200 ${enabledFavorite ? "text-yellow-500" : "text-gray-400"
                    }`}
                >
                  <GoStarFill />
                </button>
              </div>
              <div className=" flex items-center justify-between h-10 w-full    px-3 border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("available_in_store")}
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    setEnabledAvailable(!enabledAvailable);
                  }}
                  className={`transition-colors duration-200`}
                >
                  {enabledAvailable ?
                    <IoCheckmarkCircleOutline className="text-green-500 text-lg" /> :
                    <MdBlock className="text-red-500" />
                  }
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2">
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
              className="w-full  outline-none text-base p-2 border rounded-md focus:border-red-600 transition-colors resize-none"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs text-gray-700 font-semibold block mb-1 ">
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
              className="w-full  outline-none text-base p-2 border rounded-md focus:border-red-600 transition-colors resize-none"
            />
          </div>
        </div>
        {/* <hr className="my-5"></hr> */}
        <div className="flex  px-4  py-4  rounded-md justify-center items-center ">
          <div className="flex justify-between w-full gap-3 items-center">
            <div className="flex  items-center gap-2">
              <button
                type="submit"
                id="btn-saveProduct"
                className={`bg-red-600 text-sm w-[150px] px-3 py-2 text-white flex-1 hover:bg-red-800 rounded-lg transition-colors ${isEditMode ? "hidden" : ""}`}
                onClick={addProductData}
                disabled={loading}
              >
                {t("save_data")}
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

            {/* <button
              type="button"
              className="bg-white w-full  border h-8  px-3 text-gray-700   hover:bg-red-800 hover:text-white rounded-lg transition-colors"
              onClick={() => {
                setIsFormOpen(false);
                setSelectedProductId(null);
              }}
              disabled={loading}
            >
              {t("cancel")}
            </button> */}
          </div>

        </div>
        <div>
          <hr />
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              {t("item_images")}
            </h2>
            <div className="w-full grid lg:grid-cols-6 md:grid-cols-3 xs:grid-cols-2 gap-3">
              <div className="bg-white rounded-3xl h-[170px] w-full flex flex-col gap-3 p-3 cursor-pointer">
                <div className="border-dashed flex justify-center p-5 items-center border-2 rounded-3xl border-red-400 bg-gray-50 hover:bg-gray-100 w-full h-full">
                  <label htmlFor="productImg_fileInput">
                    <div
                      id="label-uplod"
                      className="flex flex-col justify-center items-center cursor-pointer"
                    >
                      <span className="text-2xl bg-white p-2 rounded-full text-red-500">
                        <IoCloudUploadSharp />
                      </span>
                      <span className="flex flex-col gap-2 items-center">
                        <div className="text-center text-sm">
                          <h1 className="mb-2">{t("click_to_upload")}</h1>
                          <h2 className="text-[10px] text-gray-500">
                            PNG, JPG or GIF
                          </h2>
                        </div>
                      </span>
                    </div>
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleItemImagesUpload}
                    className="hidden"
                    id="productImg_fileInput"
                  />
                </div>
              </div>
              {itemImages.map((img, index) => (
                <div key={index} className="bg-white h-[170px]  rounded-3xl">
                  <span className="flex justify-end ">
                    <button
                      type="button"
                      className="text-sm text-gray-500 hover:text-red-600"
                      onClick={() => removeItemImage(index)}
                    >
                      <MdCancel />
                    </button>
                  </span>
                  <div className="flex justify-center items-center">
                    <Image
                      src={img.preview}
                      alt=""
                      width={100}
                      height={100}
                      className="h-[140px] w-full rounded-3xl object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            id="btn-saveProduct"
            className={`bg-red-600 text-sm w-[150px] my-5 px-3 py-2 text-white flex-1 hover:bg-red-800 rounded-lg transition-colors ${isEditMode ? "hidden" : ""}`}
            onClick={addProductImges}
            disabled={loading}
          >
            {t("save_images")}
          </button>
        </div>
      </form>
    </div>
  );
}
