// components/ImageSlider.jsx
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

export default function FeatuerProducts({ Products, type }) {
  const { locale } = useLanguage();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="flex  justify-center items-center  relative  ">
      <div className=" w-full">
        <Swiper
          key={locale}
          slidesPerView={"auto"}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".next-btn1",
            prevEl: ".prev-btn1",
          }}
          dir={locale === "ar" ? "rtl" : "ltr"}
          spaceBetween={10}
          className="w-full h-full rounded-xl flex   "
        >
          {type === "FeaturedProducts" || type === "newProduct"? Products.map((product) => {
            return (
              <SwiperSlide
                key={product.itemId}
                className=" mt-4 !w-[220px] rounded-lg "
              >
                <div className="rounded-lg h-[270px] flex justify-center  cursor-pointer">
                  <ProductCard productInfo={product} favorite={false} />
                </div>
              </SwiperSlide>
            );
          })
        :Products?.map((product,index) => {
            return (
              <SwiperSlide
                key={index}
                className=" mt-4 !w-[220px] rounded-lg "
              >
                <div className="rounded-lg h-[370px] flex justify-center  cursor-pointer">
                  <ProductCard productInfo={product.item} favorite={false} />
                </div>
              </SwiperSlide>
            );
          })
        }
          <div className=" flex flex-col justify-center items-center relative my-10">
            {/* <div className=" p-1 rounded-full absolute flex gap-2 justify-center items-center  ">
              <button className="prev-btn1 p-1 rounded-full border-2 hover:bg-red-600 border-red-600   hover:text-white text-red-600 text-3xl   font-bold">
                {locale === "ar" ? (
                  <IoIosArrowRoundForward className="text-3xl font-bold" />
                ) : (
                  <IoIosArrowRoundBack />
                )}
              </button>
              <button className="next-btn1 p-1 rounded-full border-2 hover:bg-red-600 border-red-600   hover:text-white text-red-600 text-3xl   font-bold">
                {locale === "ar" ? (
                  <IoIosArrowRoundBack className="text-3xl font-bold" />
                ) : (
                  <IoIosArrowRoundForward />
                )}
              </button>
            </div> */}
          </div>
        </Swiper>
      </div>
    </div>
  );
}
