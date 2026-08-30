"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useLanguage } from "../../../../context/LanguageContext";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TopDiscounted({ Products }) {
  const { locale ,t } = useLanguage();

  useEffect(() => {
  }, []);
  return (
    <div className="relative w-full md:h-[500px] xs:h-[600px] flex justify-center items-center rounded-3xl ">
        <Image
    src="/Images/img.png"
    alt="banner"
    fill
    priority
    sizes="200vw"
    quality={100}
    className="object-fill rounded-3xl"
  />
      <div className="w-full h-full absolute flex md:flex-row xs:flex-col px-2 justify-center items-center ">
<div className="w-full h-full flex flex-col justify-center items-center">
   <div className=" text-center  text-white ">
          <h1 className="text-5xl"> {t("top_discount")} </h1>
          <h2>{t("text_for_discounts")}    </h2>
        </div>
      
          <button className="bg-white rounded-2xl p-2 font-medium flex items-center mt-10">{t("shopNow")}  {locale === "ar"? <IoIosArrowRoundBack/>:<IoIosArrowRoundForward/>}</button>
    
</div>
       
      <div className=" md:w-3/4 xs:w-full h-full flex justify-center items-center ">
      <Swiper
          key={locale}
          slidesPerView={"auto"}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
          modules={[Navigation, Autoplay]}
          navigation={true}
          dir={locale === "ar" ? "rtl" : "ltr"}
          spaceBetween={10}
          className="w-full h-full   "
        >
          { Products.map((product) => {
            return (
              <SwiperSlide
                key={product.itemId}
                className=" md:my-20 xs:my-4 !w-[220px] rounded-lg "
              >
                <div className="rounded-lg  flex justify-center  cursor-pointer">
                  <ProductCard productInfo={product} favorite={false} />
                </div>
              </SwiperSlide>
            );
          })
      
        }
     
      </Swiper>
      </div>


      </div>
    </div>
  );
}
