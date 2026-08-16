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
    <div className="flex w-full justify-center items-center  xs:mt-6 md:mt-5 ">
      <div className="w-full">
        <Swiper
          key={locale}
          modules={[Navigation]}
          slidesPerView={"auto"}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
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
              className="rounded-lg !w-[220px]"
            >
              <div
                className="h-[220px]  mt-4 border shadow-md  flex justify-center items-center text-center hover:shadow-xl hover:shadow-slate-300   hover:scale-105 duration-200 cursor-pointer rounded-md  hover:border-b-red-600 hover:border-b-[7px]"
                onClick={() => {
                  navigate.push(
                    "/user/products/category/" +
                    category.nameEn +
                    "/" +
                    category.itemCategoryId,
                  );
                }}
              >
                <div className=" w-full flex flex-col justify-center items-center   ">
                  <div className="relative rounded-xl h-[135px] w-[135px]  bg-gray-100 ">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${getThumbnailUrl(category.imageURL) || ""
                        }`}
                      alt=""
                      fill
                      quality={100}
                      sizes="100vw" 
                      className="object-fill rounded-xl"
                    />
                  </div>
                  <h1 className="font-semibold text-xs  mt-6">
                    {locale === "ar" ? category.nameAr : category.nameEn}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* <div className=" flex flex-col justify-center items-center relative my- "> */}
          <div className=" p-1 rounded-full  flex gap-2 justify-center items-center my-5 ">
            {/* <button className="prev-btn2 p-1 rounded-full hover:bg-red-600 border-2 border-red-600  hover:text-white text-red-600 text-3xl   font-bold cursor-pointer *:">
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
              </button> */}
          </div>
          {/* </div> */}
        </Swiper>
      </div>
    </div>
  );
}
