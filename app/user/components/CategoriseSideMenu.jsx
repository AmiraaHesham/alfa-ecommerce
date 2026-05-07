"use client";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { getCategories } from "../../../utils/functions";
import { useEffect, useState } from "react";
import { useIdContext } from "../../../context/idContext";
import { BsList } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { GiCancel } from "react-icons/gi";
import { TiTime } from "react-icons/ti";
import { MdCancel } from "react-icons/md";

export default function CategoriesSideMenu() {
  const { t } = useLanguage();
  const { selectedCategoryId, setSelectedCategoryId } = useIdContext();
  const { locale } = useLanguage();
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState([]);
  const categories = async () => {
    try {
      setLoading(true);

      const res = await getCategories();
      setCategoriesList(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    categories();
  }, []);

  return (
    <div
      id="catego-sideMenu"
      className="md:w-[300px] xs:w-[200px] xs:hidden md:block xs:absolute md:relative h-screen bg-[#ffffff]"
    >
      <div className="  w-full h-full   ">
        <div className="flex justify-between p-3 items-center">
          <span className="flex items-center  gap-2 text-lg">
            <BsList />
            <h1 className=" font-semibold">{t("categories")} </h1>
          </span>
          <span
            className="xs:block md:hidden w-5 h-5 cursor-pointer text-red-600  "
            onClick={() => {
              const catego_sideMenu =
                document.querySelector("#catego-sideMenu");
              catego_sideMenu.classList.add("xs:hidden");
            }}
          >
            <MdCancel className="w-full h-full" />
          </span>
        </div>
        <hr className="h-3  mt-2 text-red-400 w-full"></hr>
        {loading ? (
          <div className=" flex flex-col gap-2  px-3 ">
            {[...Array(7)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-12 bg-gray-100 rounded-lg animate-pulse w-full "
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-gray-500">
             <div
                  className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500 ${
                    selectedCategoryId === null
                      ? "bg-red-100 text-red-500"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCategoryId(null);
                  }}
                >
                  <h1 className=" font-semibold text-sm ">
                    {t("all")}
                  </h1>
                </div>
            {categoriesList.map((category) => {
              return (
                <div
                  key={category.itemCategoryId}
                  className={`flex gap-4 mx-3 xs:justify-center md:justify-start  items-center p-3 rounded-md cursor-pointer hover:bg-red-100 hover:text-red-500 ${
                    selectedCategoryId === category.itemCategoryId
                      ? "bg-red-100 text-red-500"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCategoryId(category.itemCategoryId);
                  }}
                >
                  <h1 className=" font-semibold text-sm ">
                    {locale === "ar" ? category.nameAr : category.nameEn}
                  </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
