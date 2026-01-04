"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { TbLivePhotoFilled } from "react-icons/tb";
import { LuEye } from "react-icons/lu";

export default function ProductPreview({ sliderImages }) {
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  // useEffect(() => {
  //   if (isPopupOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //   }
  //   return () => {
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [isPopupOpen]);

  return (
    <div className="  border w-[800px] flex justify-center items-center rounded-xl ">
      <div className="bg-white h-[350px] rounded-xl  w-full p-3">
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

        <div className="flex justify-center items-center py-3 ">
          <Swiper
            pagination={{
              clickable: true,
            }}
            spaceBetween={20}
            modules={[Pagination]}
            className=" flex justify-center items-center"
          >
            {sliderImages.map((img, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL+img.imageUrl||''}`}
                    alt=" "
                    width={200}
                    height={200}
                    className="h-[290px]  border w-full rounded-lg"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
