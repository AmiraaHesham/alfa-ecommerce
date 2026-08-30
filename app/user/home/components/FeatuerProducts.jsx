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

        {type === "MoreRecommended" ?
          <div className="grid  xl:grid-cols-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
            {Products.map((product,index) => {
              return (

                <div  key={index} className="cursor-pointer">
                  <ProductCard productInfo={product} favorite={false} />
                </div>

              );
            })}
          </div>

          :
          <div className={`grid ${type === "FeaturedProducts" ?"xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-2" :"xl:grid-cols-3 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-2"} gap-3 `}>

            {Products?.map((product, index) => {
              return (

                <div  key={index} className="rounded-lg h-[370px] flex justify-center  cursor-pointer">
                  <ProductCard productInfo={product} favorite={false} />
                </div>
              );
            })
            }
          </div>
}
      </div>
    </div>
  );
}
