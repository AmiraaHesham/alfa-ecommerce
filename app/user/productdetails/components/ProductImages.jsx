"use client";
import { getThumbnailUrl } from "../../../../utils/functions";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { useLanguage } from "../../../../context/LanguageContext";

export default function ProductImages({ product }) {
  const urlImage = process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL;
  const swiperRef = useRef(null);
  const { locale } = useLanguage();

  return (
    <div className="w-full h-[450px] md:col-span-2 col-span-3 relative flex xs:flex-col md:flex-row gap-2">
      <div className="flex md:flex-col xs:flex-row  items-center gap-4 mt-5 xs:order-2 md:order-1 ">
         <div className={`relative   w-[80px] h-[80px] rounded-xl hover:opacity-50  cursor-pointer select-none shadow-md `}>
          <Image
            src={urlImage + getThumbnailUrl(product.mainImage)}
            alt="mainImage"
            fill

            priority
            className="object-fill rounded-xl"
            onClick={() => {
             
              swiperRef.current?.slideTo(0)
            }}
          />
        </div>
       

        {product.img3 ? (
          <div className="relative   w-[80px] h-[80px]  rounded-xl hover:opacity-50 cursor-pointer select-none shadow-md">
            <Image
              src={urlImage + getThumbnailUrl(product.img3)}
              alt="mainImage"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-fill  rounded-xl"
              onClick={() => {
                swiperRef.current?.slideTo(1);
              }}
            />
          </div>
        ) : (
          ""
        )}
        {product.img2 ? (
          <div className="relative w-[80px] h-[80px]  rounded-xl hover:opacity-50  cursor-pointer  select-none shadow-md">
            <Image
              src={urlImage + getThumbnailUrl(product.img2)}
              alt="mainImage"
              fill
              priority
              className="object-fill  rounded-xl"
              onClick={() => {
                swiperRef.current?.slideTo(2)
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <Swiper
        key={locale}
        slidesPerView={1}
        navigation={true}
        pagination={true}
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        dir={locale === "ar" ? "rtl" : "ltr"}
        spaceBetween={10}
        className="w-full h-full  select-none md:order-2 xs:order-1 "
      >

        {/* <div className="w-full h-full relative  flex justify-center  rounded-3xl    "> */}

        <SwiperSlide>
          <Image
            src={urlImage + product.mainImage}
            alt="mainImage"
            fill
            priority

            className=" rounded-3xl"
          />
        </SwiperSlide>
        {product.img3 ? (
          <SwiperSlide>
            <Image
              src={urlImage + product.img3}
              alt="mainImage"
              fill
              priority

              className=" rounded-3xl"
            />
          </SwiperSlide>) : ""}
        {product.img2 ? (
          <SwiperSlide>
            <Image
              src={urlImage + product.img2}
              alt="mainImage"
              fill
              priority

              className=" rounded-3xl"
            />
          </SwiperSlide>) : ""}
        {/* </div> */}


      </Swiper>

    </div>
  )
}