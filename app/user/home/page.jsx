"use client";
import dynamic from "next/dynamic";
const ImageSlider = dynamic(() => import("../components/home/ImageSlider"), {
  ssr: false,
});
const CategoriesSection = dynamic(
  () => import("../components/home/CategoriesSection"),
  {
    ssr: false,
  },
);
const FeatuerProducts = dynamic(
  () => import("../components/home/FeatuerProducts"),
  {
    ssr: false,
  },
);
import { useEffect, useState } from "react";
import {
  getCategories,
  getFeatuerProducts,
  getSliderImage,
} from "../../../utils/functions";
import "aos/dist/aos.css";

import { useLanguage } from "../../../context/LanguageContext";
import { AiFillStar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";

export default function Homepage() {
  const [ImagesSliders, setImagesSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuerProducts, setFeatuerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const getImages = async () => {
    try {
      const res = await getSliderImage();
      setImagesSliders(res);
            setLoading(false)

    } catch (error) {
      console.error("Failed to fetch slider images:", error);
            setLoading(true)

    }
  };
  const showCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
            setLoading(false)

    } catch (error) {
      console.log(error);
            setLoading(true)

    } 
  };
  const getFeatuersProducts = async () => {
    try {
      const response = await getFeatuerProducts();

      setFeatuerProducts(response.data);
            setLoading(false)

    } catch (error) {
      console.log(error);
            setLoading(true)

    }
  };

  useEffect(() => {
  
    getImages();
    showCategories();
    getFeatuersProducts();
  }, []);

  return (
    <div className="bg-[#F9FAFB]">
      <div className="w-full h-10  flex justify-between text-center md:text-base xs:text-sm shadow-md shadow-gray-300 mb-5 text-gray-600">
        <a
          href="#CategoriesSection"
          className="flex justify-center items-center border-l border-b-2  gap-2 w-full  font-bold hover:bg-white hover:border-b-2 hover:border-b-red-600 cursor-pointer"
        >
          <span className="bg-red-700 text-white rounded-full text-lg p-1">
            <BiCategory />
          </span>
          {t("categories")}
        </a>
        <a
          href="#FeatuerProducts"
          className="flex justify-center items-center gap-2  w-full  border-b-2  font-bold hover:bg-white  hover:border-b-2 hover:border-b-red-600 cursor-pointer"
        >
          <span className="bg-red-700 text-white rounded-full text-sm p-1">
            <AiFillStar className="" />
          </span>
          {t("featured_products")}
        </a>
        <a
          href="#footer"
          className="flex justify-center items-center  border-b-2 border-r gap-2 w-full  font-bold hover:bg-white  hover:border-b-2 hover:border-b-red-600 cursor-pointer"
        >
          <span className="bg-red-700 text-white rounded-full text-lg p-1">
            <MdContactSupport />
          </span>
          {t("contact_us")}
        </a>
      </div>
      <section id="ImageSlider" >
        {loading ? (
          <div className="w-full h-[500px] my-10  flex justify-center items-center">
            <div className="xl:w-[80%] xs:w-full xs:mx-2 h-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <ImageSlider sliderImages={ImagesSliders} />
        )}
      </section>
      <section id="CategoriesSection" className="h-[500px]  justify-center items-center" >
         <div className="w-full flex justify-center items-center text-center px-10 text-2xl font-semibold h-12 shadow-md shadow-gray-300 bg-gray-100">
        <h1 className="flex items-center gap-2 text-gray-600">
          <BiCategory className="text-red-600" />
          {t("categories")}
        </h1>
      </div>
        {loading ? (
          <div className="w-full h-full">
           
            <div className="w-full h-[320px] grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-32">
              <div className="bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="bg-gray-200 xs:hidden lg:block rounded animate-pulse w-full"></div>
              <div className=" bg-gray-200 xs:hidden md:block rounded animate-pulse w-full"></div>
              <div className=" bg-gray-200  xs:hidden  xl:block  rounded animate-pulse w-full"></div>
              <div className=" bg-gray-200  xs:hidden xl:block rounded animate-pulse w-full"></div>

            </div>
          </div>
        ) : (
          <CategoriesSection categories={categories} />
        )}
      </section>
      <section id="FeatuerProducts" className="h-[700px]  mt-12" >
          <div className="w-full flex justify-center items-center gap-2 text-center px-10 text-2xl shadow-md shadow-gray-300 font-semibold bg-gray-100  h-12 ">
        <span className=" text-red-600 rounded-full  p-1">
          <AiFillStar className="" />
        </span>
        <h1 className="flex items-center gap-2 text-gray-600">
          {t("featured_products")}{" "}
        </h1>
      </div>
         {loading ? (
          <div className="w-full h-full">
          
            <div className="w-full h-[350px] grid xl:grid-cols-5 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-28">
              <div className="bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="bg-gray-200 xs:hidden md:block rounded animate-pulse w-full"></div>
              <div className=" bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full"></div>
              <div className=" bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full"></div>

            </div>
          </div>
        ) : (
        <FeatuerProducts FeatuerProducts={featuerProducts} />
        )}
      </section>
    </div>
  );
}
