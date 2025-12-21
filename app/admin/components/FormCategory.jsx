import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext.js";

export default function Home({name_categ , img , state}) {
  const [photo, setPhoto] = useState();
  const categoryName = useRef();
  const { t } = useLanguage();

  const handelupload = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setPhoto(reader.result);
    };
    let upload = document.querySelector("#label-uplod");
    let img = document.querySelector("#lable-img");
    img.classList.remove("hidden");
    upload.classList.add("hidden");
  };


  const addCategory = async () => {
    try {
      console.log(categoryName.current.value);

      const res = await axios.post(
        "http://10.202.96.1/api/itemCategory/admin",
        {
          name: categoryName.current.value,
        }
      );
      console.log(categoryName.current.value);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="add-category-form"
      className="absolute  hidden  justify-center items-center w-full mt-5 "
    >
      <div className="bg-white shadow-md shadow-slate-400 h-[530px] w-[600px] flex flex-col border rounded-md">
        <div className="m-4 w-2">
          <span
            className="text-3xl text-blue-950  hover:text-blue-800"
            onClick={() => {
              let form = document.querySelector("#add-category-form");
              form.classList.add("hidden");
              let upload = document.querySelector("#label-uplod");
              let img = document.querySelector("#lable-img");
              img.classList.add("hidden");
              upload.classList.remove("hidden");
            }}
          >
            <MdCancel />
          </span>
        </div>
        <div className="flex   justify-center items-center ">
          <form
            className=" w-[50%] "
            onSubmit={(e) => {
              e.preventDefault();
              addCategory();
            }}
          >
            <div className="mb-4">
              <div className="flex flex-col gap-2 ">
                <label className="text-md text-gray-500">{t("cat-name")}* [ar] </label>
                <input
                  type="text"
                  ref={categoryName}
                  className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                />
                  <label className="text-md text-gray-500">{t("cat-name")}* [en] </label>
                <input
                  type="text"
                  ref={categoryName}
                  required
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
                    src={photo}
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
                className="bg-blue-600 py-2 px-3 text-white mt-7  hover:bg-blue-800 rounded-lg"
              >
                {t("save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
