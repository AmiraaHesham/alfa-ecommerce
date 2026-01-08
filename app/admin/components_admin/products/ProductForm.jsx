"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { Switch } from "@headlessui/react";
import { FaCircle, FaTimes } from "react-icons/fa";
import { getCategories } from "../../../../utils/functions.jsx";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../utils/requestsUtils.js";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import { useIdContext } from "../../../../context/idContext.jsx";
import { GoStarFill } from "react-icons/go";

export default function FormProduct() {
  const [enabledActive, setenabledActive] = useState(true);
  const [enabledFavorite, setenabledFavorite] = useState(false);
  const { triggerRefresh } = useRefresh();
  const { selectedId } = useIdContext();

  const [product, setProduct] = useState({
    nameEn: "",
    nameAr: "",
    price: 0,
    description: "",
    category: {
      id: 0,
      nameAr: "",
      nameEn: "",
    },
    code: "",
    mainImage: "",
    mainImagefile: "",
    img2: "",
    img2file: "",
    img3: "",
    img3file: "",
    // active:"",
    // featured:""
  });

  const [itemCategory, setItemCategory] = useState([]);

  const handelupload = (e, photoKey) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProduct((prev) => ({
        ...prev,
        [photoKey]: reader.result,
      }));
    };
    const labelUpload = document.querySelector(`#label-${photoKey}`);
    if (labelUpload) {
      labelUpload.classList.add("hidden");
    }
    const labelImg = document.querySelector(`#${photoKey}`);
    if (labelImg) {
      labelImg.classList.remove("hidden");
    }
    const deleteImg = document.querySelector(`#delete-${photoKey}`);
    if (labelImg) {
      deleteImg.classList.remove("hidden");
    }
    setProduct((prev) => ({
      ...prev,
      [photoKey + "file"]: file,
    }));
  };
  const showeCategories = async () => {
    const resData = await getCategories();
    setItemCategory(resData);
    console.log(resData);
  };
  const addProduct = async () => {
    // let form = document.querySelector("#add-product-form");
    // form.classList.add("hidden");
      const formData = new FormData();
      formData.append("nameEn", product.nameEn);
      formData.append("nameAr", product.nameAr);
      formData.append("code", product.code);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("favorite", enabledFavorite);
      formData.append("active", enabledActive);
      formData.append("itemCategoryId", product.category.id);
      formData.append("mainImage", product.mainImagefile);
      formData.append("itemImages", [product.img2file, product.img3file]);
      console.log(formData);

      await postRequest("/api/admin/items", formData);
      triggerRefresh();
      setProduct({
        nameEn: "",
        nameAr: "",
        price: 0,
        description: "",
        category: {
          id: 0,
          nameAr: "",
          nameEn: "",
        },
        code: "",
        mainImage: "",
        img2: "",
        img3: "",
      });
      setProduct((prev) => ({ ...prev, enabledActive: false }));
     setProduct((prev) => ({ ...prev, enabledActive: true }));
 
  };
  const productData = useCallback(async () => {
    if (selectedId != null) {
      const deleteImg = document.querySelector("#delete-mainImage");
      deleteImg.classList.remove("hidden");
      const labelImg = document.querySelector("#mainImage");
      labelImg.classList.remove("hidden");
      const labelUpload = document.querySelector("#label-mainImage");
      labelUpload.classList.add("hidden");
        const res = await getRequest(`/api/public/items/${selectedId}`);
        // console.log(res)
        setProduct((prev) => ({
          ...prev,
          nameEn: res.nameEn,
          nameAr: res.nameAr,
          code: res.code,
          price: res.price,
          description: res.description,
          mainImage:
            process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + res.mainImageURL || "",
          img2: res.img2 || "",
          img3: res.img3 || "",
          category: {
            ...prev.category,
            id: res.itemCategory.itemCategoryId,
            nameAr: res.itemCategory.nameAr,
            nameEn: res.itemCategory.nameEn,
          },
        }));
        setenabledFavorite(res.favorite);
        setenabledActive(res.active);
     
    }
  }, [selectedId]);

  const updataProduct = async () => {
    let form = document.querySelector("#add-product-form");
    form.classList.add("hidden");
    // console.log(`>>>>>${product.mainImagefile}`);
      const formData = new FormData();
      formData.append("nameEn", product.nameEn);
      formData.append("nameAr", product.nameAr);
      formData.append("code", product.code);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("active", enabledActive);
      formData.append("favorite", enabledFavorite);
      if (product.mainImagefile) {
        formData.append("mainImage", product.mainImagefile);
      }
      formData.append("itemCategoryId", product.category.id);
      await putRequest(`/api/admin/items/${selectedId}`, formData , t('message_edit'));
      triggerRefresh();

      setProduct((prev) => ({
        ...prev,
        nameEn: "",
        nameAr: "",
        code: "",
        price: 0,
        description: "",
        mainImage: "",
        img2: "",
        img3: "",
        category: {
          ...prev.category,
          id: 0,
          nameAr: "",
          nameEn: "",
        },
      }));
      setenabledFavorite(false);
      setenabledActive(true);
 
  };
  useEffect(() => {
    showeCategories();
    productData();
  }, [productData]);
  const { t } = useLanguage();

  return (
    <div
      id="add-product-form"
      className=" absolute w-full hidden justify-end items-end "
    >
      <form
        className=" bg-white shadow-md shadow-slate-400 rounded-lg w-[550px] px-7 pb-10 border overflow-hidden overflow-y-scroll h-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="h-16 flex justify-between items-center ">
          <h1 id="nameFormProduct" className="text-xl font-semibold"></h1>
          <span
            className="text-xl text-gray-500  hover:text-blue-800"
            onClick={() => {
              let form = document.querySelector("#add-product-form");
              form.classList.add("hidden");
              // setProduct((prev) => ({
              //   ...prev,
              //   nameEn: "",
              //   nameAr: "",
              //   code: "",
              //   price: "",
              //   description: "",
              //   mainImage: "",
              //   img2: "",
              //   img3: "",
              //   category: {
              //     ...prev.category,
              //     id: "",
              //     nameAr: "",
              //     nameEn: "",
              //   },
              // }));
              setenabledFavorite(false);
              setenabledActive(true);
            }}
          >
            <FaTimes />
          </span>
        </div>
        <hr className="h-1"></hr>

        <div className="flex flex-col text-gray-600  mt-2">
          <h1 className="text-xs">{t("product_images")}</h1>

          <div className="mt-3 grid sm:grid-cols-3  xs:grid-cols-2 gap-6 ">
            <div>
              <span
                id="delete-mainImage"
                className="hidden"
                onClick={() => {
                  const deleteImg = document.querySelector("#delete-mainImage");
                  deleteImg.classList.add("hidden");
                  const labelImg = document.querySelector("#mainImage");
                  labelImg.classList.add("hidden");
                  const labelUpload =
                    document.querySelector("#label-mainImage");
                  labelUpload.classList.remove("hidden");
                  setProduct((prev) => ({ ...prev, mainImagefile: {} }));
                }}
              >
                <FaTimes />
              </span>
              <label htmlFor="fileInput-mainImage">
                <div className="flex flex-col items-center h-[140px]  justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
                  <div
                    id="label-mainImage"
                    className="flex flex-col mt-3 justify-center items-center"
                  >
                    <span className="text-4xl text-blue-600">
                      <IoCloudUploadSharp />
                    </span>
                    <span className="text-sm text-gray-500">
                      {t("add-photo")}
                    </span>
                    <span className="text-xs text-gray-500">
                      {t("photo_main")}
                    </span>
                  </div>
                  <div id="mainImage" className="hidden w-[100px] h-[100px]">
                    <Image
                      alt=""
                      src={product.mainImage || "/images/no-image.png"}
                      width={100}
                      height={100}
                      className="w-full h-full"
                    ></Image>
                  </div>
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handelupload(e, "mainImage")}
                className="hidden"
                id="fileInput-mainImage"
              />
            </div>
            <div>
              <span id="delete-img2" className="hidden">
                {" "}
                <FaTimes />
              </span>
              <label htmlFor="fileInput-img2">
                <div className="flex flex-col items-center h-[140px]  justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
                  <div
                    id="label-img2"
                    className="flex flex-col justify-center items-center"
                  >
                    <span className="text-4xl text-blue-600">
                      <IoCloudUploadSharp />
                    </span>
                    <span className="text-xs text-gray-500">
                      {t("add-photo")}
                    </span>
                  </div>
                  <div id="img2" className="hidden w-[100px] h-[100px]">
                    <Image
                      alt=""
                      src={product.img2 || "/images/no-image.png"}
                      width={100}
                      height={100}
                      className="w-full h-full"
                    ></Image>
                  </div>
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handelupload(e, "img2")}
                className="hidden"
                id="fileInput-img2"
              />
            </div>
            <div>
              <span id="delete-img3" className="hidden">
                <FaTimes />
              </span>
              <label htmlFor="fileInput-img3">
                <div className="flex flex-col items-center h-[140px]  justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
                  <div
                    id="label-img3"
                    className="flex flex-col justify-center items-center"
                  >
                    <span className="text-4xl text-blue-600">
                      <IoCloudUploadSharp />
                    </span>
                    <span className="text-xs text-gray-500">
                      {t("add-photo")}
                    </span>
                  </div>
                  <div id="img3" className="hidden w-[100px] h-[100px]">
                    <Image
                      alt=""
                      src={product.img3 || "/images/no-image.png"}
                      width={100}
                      height={100}
                      className="w-full h-full"
                    ></Image>
                  </div>
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handelupload(e, "img3")}
                className="hidden"
                id="fileInput-img3"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-7 ">
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
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-base  my-1  p-1 border rounded-md"
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
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-base my-1  p-1 border rounded-md"
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
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-base  my-1  p-1 border rounded-md"
              />
            </div>
            <div className="w-full">
              <label className="text-xs text-gray-600">{t("Price")}</label>
              <input
                value={product.price || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, price: e.target.value }))
                }
                required
                className=" bg-[#F9FAFB] w-full outline-none text-blue-900 text-base  my-1  p-1 border rounded-md"
              />
            </div>
          </div>

          <div className="flex md:flex-row  xs:flex-col items-start  justify-between gap-3">
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
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-base my-2 p-2 border rounded-md"
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
            <div className="w-full mt-2">
              <label className="w-full">
                <h1 className="text-xs text-gray-600">{t("product_state ")}</h1>
              </label>
              <div className="bg-[#F9FAFB] flex items-center justify-between h-9    px-3 my-2 border rounded-md ">
                <h1 className="text-xs text-gray-600">
                  {t("visible_in_store")}
                </h1>
                <button
                  onClick={() => {
                    setenabledActive(!enabledActive);
                  }}
                  className={`${
                    enabledActive ? "text-green-600" : "text-gray-300"
                  }

    transition-colors duration-200`}
                >
                  <FaCircle />
                </button>
              </div>
              <div className="bg-[#F9FAFB] flex items-center justify-between   h-10   px-3  border rounded-md ">
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
            </div>
          </div>
          <label className="text-xs text-gray-700">{t("description")}</label>
          <textarea
            type="text"
            required
            value={product.description || ""}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full bg-[#F9FAFB] outline-none mb-2 text-blue-900 text-base  my-1  p-1 
            border rounded-md"
          />
          <hr className="h-1"></hr>
        </div>
          <div className="flex bg-[#F9FAFB] px-4 h-20 mt-7 rounded-md justify-center items-center ">
          <div className="flex justify-between w-full gap-3 items-center">
            <div className="flex  w-full items-center">
              <button
                type="submit"
                id="btn-saveProduct"
                className="bg-blue-600 h-8  px-3 text-white w-full hover:bg-blue-800 rounded-lg"
                onClick={addProduct}
              >
                {t("save")}
              </button>
              <button
                type="submit"
                id="btn-editProduct"
                className="bg-blue-600 h-8  px-3 text-white w-full  hover:bg-blue-800 rounded-lg"
                onClick={updataProduct}
              >
                {t("save-changes")}
              </button>
            </div>

            <button
              type="submit"
              className="bg-white w-full  border h-8  px-3 text-gray-700ss   hover:bg-blue-800 hover:text-white rounded-lg"
              onClick={() => {
                let form = document.querySelector("#add-product-form");
                form.classList.add("hidden");
                // setProduct((prev) => ({
                //   ...prev,
                //   nameEn: "",
                //   nameAr: "",
                //   code: "",
                //   price: "",
                //   description: "",
                //   mainImage: "",
                //   img2: "",
                //   img3: "",
                //   category: {
                //     ...prev.category,
                //     id: "",
                //     nameAr: "",
                //     nameEn: "",
                //   },
                // }));
                // setenabledFavorite(false);
                // setenabledActive(true);
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
