"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

import { useIdContext } from "../../../../context/idContext";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useLanguage } from "../../../../context/LanguageContext";
import { useEffect, useState } from "react";
import { getThumbnailUrl } from "../../../../utils/functions";
import { useSearshInputContext } from "../../../../context/searshInputContext";

export default function CategorySection({ categories }) {
  const { locale } = useLanguage();

  const { t } = useLanguage();
  const { setSelectedSearchInput } = useSearshInputContext();

  const { setSelectedCategoryId } = useIdContext();
  const navigate = useRouter();
  const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);
if (!mounted) return null;
  return (
    <div className="flex flex-col justify-center items-center mt-20">
     
      <div className="w-full   ">
        <Swiper
          key={locale}
          modules={[Navigation]}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            700: {
              slidesPerView: 3,
            },
            900: {
              slidesPerView: 4,
            },
            1172: {
              slidesPerView: 5,
            },
            1487: {
              slidesPerView: 6,
            },
          }}
          dir={locale === "ar" ? "rtl" : "ltr"}
          spaceBetween={20}
          navigation={{
            nextEl: ".next-btn2",
            prevEl: ".prev-btn2",
          }}
          className="w-full h-full  "
        >
          {categories.map((category) => (
            <SwiperSlide
              key={category.itemCategoryId}
              className="mt-5   rounded-lg "
            >
              <div
                className="  h-[270px] border-2  border-gray-200 flex justify-center items-center text-center hover:shadow-xl hover:shadow-slate-300   hover:scale-105 duration-200 cursor-pointer rounded-md  hover:border-b-red-600 hover:border-b-[7px]"
                onClick={() => {
                  setSelectedSearchInput("")
                  setSelectedCategoryId(category.itemCategoryId);
                  navigate.push("/user/search/");
                }}
              >
                <div className=" py-2 rounded-lg">
                  <div className="relative h-[150px] w-[150px]">

                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${
                     getThumbnailUrl(category.imageURL)  || ""
                    }`}
                    alt={category.nameAr || "category"}
                    fill
                    className="object-contain"
                  />
                  </div>
                  <h1 className="font-semibold  mt-10">
                    {locale === "ar"
                      ? category.nameAr
                      : category.nameEn}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className=" flex flex-col justify-center items-center relative my-10  ">
            <div className=" p-1 rounded-full absolute flex gap-2 justify-center items-center  ">
              <button className="prev-btn2 p-1 rounded-full hover:bg-red-600 border-2 border-red-600  hover:text-white text-red-600 text-3xl   font-bold cursor-pointer *:">
                {locale === "ar" ? (
                  <IoIosArrowRoundForward className="text-3xl font-bold" />
                ) : (
                  <IoIosArrowRoundBack />
                )}
              </button>
              <button className="next-btn2 p-1 rounded-full hover:bg-red-600  border-2  border-red-600   hover:text-white text-red-600 text-3xl cursor-pointer font-bold">
                {locale === "ar" ? (
                  <IoIosArrowRoundBack className="text-3xl font-bold" />
                ) : (
                  <IoIosArrowRoundForward />
                )}
              </button>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
