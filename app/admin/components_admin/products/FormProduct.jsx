"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { Switch } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { getCategories } from "../../../../utils/functions";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../utils/requestsUtils.js";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import { useIdContext } from "../../../../context/idContext";

export default function FormProduct({ name_categ, img, state }) {
  const [enabledVisible, setEnabledVisible] = useState(true);
  const [enabledFeatured, setEnabledFeatured] = useState(false);
  const { triggerRefresh } = useRefresh();
  const { selectedId } = useIdContext();
  const { selectedNameEn } = useIdContext();
  const { selectedNameAr } = useIdContext();
  const { selectedCode } = useIdContext();
  const { selectedPrice } = useIdContext();
  const { selectedDescription } = useIdContext();
  const { selectedVisible } = useIdContext();
  const { selectedCategory } = useIdContext();
  const { selectedFeatured } = useIdContext();
  const { selectedPhoto} = useIdContext();
  const [photo, setPhoto] = useState({
    img1: "",
    img2: "",
    img3: "",
  });
  const [product, setProduct] = useState({
    nameEn: "",
    nameAr: "",
    category: Number,
    price: Number,
    description: "",
    code: "",
    mainImage:""
  });

  const handelupload = (e, photoKey) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPhoto((prev) => ({
        ...prev,
        [photoKey]: reader.result,
      }));
    };

      setProduct((prev) => ({
        ...prev,
        mainImage: file,
      }));
      console.log(typeof file)
    
  };
  let [itemCategory, setItemCategory] = useState([]);

  const showeCategories = async () => {
    const resData = await getCategories();
    setItemCategory(resData);
  };
  const addProduct = async () => {
    let form = document.querySelector("#add-product-form");
    form.classList.add("hidden");
    try {
      await postRequest("/api/admin/items", {
        nameEn: product.nameEn,
        nameAr: product.nameAr,
        code: product.code,
        price: product.price,
        description: product.description,
        favorite: enabledVisible,
        active: enabledVisible,
        itemCategoryId: product.category,
      });
      triggerRefresh();
      setProduct((prev) => ({ ...prev, nameEn: "" }));
      setProduct((prev) => ({ ...prev, nameAr: "" }));
      setProduct((prev) => ({ ...prev, code: "" }));
      setProduct((prev) => ({ ...prev, price: "" }));
      setProduct((prev) => ({ ...prev, description: "" }));
      setProduct((prev) => ({ ...prev, enabledVisible: true }));
      setProduct((prev) => ({ ...prev, category: "Choose Category" }));
      setProduct((prev) => ({ ...prev, enabledVisible: false }));
    } catch (error) {
      console.log(error);
    }
  };
  const productData = useCallback(async () => {
    try {
      const res = await getRequest(`/api/public/items/${selectedId}`);
      setProduct((prev) => ({ ...prev, nameEn: selectedNameEn }));
      setProduct((prev) => ({ ...prev, nameAr: selectedNameAr }));
      setProduct((prev) => ({ ...prev, code: selectedCode }));
      setProduct((prev) => ({ ...prev, price: selectedPrice }));
      setProduct((prev) => ({ ...prev, description: selectedDescription }));
      // setProduct((prev) => ({ ...prev, enabledVisible: selectedVisible }));
      // setProduct((prev) => ({ ...prev, enabledFeatured: selectedFeatured }));
      setEnabledFeatured(selectedFeatured);
      setEnabledVisible(selectedVisible);
      setProduct((prev) => ({ ...prev, itemCategoryId: selectedCategory }));
    } catch (error) {
      console.log(error);
    }
  }, [
    selectedId,
    selectedNameEn,
    selectedNameAr,
    selectedCode,
    selectedPrice,
    selectedDescription,
    selectedVisible,
    selectedFeatured,
    selectedCategory,
  ]);

  const updataProduct = async () => {
     let form = document.querySelector("#add-product-form");
    form.classList.add("hidden");
    try {
      const formData = new FormData();
      formData.append("nameEn",product.nameEn)
      formData.append("nameAr",product.nameAr)
      formData.append("code",product.code)
      formData.append("price",Number(product.price))
      formData.append("description",product.description)
      formData.append("mainImage",product.mainImage)
      formData.append("itemCategoryId",product.category)

      // formData.append(itemCategoryId,product.category)
      await putRequest(`/api/admin/items/${selectedId}`, formData);
      triggerRefresh();

      setProduct((prev) => ({ ...prev, nameEn: "" }));
      setProduct((prev) => ({ ...prev, nameAr: "" }));
      setProduct((prev) => ({ ...prev, code: "" }));
      setProduct((prev) => ({ ...prev, price: "" }));
      setProduct((prev) => ({ ...prev, description: "" }));
      setEnabledFeatured(false);
      setEnabledVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showeCategories();
    productData();
  }, [productData]);
  const { t } = useLanguage();

  return (
    <div
      id="add-product-form"
      className=" absolute w-full  h-full   hidden justify-end items-end "
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
              setProduct((prev) => ({ ...prev, nameEn: "" }));
              setProduct((prev) => ({ ...prev, nameAr: "" }));
              setProduct((prev) => ({ ...prev, code: "" }));
              setProduct((prev) => ({ ...prev, price: "" }));
              setProduct((prev) => ({ ...prev, description: "" }));
              setEnabledFeatured(false);
              setEnabledVisible(true);
            }}
          >
            <FaTimes />
          </span>
        </div>
        <hr className="h-1"></hr>

        <div className="flex flex-col text-gray-600  mt-2">
          <h1 className="T">{t("product_images")}</h1>

          <div className="grid sm:grid-cols-3  xs:grid-cols-2 gap-6 mt-3">
            <label htmlFor="fileInput">
              <div className="flex flex-col items-center h-[120px] w-[120px]  justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
                {photo.img1 ? (
                  <div id="lable-img1" className=" w-[100px] h-[100px]">
                    {photo.img1 && (
                      <Image
                        alt=""
                        src={photo.img1}
                        width={100}
                        height={100}
                        className="w-full h-full"
                      ></Image>
                    )}
                  </div>
                ) : (
                  <div
                    id="label-uplod-img1"
                    className="flex flex-col mt-7 justify-center items-center"
                  >
                    <span className="text-2xl text-blue-600">
                      <IoCloudUploadSharp />
                    </span>
                    <div className="flex gap-1 flex-col items-center">
                      <span className="text-xs text-gray-500">
                        {t("add-photo")}
                      </span>
                      <span className="text-xs text-gray-500">
                        {t("photo_main")}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handelupload(e, "img1")}
                      className="hidden"
                      id="fileInput"
                    />
                  </div>
                )}
              </div>
            </label>

            <label htmlFor="fileInput">
              <div className="flex flex-col items-center h-[120px] w-[120px]  justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
                {photo.img2 ? (
                  <div id="lable-img1" className=" w-[100px] h-[100px]">
                    {photo.img2 && (
                      <Image
                        alt=""
                        src={photo.img2}
                        width={100}
                        height={100}
                        className="w-full h-full"
                      ></Image>
                    )}
                  </div>
                ) : (
                  <div
                    id="label-uplod-img1"
                    className="flex flex-col mt-3 justify-center items-center"
                  >
                    <span className="text-2xl text-blue-600">
                      <IoCloudUploadSharp />
                    </span>
                    <div className="flex gap-1 flex-col items-center">
                      <span className="text-xs text-gray-500">
                        {t("add-photo")}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handelupload(e, "img2")}
                      className="hidden"
                      id="fileInput"
                    />
                  </div>
                )}
              </div>
            </label>

            <label htmlFor="fileInput">
              <div className="flex flex-col items-center h-[120px] w-[120px]  justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
                {photo.img3 ? (
                  <div id="lable-img1" className=" w-[100px] h-[100px]">
                    {photo.img3 && (
                      <Image
                        alt=""
                        src={photo.img3}
                        width={100}
                        height={100}
                        className="w-full h-full"
                      ></Image>
                    )}
                  </div>
                ) : (
                  <div
                    id="label-uplod-img1"
                    className="flex flex-col mt-3 justify-center items-center"
                  >
                    <span className="text-2xl text-blue-600">
                      <IoCloudUploadSharp />
                    </span>
                    <div className="flex gap-1 flex-col items-center">
                      <span className="text-xs text-gray-500">
                        {t("add-photo")}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handelupload(e, "img3")}
                      className="hidden"
                      id="fileInput"
                    />
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-7 ">
          <div className=" w-full flex md:flex-row justify-between xs:flex-col gap-3">
            <div className="">
              <label className="text-sm text-gray-600 mb-10">
                {t("product_name")}* [En]
              </label>
              <input
                type="text"
                value={product.nameEn || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, nameEn: e.target.value }))
                }
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-base  my-1  p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">
                {t("product_name")}* [Ar]
              </label>
              <input
                type="text"
                value={product.nameAr || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, nameAr: e.target.value }))
                }
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-base my-1  p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex items-center md:flex-row  xs:flex-col  justify-between gap-3">
            <div className="w-full">
              <label className="text-sm text-gray-600">
                {t("product_code")}
              </label>
              <input
                type="text"
                value={product.code || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, code: e.target.value }))
                }
                required
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-base  my-1  p-2 border rounded-md"
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-gray-600">{t("Category")}</label>
              <select
                type="text"
                onChange={(e) =>{
                      const selectedCategoryId = e.target.value; 
                  setProduct((prev) => ({ ...prev, category: selectedCategoryId }))
                }}
                required
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-base my-1  p-3 border rounded-md"
              >
                <option></option>
                {itemCategory.map((category, index) => {
                  return (
                    <option key={index} value={category.itemCategoryId}>
                      {localStorage.lang === "ar"
                        ? category.nameAr
                        : category.nameEn}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex md:flex-row  xs:flex-col  justify-between gap-3">
            <div className="w-full">
              <label className="text-sm text-gray-600">{t("Price")}</label>
              <input
                type="number"
                value={product.price || ""}
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, price: e.target.value }))
                }
                required
                className=" bg-[#F9FAFB] w-full outline-none text-blue-900 text-base  my-1  p-2 border rounded-md"
              />
            </div>
            <div className="w-full ">
              <label className="w-full">
                <h1 className="text-sm text-gray-600">{t("product_state ")}</h1>
              </label>
              <div className="bg-[#F9FAFB] flex items-center justify-between h-10 px-3 my-2 border rounded-md ">
                <h1 className="text-sm text-gray-600">
                  {t("visible_in_store")}
                </h1>
                <Switch
                  checked={enabledVisible}
                  onChange={setEnabledVisible}
                  className={`${enabledVisible ? "bg-blue-600" : "bg-gray-300"}
    relative inline-flex h-5 w-12 shrink-0 cursor-pointer rounded-full 
    border-2 border-transparent transition-colors duration-200 ease-in-out`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      enabledVisible ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </Switch>
                {/* <Switch
                  checked={enabledVisible}
                  onChange={setEnabledVisible}
                  className={
                    `${enabledVisible ? "bg-blue-600" : "bg-gray-300"}
    relative inline-flex h-5 w-12 shrink-0 cursor-pointer rounded-full 
    border-2 border-transparent transition-colors duration-200 ease-in-out` +
                      localStorage.lang ===
                    "ar"
                      ? "block"
                      : "hidden"
                  }
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      enabledVisible
                        ? "translate-x-0"
                        : "translate-x-[-30px]" + localStorage.lang === "ar"
                        ? "block"
                        : "hidden"
                    }`}
                  />
                </Switch> */}
              </div>
              <div className="bg-[#F9FAFB] flex items-center justify-between   h-10   px-3  border rounded-md ">
                <h1 className="text-sm text-gray-600">
                  {t("featured-product")}
                </h1>
                <Switch
                  checked={enabledFeatured}
                  value={enabledFeatured}
                  onChange={setEnabledFeatured}
                  className={`${enabledFeatured ? "bg-blue-600" : "bg-gray-300"}
    relative inline-flex h-5 w-12 shrink-0 cursor-pointer rounded-full 
    border-2 border-transparent transition-colors duration-200 ease-in-out`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full 
      bg-white shadow ring-0 transition duration-200 ease-in-out
      ${enabledFeatured ? "translate-x-7" : "translate-x-0"}`}
                  />
                </Switch>
              </div>
            </div>
          </div>
          <label className="text-sm text-gray-700">{t("description")}</label>
          <textarea
            type="text"
            required
            value={product.description || ""}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full bg-[#F9FAFB] outline-none mb-2 text-blue-900 text-base  my-1  p-2 
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
                setProduct((prev) => ({ ...prev, nameEn: "" }));
                setProduct((prev) => ({ ...prev, nameAr: "" }));
                setProduct((prev) => ({ ...prev, code: "" }));
                setProduct((prev) => ({ ...prev, price: "" }));
                setProduct((prev) => ({ ...prev, description: "" }));
                setEnabledFeatured(false);
                setEnabledVisible(true);
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
