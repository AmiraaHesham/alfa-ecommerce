"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useLanguage } from "../../../../context/LanguageContext";
import ProductCard from "../../components/ProductCard";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

export default function TopDiscounted({ Products }) {
  const { locale ,t } = useLanguage();
const swiperRef = useRef()
  useEffect(() => {
  }, []);
  return (
    <div className="relative w-full  md:h-[450px] xs:h-[600px] my-10 flex justify-center items-center rounded-3xl ">
        <Image
    src="/Images/img2.png"
    alt="banner"
    fill
    priority
    sizes="200vw"
    quality={100}
    className="object-fill rounded-3xl"
  />
      <div className="w-full h-full absolute flex md:flex-row xs:flex-col px-2 justify-center items-center ">
<div className="relative w-full mt-16 h-full flex flex-col justify-center items-center">
   <div className="absolute xs:-top-2 md:top-4 lg:top-10 flex justify-center w-full pointer-events-none">
     <div className="w-20 h-20 rounded-full bg-red-500 shadow-lg shadow-red-500/40 flex flex-col items-center justify-center text-white gap-1">
       <span className="text-[10px] font-medium leading-none tracking-wide">Save up to</span>
       <span className="text-xl font-bold leading-none">-45%</span>
     </div>
   </div>
   <div className=" text-center  text-white ">
          <h1 className="text-4xl font-semibold mb-3"> {t("top_discount")} </h1>
          <h2 className="text-sm">{t("text_for_discounts")} </h2>
        </div>
      
          <Link href="/user/products/section/all" className="bg-white rounded-2xl p-2 font-medium flex items-center mt-10">{t("shopNow")}  {locale === "ar"? <IoIosArrowRoundBack/>:<IoIosArrowRoundForward/>}</Link>
    
</div>
       
      <div className="group/swiper relative overflow-visible px-10 md:w-3/4 xs:w-full h-full flex justify-center items-center ">
      <Swiper
          key={locale}
          slidesPerView={"auto"}
          // slidesOffsetBefore={5}
          // slidesOffsetAfter={5}
          modules={[Navigation, Autoplay]}
    navigation={{
      prevEl: ".custom-prev",
      nextEl: ".custom-next",
    }}          dir={locale === "ar" ? "rtl" : "ltr"}
          spaceBetween={20}
           onSwiper={(swiper) => {
      swiperRef.current = swiper;
    }}
          className="w-full h-full "
        >   
          { Products.map((product) => {
            return (
              <SwiperSlide
                key={product.itemId}
                className="my-10 !w-[250px] rounded-lg select-none"
              >
                <div className="rounded-lg  flex justify-center  cursor-pointer">
                  <ProductCard productInfo={product} favorite={false} />
                </div>
              </SwiperSlide>
            );
          })
      
        }
    
         
      </Swiper>
      <div className=" lg:opacity-0 lg:invisible
    lg:group-hover/swiper:opacity-100 lg:group-hover/swiper:visible
    xs:opacity-100 xs:visible
    transition-all duration-300 ">
          <button
      type="button"
      onClick={() => swiperRef.current?.slideNext()}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-50
                  text-2xl
                flex items-center justify-center 
                text-gray-700 hover:text-black"
    >
      < MdOutlineArrowBackIosNew />
    </button>
        <button
      type="button"
      onClick={() => swiperRef.current?.slidePrev()}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-50
              
                text-2xl
                flex items-center justify-center  text-gray-700 hover:text-black"
    >
      < MdOutlineArrowForwardIos />
    </button>
      </div>
      

  {/* السهم الشمال */}
  
      </div>


      </div>
    </div>
  );
}
