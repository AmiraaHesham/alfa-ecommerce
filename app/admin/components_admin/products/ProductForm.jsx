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
} from "../../../../utils/functions.jsx";
import { postRequest, putRequest } from "../../../../utils/requestsUtils.js";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import { useIdContext } from "../../../../context/idContext.jsx";
import { GoStarFill } from "react-icons/go";
import { toast } from "react-toastify";

export default function FormProduct({ isFormOpen, setIsFormOpen }) {
  const [enabledActive, setenabledActive] = useState(true);
  const [enabledFavorite, setenabledFavorite] = useState(false);
  const [enabledAvailable, setenabledAvailable] = useState(true);

  const { triggerRefresh } = useRefresh();
  const { selectedProductId, setSelectedProductId } = useIdContext();
  const [loading, setLoading] = useState(false);
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

  const handelupload = (e, photoKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProduct((prev) => ({
        ...prev,
        [photoKey]: reader.result, // preview
        [photoKey + "file"]: file, // file for upload
        [photoKey + "ID"]: null, // ID for upload
      }));
    };

    reader.readAsDataURL(file);
  };
  const showeCategories = async () => {
    const resData = await getCategories();
    setItemCategory(resData.data);
  };

  const addProduct = async () => {
    const formData = new FormData();

    // fields عادية
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
    // الصور
    if (product.mainImagefile) {
      formData.append("mainImage", product.mainImagefile);
    }
    [product.img2file, product.img3file].forEach((img) => {
      if (img) formData.append("itemImages", img);
    });
    setLoading(true);

    try {
      await postRequest("/api/admin/items", formData, t("message"));
      triggerRefresh();
      setSelectedProductId(null);
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
        img2: "",
        img3: "",
      });
      setenabledFavorite(false);
      setenabledActive(true);
      setenabledAvailable(true);
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  const productData = async () => {
      
    try {
      setLoading(true);
    
      if (selectedProductId !== null) {
        setProduct((prev) => ({
          ...prev,
          nameEn: "",
          nameAr: "",
          code: "",
          price: null,
          oldPrice: null,
          descriptionAr: "",
          descriptionEn: "",
          mainImage: "",
          img2: null,
          img3: null,
          img3ID: null,
          img2ID: null,
          category: { id: null, nameAr: "", nameEn: "" },
        }));
        const res = await getProductDetails(selectedProductId);
        console.log(res);
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
            process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + resData.mainImageURL ||
            "",
          img2:
            resData.images.length >= 1
              ? process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                resData.images[0].imageUrl
              : null,
          img2ID:
            resData.images.length >= 1 ? resData.images[0].itemImageId : null,
          img3:
            resData.images.length >= 2
              ? process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                resData.images[1].imageUrl
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
        setenabledFavorite(resData.favorite);
        setenabledActive(resData.active);
        setenabledAvailable(resData.available);
        //
      } else {
        setProduct((prev) => ({
          ...prev,
          nameEn: "",
          nameAr: "",
          code: "",
          price: null,
          oldPrice: null,
          descriptionAr: "",
          descriptionEn: "",
          mainImage: "",
          img2: "",
          img3: "",
          img3ID: null,
          img2ID: null,
          category: { id: null, nameAr: "", nameEn: "" },
        }));

        setenabledFavorite(false);
        setenabledActive(true);
        setenabledAvailable(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updataProduct = async () => {
    try {
      setLoading(true);
      if (product.oldPrice > product.price || product.oldPrice === null) {
        setIsFormOpen(false);
        const formData = new FormData();

        // fields عادية
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
          existingImageIdsToKeep: product.img2ID,
          existingImageIdsToKeep: product.img3ID,
        };

        Object.entries(fields).forEach(([key, value]) => {
          if (value !== null && value !== "") {
            formData.append(key, value);
          }
        });

        // الصور
        if (product.mainImagefile) {
          formData.append("mainImage", product.mainImagefile);
        }

        [product.img2file, product.img3file].forEach((img) => {
          if (img) formData.append("itemImages", img);
        });
        await putRequest(
          `/api/admin/items/${selectedProductId}`,
          formData,
          t("message"),
        );
        triggerRefresh();
        setSelectedProductId(null);

        const oldPrice = document.querySelector("#oldPrice");
        oldPrice.classList.remove("border-red-600");
      } else {
        const oldPrice = document.querySelector("#oldPrice");
        oldPrice.classList.add("border-red-600");
        toast.error(t("check_oldPrice"));
      }
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    showeCategories();
    productData();
  }, [selectedProductId]);
  const { t } = useLanguage();

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
        className=" bg-white shadow-md shadow-slate-400 rounded-lg w-[550px] px-7 pb-10 border overflow-hidden xs:overflow-y-scroll md:over h-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="h-16 flex justify-between items-center ">
          <h1 id="nameFormProduct" className="text-xl font-semibold">
            {" "}
            {isEditMode ? t("edit_product") : t("add_product")}
          </h1>
          <button
            className="text-2xl text-gray-500  hover:text-red-800"
            onClick={() => {
              setIsFormOpen(false);
            }}
          >
            <MdCancel />
          </button>
        </div>
        <hr className="h-1"></hr>

        <div className="flex flex-col text-gray-600  mt-2">
          <h1 className="text-xs">{t("product_images")}</h1>

          <div className="mt-3 grid sm:grid-cols-3 xs:grid-cols-2 gap-6">
            {images.map((img) => (
              <div key={img.key}>
                {/* Delete button */}
                <div className="h-4">
                  {product[img.key] && (
                    <div>
                      <span
                        onClick={() => {
                          setProduct((prev) => ({
                            ...prev,
                            [img.key]: "",
                            [img.key === "img2" || img.key === "img3"
                              ? img.key + "File"
                              : ""]: "",
                            [img.key === "img3" || img.key === "img3"
                              ? img.key + "ID"
                              : ""]: "",
                          }));
                        }}
                      >
                        <FaTimes />
                      </span>
                    </div>
                  )}
                </div>

                <label htmlFor={img.inputId}>
                  <div className="flex flex-col items-center h-[140px] justify-center p-3 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50">
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
                    ) : (
                      <Image
                        alt=""
                        src={product[img.key] || "/images/no-image.png"}
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id={img.inputId}
                  className="hidden"
                  onChange={(e) => handelupload(e, img.key)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col  mt-3">
          <div className=" w-full flex md:flex-row justify-between xs:flex-col gap-3">
            <div className="">
              <label className="text-xs text-gray-600 mb-10">
                {t("product_name")}* [En]
              </label>
              <input
                type="text"
                value={product.nameEn || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, nameEn: e.target.value }))
                }
                required
                className="w-full bg-[#F9FAFB] outline-none  text-base  my-1  p-1 border rounded-md"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">
                {t("product_name")}* [Ar]
              </label>
              <input
                type="text"
                value={product.nameAr || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, nameAr: e.target.value }))
                }
                required
                className="w-full bg-[#F9FAFB] outline-none  text-base my-1  p-1 border rounded-md"
              />
            </div>
          </div>

          <div className="flex items-center md:flex-row  xs:flex-col  justify-between gap-3">
            <div className="w-full">
              <label className="text-xs text-gray-600">
                {t("product_code")}
              </label>
              <input
                type="text"
                value={product.code || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, code: e.target.value }))
                }
                required
                className="w-full bg-[#F9FAFB] outline-none  text-base  my-1  p-1 border rounded-md"
              />
            </div>
            <div className="w-full ">
              <label className="text-xs text-gray-600">{t("Category")}</label>
              <select
                type="text"
                onChange={(e) => {
                  const selectedCategoryId = e.target.value;
                  setProduct((prev) => ({
                    ...prev,
                    category: {
                      ...prev.category,
                      id: selectedCategoryId,
                    },
                  }));
                  console.log(e.target);
                }}
                required
                className="w-full bg-[#F9FAFB] outline-none  text-base my-2 p-1 border rounded-md"
              >
                <option value={product.category.id}>
                  {localStorage.lang === "ar"
                    ? product.category.nameAr
                    : product.category.nameEn}
                </option>
                {itemCategory
                  ? itemCategory.map((category, index) => {
                      return (
                        <option key={index} value={category.itemCategoryId}>
                          {localStorage.lang === "ar"
                            ? category.nameAr
                            : category.nameEn}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>
          </div>

          <div className="flex md:flex-row  xs:flex-col items-start  justify-between gap-3">
            <div className="w-full">
              <label className="text-xs text-gray-600">{t("Price")}</label>
              <input
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
          <div className="w-full my-2">
            <label className="w-full">
              <h1 className="text-xs text-gray-600">{t("product_state ")}</h1>
            </label>
            <div className="flex md:flex-row  xs:flex-col items-center  justify-between gap-3">
              <div className="bg-[#F9FAFB] flex items-center justify-between h-10 w-full    px-3 my-2 border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("visible_in_store")}
                </h1>
                <button
                  onClick={() => {
                    setenabledActive(!enabledActive);
                  }}
                  className={`${
                    enabledActive ? "text-green-600" : "text-gray-300"
                  } transition-colors duration-200`}
                >
                  <FaCircle />
                </button>
              </div>
              <div className="bg-[#F9FAFB] flex items-center justify-between w-full  h-10   px-3  border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("featured-product")}
                </h1>
                <button
                  onClick={() => {
                    setenabledFavorite(!enabledFavorite);
                  }}
                  className={`${
                    enabledFavorite ? "text-yellow-500" : "text-gray-400"
                  } text-xl transition-colors duration-200`}
                >
                  <GoStarFill />
                </button>
              </div>
              <div className="bg-[#F9FAFB] flex items-center justify-between h-10 w-full    px-3 my-2 border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("available_in_store")}
                </h1>
                <button
                  onClick={() => {
                    setenabledAvailable(!enabledAvailable);
                  }}
                  className={`${
                    enabledAvailable ? "text-green-600" : "text-gray-300"
                  } transition-colors duration-200`}
                >
                  <FaCircle />
                </button>
              </div>
            </div>
          </div>
          <label className="text-xs text-gray-700">
            {t("description")}* [En]
          </label>
          <textarea
            type="text"
            required
            value={product.descriptionEn || ""}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, descriptionEn: e.target.value }))
            }
            className="w-full bg-[#F9FAFB] outline-none mb-2 text-base  my-1  p-1 
            border rounded-md"
          />
          <label className="text-xs text-gray-700">
            {t("description")}* [AR]
          </label>

          <textarea
            type="text"
            required
            value={product.descriptionAr || ""}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, descriptionAr: e.target.value }))
            }
            className="w-full bg-[#F9FAFB] outline-none mb-2  text-base  my-1  p-1 
            border rounded-md"
          />
          <hr className="h-1"></hr>
        </div>
        <div className="flex bg-[#F9FAFB] px-4 h-10 py-10 mt-5 rounded-md justify-center items-center ">
          <div className="flex justify-between w-full gap-3 items-center">
            <div className="flex  w-full items-center">
              <button
                type="submit"
                id="btn-saveProduct"
                className={`bg-red-600 h-8  px-3 text-white w-full hover:bg-red-800 rounded-lg ${isEditMode ? "hidden" : ""}`}
                onClick={addProduct}
              >
                {t("save")}
              </button>
              <button
                type="submit"
                id="btn-editProduct"
                className={`bg-red-600 h-8  px-3 text-white w-full  hover:bg-red-800 rounded-lg ${isEditMode ? "" : "hidden"}`}
                onClick={updataProduct}
              >
                {t("save-changes")}
              </button>
            </div>

            <button
              type="button"
              className={
                "bg-white w-full  border h-8  px-3 text-gray-700ss   hover:bg-red-800 hover:text-white rounded-lg"
              }
              onClick={() => {
                setIsFormOpen(false);
                setSelectedProductId(null);
              }}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
