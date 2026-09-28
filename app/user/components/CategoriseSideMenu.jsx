"use client";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { getCategories, getThumbnailUrl } from "../../../utils/functions";
import { useEffect, useState } from "react";
import { useIdContext } from "../../../context/idContext";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/navigation";
export default function CategoriesSideMenu({ category }) {
  const { t } = useLanguage();
  // const { selectedCategoryId, setSelectedCategoryId } = useIdContext();
  const { locale } = useLanguage();
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useRouter();

  const categories = async () => {
    try {
      setLoading(true);

      const res = await getCategories();
      setCategoriesList(res.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    categories();
  }, []);

  return (
    <div
      id="catego-sideMenu"
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="w-full bg-[#f6f6f7] px-4 py-5 sm:px-6"
    >
      <div className="w-full">
        <div className="flex items-center">
          <span className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-800">
              {t("categories")}
            </h1>
          </span>
        </div>

        {loading ? (
          <div className="my-4 flex w-full items-start justify-between gap-6 overflow-hidden sm:justify-start">
            {[...Array(6)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="flex  shrink-0 flex-col items-center gap-3 "
              >
                <div className="h-[100px] w-[100px] animate-pulse rounded-full bg-gray-200/70 "></div>
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-200/70"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-4 w-full">
            <Swiper
              slidesPerView="auto"
              spaceBetween={5}
              breakpoints={{
                640: { spaceBetween: 16 },
                1024: { spaceBetween: 24 },
              }}
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="w-full "
            >
              <SwiperSlide className="!h-auto !w-auto my-3 px-2">
                <div
                  className="group flex  cursor-pointer flex-col items-center gap-3 text-center "
                  onClick={() => {
                    navigate.push("/user/products/category/all/null");
                  }}
                >
                  <span
                    className={`flex h-[100px] w-[100px] items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-md lg:h-[100px] lg:w-[100px] ${
                      category === "all"
                        ? "bg-white ring-2 ring-red-500"
                        : "bg-gray-100/80"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                  </span>
                  <h1
                    className={`line-clamp-2 text-base font-medium leading-tight ${
                      category === "all" ? "text-red-500" : "text-gray-800"
                    }`}
                  >
                    {t("all")}
                  </h1>
                </div>
              </SwiperSlide>

              {categoriesList.map((item, index) => {
                const isActive =
                  decodeURIComponent(category) === item.nameEn;
                return (
                  <SwiperSlide key={index} className="!h-auto !w-auto my-3">
                    <div
                      key={item.itemCategoryId}
                      className="group flex w-[124px] cursor-pointer flex-col items-center gap-3 text-center sm:w-[152px]"
                      onClick={() => {
                        // setSelectedCategoryId(item.itemCategoryId);
                        navigate.push(
                          "/user/products/category/" +
                            item.nameEn +
                            "/" +
                            item.itemCategoryId,
                        );
                      }}
                    >
                      <span
                        className={` rounded-full p-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md lg:h-[100px] lg:w-[100px] lg:p-4 ${
                          isActive
                            ? "bg-white ring-2 ring-red-500"
                            : "bg-white"
                        }`}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${
                            getThumbnailUrl(item.imageURL) || ""
                          }`}
                          alt={locale === "ar" ? item.nameAr : item.nameEn}
                          width={100}
                          height={100}
                          quality={100}
                          
                          className=" rounded-full"
                        />
                      </span>
                      <h1
                        className={`line-clamp-2 w-full text-sm font-medium leading-tight ${
                          isActive ? "text-red-500" : "text-gray-800"
                        }`}
                      >
                        {locale === "ar" ? item.nameAr : item.nameEn}
                      </h1>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
