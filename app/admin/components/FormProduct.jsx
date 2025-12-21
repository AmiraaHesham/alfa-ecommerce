"use client"
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext.js";

export default function FormProduct({name_categ , img , state}) {
  const [photo, setPhoto] = useState();
  const categoryName = useRef();
  const { t } = useLanguage();
    return (
    <div className=" absolute w-full  h-full   flex justify-end items-end ">
<div className=" bg-white w-[550px] px-10 pb-10 border overflow-hidden overflow-y-scroll h-full">
    <div className="h-16 flex items-center ">
        <h1 className="text-xl font-semibold">Add Product </h1>
    </div>
    <hr className="h-1"></hr>
     <div className="flex justify-between mt-3">
<label htmlFor="fileInput">
                            <div className="flex flex-col items-center h-[140px] w-[140px]  justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
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
                                  src={''}
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
                            // onChange={handelupload}
                            className="hidden"
                            id="fileInput"
                          />
                          <label htmlFor="fileInput">
                            <div className="flex flex-col items-center h-[140px] w-[140px] justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
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
                                  src={''}
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
                            // onChange={handelupload}
                            className="hidden"
                            id="fileInput"
                          />
                          <label htmlFor="fileInput">
                            <div className="flex flex-col items-center h-[140px] w-[140px] justify-center p-3 border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-50">
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
                                  src={''}
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
                            // onChange={handelupload}
                            className="hidden"
                            id="fileInput"
                          />
              </div>
    <div className="flex flex-col gap-2 mt-7 ">
                <label className="text-md text-gray-500">Product Name </label>
                <input
                  type="text"
                  ref={categoryName}
                  className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                />
                <div className="flex gap-3">
                    <div> <label className="text-md text-gray-500">Product Code </label>
                <input
                  type="text"
                  ref={categoryName}
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                /></div>
                    <div>
                <label className="text-md text-gray-500">Category</label>
                <input
                  type="text"
                  ref={categoryName}
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                />
                    </div>
              
                </div>
                
                 <label className="text-md text-gray-500">Description</label>
                <textarea
                  type="text"
                  ref={categoryName}
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                />
                <hr className="h-1"></hr>
                <div className="flex gap-3">
<div> <label className="text-md text-gray-500">Price</label>
                <input
                  type="text"
                  ref={categoryName}
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                /></div>
               <div> <label className="text-md text-gray-500">Price</label>
                <input
                  type="text"
                  ref={categoryName}
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-blue-900 text-lg  p-1 border rounded-md"
                /></div>
                                </div>
                                <div className="flex justify-center items-center ">
<div className="flex  gap-3 items-center">
    <button
                type="submit"
                className="bg-blue-600 py-2 px-3 text-white mt-7 w-[150px] hover:bg-blue-800 rounded-lg"
              >
                {t("save")}
              </button>
              <button
                type="submit"
                className="bg-white border py-2 px-3 text-gray-700s mt-7 w-[150px] hover:bg-blue-800 rounded-lg"
              >
Cancel              </button>
</div>
                                </div>

              </div>
             
               
</div>

        </div>
  );
}