"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { Switch } from "@headlessui/react";
import { FaCircle, FaTimes } from "react-icons/fa";
import {
  getCategories,
  getProductDetails,
} from "../../../../utils/functions.jsx";
import {
  getRequest,
  postRequest,
  putRequest,
} from "../../../../utils/requestsUtils.js";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import { useIdContext } from "../../../../context/idContext.jsx";
import { GoStarFill } from "react-icons/go";
import { toast } from "react-toastify";

export default function FormProduct() {
  const [enabledActive, setenabledActive] = useState(true);
  const [enabledFavorite, setenabledFavorite] = useState(false);
  const { triggerRefresh } = useRefresh();
  const { selectedProductId, setSelectedProductId } = useIdContext();
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    nameEn: "",
    nameAr: "",
    price: 0,
    oldPrice: 0,
    descriptionEn: "",
    descriptionAr: "",
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
    setItemCategory(resData.data);
  };

  // const images = () => {
  //   console.log(product.img2file);
  //   console.log(product.img3file);
  //   console.log(product.mainImagefile);
  // };

  const addProduct = async () => {
    // let form = document.querySelector("#add-product-form");
    // form.classList.add("hidden");

    const formData = new FormData();
    formData.append("nameEn", product.nameEn);
    formData.append("nameAr", product.nameAr);
    formData.append("code", product.code);
    formData.append("price", product.price);
    formData.append("oldPrice", product.oldPrice);
    formData.append("descriptionAr", product.descriptionAr);
    formData.append("descriptionEn", product.descriptionEn);
    formData.append("favorite", enabledFavorite);
    formData.append("active", enabledActive);
    formData.append("itemCategoryId", product.category.id);
    if (product.mainImagefile) formData.append("mainImage", product.mainImagefile);
    if (product.img2file) formData.append("itemImages", product.img2file);
    if (product.img3file) formData.append("itemImages", product.img3file);
    // console.log(formData);
    setLoading(true);
    try {
      await postRequest("/api/admin/items", formData, t("message_AddText"));
      triggerRefresh();
      setSelectedProductId(null);
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };
  // setProduct({
  //   nameEn: "",
  //   nameAr: "",
  //   price: 0,
  //   oldPrice: 0,
  //   descriptionAr: "",
  //   descriptionEn: "",
  //   category: { id: 0, nameAr: "", nameEn: "" },
  //   code: "",
  //   mainImage: "",
  //   img2: "",
  //   img3: "",
  // });
  // setProduct((prev) => ({ ...prev, enabledActive: false }));
  // setProduct((prev) => ({ ...prev, enabledActive: true }));

  const productData = async () => {
    try{
      if (selectedProductId != null) {
      const deleteImg = document.querySelector("#delete-mainImage");
      deleteImg.classList.remove("hidden");
      const labelImg = document.querySelector("#mainImage");
      labelImg.classList.remove("hidden");
      const labelUpload = document.querySelector("#label-mainImage");
      labelUpload.classList.add("hidden");
      const res = await getProductDetails(selectedProductId);

      setProduct((prev) => ({
        ...prev,
        nameEn: res.nameEn,
        nameAr: res.nameAr,
        code: res.code,
        price: res.price,
        oldPrice: res.oldPrice,
        descriptionAr: res.descriptionAr,
        descriptionEn: res.descriptionEn,
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
    } else {
      setProduct((prev) => ({
        ...prev,
        nameEn: "",
        nameAr: "",
        code: "",
        price: 0,
        oldPrice: 0,
        descriptionAr: "",
        descriptionEn: "",
        mainImage: "",
        img2: "",
        img3: "",
        category: { id: "", nameAr: "", nameEn: "" },
      }));
      const labelUpload = document.querySelector(`#label-mainImage`);
      labelUpload.classList.remove("hidden");
      const labelImg = document.querySelector(`#mainImage`);
      labelImg.classList.add("hidden");

      const deleteImg = document.querySelector(`#delete-mainImage`);
      deleteImg.classList.add("hidden");

      setenabledFavorite(false);
      setenabledActive(true);
    }
    }
    catch(error){
console.log(error)
    }finally {
      setLoading(false);
    }
    
  }
 

  const updataProduct = async () => {
try{
   if (product.oldPrice > product.price || product.oldPrice ) {
      let form = document.querySelector("#add-product-form");
      form.classList.add("hidden");
      const formData = new FormData();
      formData.append("nameEn", product.nameEn);
      formData.append("nameAr", product.nameAr);
      formData.append("code", product.code);
      formData.append("price", product.price);
      formData.append("oldPrice", product.oldPrice);
      formData.append("descriptionAr", product.descriptionAr);
      formData.append("descriptionEn", product.descriptionEn);
      formData.append("active", enabledActive);
      formData.append("favorite", enabledFavorite);
      if (product.mainImagefile)
        formData.append("mainImage", product.mainImagefile);
      if (product.img2file) formData.append("itemImages", product.img2file);
      if (product.img3file) formData.append("itemImages", product.img3file);
      formData.append("itemCategoryId", product.category.id);
      await putRequest(
        `/api/admin/items/${selectedProductId}`,
        formData,
        t("message_EditText"),
      );
      triggerRefresh();
      selectedProductId === null;

      const oldPrice = document.querySelector("#oldPrice");
      oldPrice.classList.remove("border-red-600");
    } else {
      const oldPrice = document.querySelector("#oldPrice");
      oldPrice.classList.add("border-red-600");
      toast.error(t("check_oldPrice"));
    }
}catch(error){
  console.log(error)
}finally{
        setLoading(false);

}
   
  };
  useEffect(() => {
    showeCategories();
    productData();
  }, []);
  const { t } = useLanguage();

  return (
    <div
      id="add-product-form"
      className=" absolute w-full hidden justify-end items-end h-full"
    >
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Image
            src="/Images/logo.png"
            alt=""
            className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
            width={100}
            height={100}
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
          <h1 id="nameFormProduct" className="text-xl font-semibold"></h1>
          <span
            className="text-xl text-gray-500  hover:text-red-800"
            onClick={() => {
              let form = document.querySelector("#add-product-form");
              form.classList.add("hidden");
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
              <div className="h-4">
                <span
                  id="delete-mainImage"
                  className="hidden"
                  onClick={() => {
                    const deleteImg =
                      document.querySelector("#delete-mainImage");
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
              </div>

              <label htmlFor="fileInput-mainImage">
                <div className="flex flex-col items-center h-[140px]  justify-center p-3 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50">
                  <div
                    id="label-mainImage"
                    className="flex flex-col mt-3 justify-center items-center"
                  >
                    <span className="text-4xl text-red-600">
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
              <div className="h-4">
                <span id="delete-img2" className="hidden ">
                  <FaTimes />
                </span>
              </div>
              <label htmlFor="fileInput-img2">
                <div className="flex flex-col items-center h-[140px]  justify-center p-3 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50">
                  <div
                    id="label-img2"
                    className="flex flex-col justify-center items-center"
                  >
                    <span className="text-4xl text-red-600">
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
              <div className="h-4">
                <span id="delete-img3" className="hidden ">
                  <FaTimes />
                </span>
              </div>

              <label htmlFor="fileInput-img3">
                <div className="flex flex-col items-center h-[140px]   justify-center p-3 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50">
                  <div
                    id="label-img3"
                    className="flex flex-col justify-center items-center"
                  >
                    <span className="text-4xl text-red-600">
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
                onChange={(e) =>
                  setProduct((prev) => ({ ...prev, oldPrice: e.target.value }))
                }
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
                className="bg-red-600 h-8  px-3 text-white w-full hover:bg-red-800 rounded-lg"
                onClick={addProduct}
              >
                {t("save")}
              </button>
              <button
                type="submit"
                id="btn-editProduct"
                className="bg-red-600 h-8  px-3 text-white w-full  hover:bg-red-800 rounded-lg"
                onClick={updataProduct}
              >
                {t("save-changes")}
              </button>
            </div>

            <button
              type="submit"
              className="bg-white w-full  border h-8  px-3 text-gray-700ss   hover:bg-red-800 hover:text-white rounded-lg"
              onClick={() => {
                let form = document.querySelector("#add-product-form");
                form.classList.add("hidden");
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
