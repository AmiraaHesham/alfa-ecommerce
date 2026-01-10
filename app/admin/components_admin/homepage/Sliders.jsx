"use client";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { IoCloudUploadSharp } from "react-icons/io5";
import Image from "next/image";
import { IoMdSave } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { LuEye } from "react-icons/lu";
import { TbLivePhotoFilled } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import LivePreview from '../../components_admin/homepage/LivePreview.jsx'

import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../../utils/requestsUtils.js";
import { getSliderImage } from "../../../../utils/functions.jsx";

export default function Sliders() {
 const { t } = useLanguage();
  const [sliderImages, setSliderImages] = useState([]);
 
  const [responsSuccess, setResponsSuccess] = useState();


  const getSliderImages = async () => {
    const res = await getSliderImage()
    console.log(res);
    setSliderImages(res);
  };

  const handelupload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("imageFile", file);
    await postRequest("/api/admin/sliderImages", formData, t("message_add"));
    getSliderImages();
  };

  const deleteSlideImage = async (deletedSliderImageId) => {
    try {
    const res = await deleteRequest(
      `/api/admin/sliderImages/${deletedSliderImageId}`,
      t('message')
    );
       getSliderImages();
    }
    catch(error){
      console.log(error)
    }
  };

  useEffect(() => {
    getSliderImages();
  }, []);


  return (
    <div className="h-auto  ">
      <div className=" w-[100%] my-1 ">
        <div className="flex items-center justify-between  gap-2 mb-3 ">
          <div className="flex items-center gap-3">
             <span className="text-xl text-blue-600">
            <TfiLayoutSliderAlt />
          </span>
          <h1 className="md:text-xl xs:text-lg font-semibold ">Sliders</h1>
            </div>
         <button
            id="btn-livePreview"
            className="p-2  bg-blue-300 text-white hover:bg-blue-600 text-sm rounded-md"
            onClick={() => {
              const LivePreview = document.querySelector("#LivePreview");
              LivePreview.classList.remove("hidden");
              LivePreview.classList.add("flex");
              const btn_hide = document.querySelector("#btn-hide");
              btn_hide.classList.remove("hidden");
              const btn_livePreview =
                document.querySelector("#btn-livePreview");
              btn_livePreview.classList.add("hidden");
            }}
          >
            {t("live_previwe")}
          </button>
          <button
            id="btn-hide"
            className="hidden p-2 bg-blue-600 text-white hover:bg-blue-300 text-sm rounded-md"
            onClick={() => {
              const btn_hide = document.querySelector("#btn-hide");
              btn_hide.classList.add("hidden");
              const btn_livePreview =
                document.querySelector("#btn-livePreview");
              btn_livePreview.classList.remove("hidden");
              const LivePreview = document.querySelector("#LivePreview");
              LivePreview.classList.add("hidden");
              LivePreview.classList.remove("flex");
            }}
          >
            {t("hide")}
          </button>
        </div>
        <div id="LivePreview" className=" hidden  justify-center items-center mb-10 w-full">
         <LivePreview sliderImages={sliderImages} />
        {/* <div className="grid lg:grid-cols-4 xs:grid-cols-1 w-full justify-between items-center gap-5"> */}
       </div>

        {/* </div> */}
      </div>
       <div className="w-full grid lg:grid-cols-5 md:grid-cols-3  xs:grid-cols-2 gap-3  ">
        <div className="bg-white border rounded-md h-[170px] w-full flex flex-col gap-3 p-4">
          <div className=" border-dashed flex justify-center p-5 items-center border-2 rounded-md border-blue-400 bg-gray-50  w-full h-full">
            <label htmlFor="fileInput">
              <div
                id="label-uplod"
                className="flex flex-col justify-center items-center"
              >
                <span className="text-2xl bg-white p-2 rounded-full text-blue-500">
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
              onChange={handelupload}
              className="hidden"
              id="fileInput"
            />
          </div>
        </div>
        {sliderImages.map((img, index) => {
          return (
            <div key={index} className="bg-white  h-[170px] border p-1 rounded-md"

            >
              <span className="flex justify-end mb-1">
                <button
                  className="text-sm text-gray-500 hover:text-gray-600"
                  onClick={()=>deleteSlideImage(img.sliderImageId)}
                >
                  <FaTimes />
                </button>
              </span>
              <div className="flex justify-center items-center ">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + img.imageUrl
                  }
                  alt=""
                  width={100}
                  height={100}
                  className="h-[140px] w-full rounded-md"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
    // </div>
  );
}