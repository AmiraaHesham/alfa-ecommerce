"use client";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { getCategories } from "../../../utils/functions";
import { useEffect, useState } from "react";
import { useIdContext } from "../../../context/idContext";

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
      setCategoriesList(res.data);
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
    <div id="catego-sideMenu" className="w-full p-5 ">
      <div className="w-full h-full">
        <div className=" items-center ">
          <span className="flex items-center  gap-2 text-lg">
            <h1 className=" font-semibold">{t("categories")} </h1>
          </span>
        </div>
        {loading ? (
          <div className=" flex gap-2 my-2  px-3 ">
            {[...Array(7)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-12 bg-gray-100 rounded-lg animate-pulse w-full "
              ></div>
            ))}
          </div>
        ) : (
          <div className=" w-full gap-1 my-2  text-gray-500">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={7}
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="w-full flex"
            >
              <SwiperSlide className="!w-auto">
                <div
                  className={`flex gap-4 mx-3 p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500 ${
                    category === "all" ? "bg-red-100 text-red-500" : ""
                  }`}
                  onClick={() => {
                    navigate.push(
                      "/user/products/all/null"
                    );
                  }}
                >
                  <h1 className=" font-semibold text-sm ">{t("all")}</h1>
                </div>
              </SwiperSlide>

              {categoriesList.map((item, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <div
                    key={item.itemCategoryId}
                    className={`flex gap-4 mx-3 items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500 ${
                      decodeURIComponent(category) === item.nameEn ? "bg-red-100 text-red-500" : ""
                    }`}
                    onClick={() => {
                      // setSelectedCategoryId(item.itemCategoryId);
                      navigate.push(
                        "/user/products/" +
                          item.nameEn +
                          "/" +
                          item.itemCategoryId,
                      );
                    }}
                  >
                    <h1 className=" font-semibold text-sm ">
                      {locale === "ar" ? item.nameAr : item.nameEn}
                    </h1>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
              <hr className="h-3 text-red-400 w-full"></hr>

    </div>
  );
}
