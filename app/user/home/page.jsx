"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import {
  getCategories,
  getFeatuerProducts,
  getSliderImage,
} from "../../../utils/functions";
import { useLanguage } from "../../../context/LanguageContext";
import "aos/dist/aos.css";
import Link from "next/link";
import { FaHouseFlag } from "react-icons/fa6";

const ImageSlider = dynamic(() => import("./components/ImageSlider"), {
  ssr: false,
});
const CategoriesSection = dynamic(
  () => import("./components/CategoriesSection"),
  {
    ssr: false,
  },
);
const FeaturedProducts = dynamic(
  () => import("./components/FeatuerProducts"),
  {
    ssr: false,
  },
);

export default function Homepage() {
  const [imagesSliders, setImagesSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [imagesRes, categoriesRes, productsRes] = await Promise.all([
          getSliderImage(),
          getCategories(),
          getFeatuerProducts(),
        ]);

        setImagesSliders(imagesRes);
        setCategories(categoriesRes.data || []);
        setFeaturedProducts(productsRes.data || []);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#F9FAFB]">
      {/* Navigation Bar */}
      <div className="w-full xs:text-xs grid md:grid-cols-4 xs:grid-cols-2 text-center md:text-base  shadow-md shadow-gray-300  text-gray-600">
        <a
          href="#CategoriesSection"
          className="flex justify-start p-2 items-center border border-b-2  gap-2 w-full font-bold hover:bg-white hover:border-b-2 hover:border-b-red-600 cursor-pointer"
        >
          <span className="bg-red-600 text-white rounded-full text-lg p-1">
            <BiCategory />
          </span>
          {t("categories")}
        </a>
        <a
          href="#FeaturedProducts"
          className="flex justify-start p-2 items-center gap-2 w-full border border-b-2  font-bold hover:bg-white hover:border-b-2 hover:border-b-red-600 cursor-pointer"
        >
          <span className="bg-red-600 text-white rounded-full text-sm p-1">
            <AiFillStar />
          </span>
          {t("featured_products")}
        </a>
        <Link
          href="/user/about"
          className="flex justify-start p-2 items-center border border-b-2 gap-2 w-full font-bold hover:bg-white hover:border-b-2 hover:border-b-red-600 cursor-pointer"
        >
          <span className="bg-red-600 text-white rounded-full text-lg p-1">
            <FaHouseFlag />
          </span>
          {t("about_us")}
        </Link>
        <a
          href="#footer"
          className="flex justify-start p-2 items-center  border border-b-2 gap-2 w-full font-bold hover:bg-white hover:border-b-2 hover:border-b-red-600 cursor-pointer"
        >
          <span className="bg-red-600 text-white rounded-full text-base p-1">
            <MdContactSupport />
          </span>
          {t("contact_us")}
        </a>
      </div>

      {/* Image Slider Section */}
      <section id="ImageSlider">
        {loading ? (
          <div className="w-full h-[500px] my-10 flex justify-center items-center">
            <div className="xl:w-[80%] xs:w-full xs:mx-2 h-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <ImageSlider sliderImages={imagesSliders} />
        )}
      </section>

      {/* Categories Section */}
      <section
        id="CategoriesSection"
        className="h-[480px] justify-center items-center"
      >
        <div className="w-full flex justify-center items-center text-center px-10 text-2xl font-semibold h-12 shadow-md shadow-gray-300 bg-gray-100">
          <h1 className="flex items-center gap-2 xs:text-xl md:text-2xl text-gray-600">
            <BiCategory className="text-red-600" />
            {t("categories")}
          </h1>
        </div>
        {loading ? (
          <div className="w-full h-full">
            <div className="w-full h-[220px] grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-16">
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden md:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
            </div>
          </div>
        ) : (
          <div className="">
            <CategoriesSection categories={categories} />
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section id="FeaturedProducts" className="h-[520px] ">
        <div className="w-full flex justify-center items-center gap-2 text-center px-10 text-2xl shadow-md shadow-gray-300 font-semibold bg-gray-100 h-12">
          <span className="text-red-600 rounded-full p-1">
            <AiFillStar />
          </span>
          <h1 className="flex items-center xs:text-xl md:text-2xl  gap-2 text-gray-600">
            {t("featured_products")}
          </h1>
        </div>
        {loading ? (
          <div className="w-full h-full">
            <div className="w-full h-[260px] grid xl:grid-cols-6 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-28">
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden md:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
            </div>
          </div>
        ) : (
          <div className="xs:mt-6 md:mt-10 ">
            <FeaturedProducts FeatuerProducts={featuredProducts} />
          </div>
        )}
      </section>
    </div>
  );
}
