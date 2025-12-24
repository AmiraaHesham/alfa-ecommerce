"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { Switch } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

export default function FormProduct({ name_categ, img, state }) {
  const [enabled, setEnabled] = useState(true);
  const [lang, setLang] = useState("ar");
  useEffect(() => {
    const saved = localStorage.getItem("lang") || "ar";
    setLang(saved);
    document.documentElement.lang = saved;
    document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
  }, []);
  const toggleLanguage = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const [photo, setPhoto] = useState({
    img1: "",
    img2: "",
    img3: "",
  });
  const productName = useRef();
  const productCategory = useRef();
  const productPrice = useRef();
  const product = useRef();
  const productDescription = useRef();
  const productCode = useRef();

  const handelupload = (e, photoKey) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setPhoto((prev) => ({
        ...prev,
        [photoKey]: reader.result,
      }));
      console.log(localStorage.getItem("long"));
    };
    // let upload = document.querySelector(`#label-uplod-${photoKey}`);
    // let img = document.querySelector(`#lable-${photoKey}`);
    // img.classList.remove("hidden");
    // upload.classList.add("hidden");
  };
  const { t } = useLanguage();
  return (
    <div
      id="add-product-form"
      className=" absolute w-full  h-full   hidden justify-end items-end "
    >
      <div className=" bg-white shadow-md shadow-slate-400 rounded-lg w-[550px] px-7 pb-10 border overflow-hidden overflow-y-scroll h-full">
        <div className="h-16 flex justify-between items-center ">
          <h1 className="text-xl font-semibold">{t("add_product")} </h1>
           <span
            className="text-xl text-gray-500  hover:text-blue-800"
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
          <h1 className="T">{t("product_images")}</h1>
          <div className="flex justify-center items-center gap-6 mt-3">
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
          <label className="text-md text-gray-600"> {t("product_name")}</label>
          <input
            type="text"
            ref={productName}
            className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
          />
          <div className="flex gap-3">
            <div>
              <label className="text-md text-gray-600">
                {t("product_code")}{" "}
              </label>
              <input
                type="text"
                ref={productCode}
                required
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
              />
            </div>
            <div>
              <label className="text-md text-gray-600">{t("Category")}</label>
              <input
                type="text"
                ref={productCategory}
                required
                className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
              />
            </div>
          </div>

          <div
            className="flex items-center justify-between gap-3
          "
          >
            <div>
              <label className="text-md text-gray-600">{t("Price")}</label>
              <input
                type="text"
                ref={productPrice}
                required
                className=" bg-[#F9FAFB] w-full outline-none text-blue-900 text-lg  p-1 border rounded-md"
              />
            </div>
            <div className="w-[250px]">
              <label className="w-full">
                <h1 className="text-md text-gray-600">{t("product_state ")}</h1>
              </label>
              <div className="bg-[#F9FAFB] flex items-center justify-between w-[250px]  h-10   px-3  border rounded-md ">
                <h1 className="text-sm text-gray-600">
                  {t("visible_in_store")}
                </h1>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${enabled ? "bg-blue-600" : "bg-gray-300"}
    relative inline-flex h-5 w-12 shrink-0 cursor-pointer rounded-full 
    border-2 border-transparent transition-colors duration-200 ease-in-out`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full 
      bg-white shadow ring-0 transition duration-200 ease-in-out
      ${enabled ? "translate-x-7" : "translate-x-0"}`}
                  />
                </Switch>
              </div>
            </div>
          </div>
          <label className="text-md text-gray-700">{t("description")}</label>
          <textarea
            type="text"
            ref={productDescription}
            required
            className="w-full bg-[#F9FAFB] outline-none mb-2 text-blue-900 text-lg  p-1 
            border rounded-md"
          />
          <hr className="h-1"></hr>
        </div>
        <div className="flex bg-[#F9FAFB] h-20 mt-7 rounded-md justify-center items-center ">
          <div className="flex  gap-3 items-center">
            <button
              type="submit"
              className="bg-blue-600 h-7  px-3 text-white  w-[200px] hover:bg-blue-800 rounded-lg"
            >
              {t("save")}
            </button>
            <button
              type="submit"
              className="bg-white  border h-7  px-3 text-gray-700ss  w-[200px] hover:bg-blue-800 hover:text-white rounded-lg"
              onClick={() => {
                let form = document.querySelector("#add-product-form");
                form.classList.add("hidden");
                // let upload = document.querySelector("#label-uplod");
                // let img = document.querySelector("#lable-img");
                // img.classList.add("hidden");
                // upload.classList.remove("hidden");
              }}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
