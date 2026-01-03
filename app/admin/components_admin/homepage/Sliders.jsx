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
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../../utils/requestsUtils.js";

export default function Sliders() {
  const { t } = useLanguage();
  // const [image, setImage] = useState();

  const [sliderImages, setSliderImages] = useState([]);
  //   const contentRef =useRef()
  const handelupload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("imageFile", file);
    await postRequest("/api/admin/sliderImages", formData);
  };
  const getSliderImage = async () => {
    const res = await getRequest("/api/admin/sliderImages");
    console.log(res);
    setSliderImages(res);
  };

  const deleteSlideImage = async (deletedSliderImageId) => {
    await deleteRequest(`/api/admin/sliderImages/${deletedSliderImageId}`);
    getSliderImage();
  };
  useEffect(() => {
    getSliderImage();
  }, []);

  return (
    <div className="h-auto mx-5">
      <div className=" w-[100%] my-1 ">
        <div className="flex items-center gap-2 mb-3 ">
          <span className="text-xl text-blue-600">
            <TfiLayoutSliderAlt />
          </span>
          <h1 className="md:text-xl xs:text-lg font-semibold ">Sliders</h1>
        </div>
        {/* <div className="grid lg:grid-cols-4 xs:grid-cols-1 w-full justify-between items-center gap-5"> */}
        {/* <div className=" lg:col-span-3  xs:col-span-1 bg-black border h-full rounded-md ">
            <div className="bg-white h-full w-[100%] p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">
                    <LuEye />
                  </span>
                  <h1 className="font-semibold md:text-sm xs:text-xs text-gray-600">
                    Live Previwe
                  </h1>
                </div>
                <span className="flex items-center md:text-sm xs:text-xs gap-2 bg-green-50 p-1 rounded-md text-green-500 font-semibold">
                  <TbLivePhotoFilled />
                  <h1>Live</h1>
                </span>
              </div>

              <div className=" mt-3  ">
                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                  spaceBetween={20}
                  modules={[Pagination]}
                  className=" flex justify-center items-center"
                >
                  <SwiperSlide>
          
                    <Image
                      src="/slide.png"
                      alt=" "
                      width={500}
                      height={500}
                      className=" w-full rounded-lg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
     
                    <Image
                      src="/slide.png"
                      alt=" "
                      width={500}
                      height={500}
                      className=" w-full rounded-lg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
           
                    <Image
                      src="/slide.png"
                      alt=" "
                      width={500}
                      height={500}
                      className=" w-full rounded-lg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                
                    <Image
                      src="/slide.png"
                      alt=" "
                      width={500}
                      height={500}
                      className="w-full rounded-lg"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div> */}

        {/* </div> */}
      </div>
      <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 xs:grid-cols-2 gap-3  ">
        <div className="bg-white border rounded-md h-full w-full flex flex-col gap-3 p-5">
          <h1 className="text-xs font-bold text-gray-600">Upload New Image</h1>
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
                    <h1 className="mb-2">Click to upload</h1>
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
            <div key={index} className="bg-white   border p-4 rounded-md">
              <span className="flex justify-end mb-1">
                <button
                  className="text-lg text-gray-500 hover:text-gray-600"
                  onClick={()=>deleteSlideImage(img.sliderImageId)}
                >
                  <FaTimes />
                </button>
              </span>
              <div className="flex justify-center items-center border">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + img.imageUrl
                  }
                  alt=""
                  width={100}
                  height={100}
                  className="h-[100px] rounded-md"
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
