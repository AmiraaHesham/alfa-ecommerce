"use client";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { IoCloudUploadSharp } from "react-icons/io5";
import Image from "next/image";
import { IoMdSave } from "react-icons/io";
import React, { useRef, useState } from "react";
import { LuEye } from "react-icons/lu";
import { TbLivePhotoFilled } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// import './styles.css';

export default function Sliders() {
  const { t } = useLanguage();
  const [photo, setPhoto] = useState([]);
  //   const contentRef =useRef()
  const handelupload = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setPhoto([...photo, reader.result]);
      console.log(photo);
    };

  };
  return (
    <div className="">
      <div className="  my-1 px-10 ">
        <div className="flex items-center gap-2  ">
          <span className="text-xl text-blue-600">
            <TfiLayoutSliderAlt />
          </span>
          <h1 className="text-xl font-semibold">Sliders</h1>
        </div>
        <div className="flex items-center gap-5">
          <div className=" w-[50%]   border rounded-md ">
            <div className="bg-white h-full  p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">
                    <LuEye />
                  </span>
                  <h1 className="font-semibold text-sm text-gray-600">
                    Live Previwe
                  </h1>
                </div>
                <span className="flex items-center gap-2 bg-green-50 p-1 rounded-md text-green-500 font-semibold">
                  <TbLivePhotoFilled />
                  <h1>Live</h1>
                </span>
              </div>

              <div className=" mt-3 ">
                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="w-[100%] block"
                >
                  <SwiperSlide>
          
                    <Image
                      src="/slide.png"
                      alt=" "
                      width={750}
                      height={300}
                      className=" rounded-lg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
     
                    <Image
                      src="/slide.png"
                      alt=" "
                      width={750}
                      height={300}
                      className=" rounded-lg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
           
                    <Image
                      src="/slide.png"
                      alt=" "
                      width={750}
                      height={300}
                      className=" rounded-lg"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                
                    <Image
                      src="/slide.png"
                      alt=" "
                      width={750}
                      height={300}
                      className=" rounded-lg"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-md w-[30%] h-full flex flex-col gap-3  my-3 p-4 ">
            <h1 className="text-sm font-bold text-gray-600">
              Upload New Image
            </h1>
            <div className=" border-dashed flex justify-center items-center border-2 rounded-md border-blue-400 bg-gray-50  w-full h-full">
              <label htmlFor="fileInput">
                <div
                  id="label-uplod"
                  className="flex flex-col justify-center items-center"
                >
                  <span className="text-4xl bg-white p-4 rounded-full text-blue-500">
                    <IoCloudUploadSharp />
                  </span>
                  <span className="flex flex-col gap-2 items-center">
                    <div className="text-center">
                      <h1>Click to upload</h1>
                      <h2 className="text-xs text-gray-500">PNG, JPG or GIF</h2>
                      <h3 className="text-xs text-gray-500">
                        (Max. 1920x1080 px)
                      </h3>
                    </div>
                    <button className="text-sm  text-center font-bold text-blue-700">
                      Browse File
                    </button>
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
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-3 px-10 h-[200px] ">
        {photo.map((img, index) => {
          <div key={index} className="bg-white  border p-4 rounded-md">
            <span className="flex justify-end mb-1">
              <button className="text-lg text-gray-500 hover:text-gray-600">
                <FaTimes />
              </button>
            </span>
            <Image
              src={img}
              alt=""
              width={1000}
              height={1000}
              className="h-[150px] rounded-md"
            />
          </div>;
        })}
      </div>
    </div>
    // </div>
  );
}
