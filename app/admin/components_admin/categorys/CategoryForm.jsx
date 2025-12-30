"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { postRequest, putRequest } from "../../../../utils/requestsUtils.js";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { useRouter } from "next/navigation";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext.jsx";

export default function CategoryForm() {
  const [photo, setPhoto] = useState({
    imageFile: "",
    image: "",
  });
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const { t } = useLanguage();
  const router = useRouter();
  const { triggerRefresh } = useRefresh();

  const { selectedId } = useIdContext();
  const { selectedNameEn } = useIdContext();
  const { selectedNameAr } = useIdContext();
  const { selectedPhoto } = useIdContext();

  const handelupload = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
            setPhoto((prev) => ({ ...prev, image:reader.result }));

    };
    const file = e.target.files[0];
    setPhoto((prev) => ({ ...prev, imageFile: file }));

console.log(file)
console.log(file.name)

    let upload = document.querySelector("#label-uplod");
    let img = document.querySelector("#lable-img");
    img.classList.remove("hidden");
    upload.classList.add("hidden");
  };

  const addCategory = async () => {
    let form = document.querySelector("#add-category-form");
    form.classList.add("hidden");
    let upload = document.querySelector("#label-uplod");
    let img = document.querySelector("#lable-img");
    img.classList.add("hidden");
    upload.classList.remove("hidden");
    try {
      const formData = new FormData()
      formData.append('nameEn',nameEn)
      formData.append('nameAr',nameAr)
      formData.append('imageFile', photo.imageFile)
      await postRequest("/api/admin/itemCategory", formData);
      triggerRefresh();
      setNameAr("");
      setNameEn("");
      setPhoto("");
    } catch (error) {
      console.log(error);
    }
  };

  const CategoryData = useCallback(async () => {
    if (selectedId != null) {
      try {
        await getRequest(`/api/admin/itemCategory/${selectedId}`);
        setNameAr(selectedNameAr), setNameEn(selectedNameEn);setPhoto((prev) => ({ ...prev, image: selectedPhoto }))
           let upload = document.querySelector("#label-uplod");
    let img = document.querySelector("#lable-img");
    img.classList.remove("hidden");
    upload.classList.add("hidden");
      } catch (error) {
        console.log(error);
      }
    }
  }, [selectedId, selectedNameAr, selectedNameEn,selectedPhoto]);

  const updateCategory = async () => {
    let form = document.querySelector("#add-category-form");
    form.classList.add("hidden");
    let upload = document.querySelector("#label-uplod");
    let img = document.querySelector("#lable-img");
    img.classList.add("hidden");
    upload.classList.remove("hidden");

    try {
     const formData = new FormData()
      formData.append('nameEn',nameEn)
      formData.append('nameAr',nameAr)
      formData.append('imageFile', photo.imageFile)

      // formData.append('imageFile', photo.imageFile)
      await putRequest(`/api/admin/itemCategory/${selectedId}`,formData);
      triggerRefresh();
      setNameAr("");
      setNameEn("");
      setPhoto("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CategoryData();
  }, [CategoryData]);
  return (
    <div
      id="add-category-form"
      className=" hidden justify-center items-center w-full  mt-5"
    >
      <div className="bg-white shadow-md shadow-slate-400 h-[530px] xs:w-full lg:w-[600px] flex flex-col border rounded-md">
        <div className="m-4 flex justify-between items-center">
          <h1 id="nameFormCategory" className="text-lg font-semibold"></h1>
          <span
            className="text-3xl text-blue-950  hover:text-blue-800"
            onClick={() => {
              let form = document.querySelector("#add-category-form");
              form.classList.add("hidden");
              // let upload = document.querySelector("#label-uplod");
              // let img = document.querySelector("#lable-img");
              // img.classList.add("hidden");
              // upload.classList.remove("hidden");
              // setNameAr("");
              // setNameEn("");
              // setPhoto("");
            }}
          >
            <MdCancel />
          </span>
        </div>
        <hr className="h-1 mb-3"></hr>
        <div className="flex   justify-center items-center ">
          <form
            className=" w-[50%] "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mb-4">
              <div className="flex flex-col gap-2 ">
                <label className="text-md text-gray-500">
                  {t("category_name")}* [en]
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                />
                <label className="text-md text-gray-500">
                  {t("category_name")}* [ar]
                </label>
                <input
                  type="text"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                />
              </div>
            </div>
            <label htmlFor="fileInput">
              <div className="flex flex-col items-center h-[150px]  justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
                <div
                  id="label-uplod"
                  className="flex flex-col justify-center items-center"
                >
                  <span className="text-4xl text-blue-600">
                    <IoCloudUploadSharp />
                  </span>
                  <span className="text-sm text-gray-500">
                    {t("add-photo")}
                  </span>
                </div>
                <div id="lable-img" className="hidden w-[100px] h-[100px]">
                  <Image
                    alt=""
                    src={photo.image}
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
              onChange={handelupload}
              className="hidden"
              id="fileInput"
            />

            <div className="flex justify-center items-center">
              <button
                type="submit"
                id="btn-saveCategory"
                className="bg-blue-600 py-2 px-3 text-white mt-7  hover:bg-blue-800 rounded-lg  "
                onClick={() => {
                  addCategory(); // ← لو في وضع الإضافة
                }}
              >
                {t("save")}
              </button>
              <button
                type="submit"
                id="btn-editCategory"
                className="bg-blue-600 py-2 px-3 text-white mt-7  hover:bg-blue-800 rounded-lg"
                onClick={() => {
                  updateCategory();
                }}
              >
                {t("save-changes")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
