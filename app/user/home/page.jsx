"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiArrowBack, BiCategory, BiPlus } from "react-icons/bi";
import { MdConnectWithoutContact, MdContactSupport } from "react-icons/md";
import {
  getCategories,
  getFeatuerProducts,
  getSliderImage,
} from "../../../utils/functions";
import { useLanguage } from "../../../context/LanguageContext";
import "aos/dist/aos.css";
import Link from "next/link";
import { FaHouseFlag, FaStar } from "react-icons/fa6";
import { FaShippingFast, FaUsers } from "react-icons/fa";
import { BsArrow90DegLeft } from "react-icons/bs";
import { PiPlus } from "react-icons/pi";
import { IoPricetagsOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuShieldCheck } from "react-icons/lu";
import { RiLoopRightFill } from "react-icons/ri";
import { LiaCertificateSolid } from "react-icons/lia";
import { HiOutlineSparkles } from "react-icons/hi";
import Image from "next/image";
import { getRequest } from "../../../utils/requestsUtils";
import { useRouter } from "next/navigation";

const ImageSlider = dynamic(() => import("./components/ImageSlider"), {
  ssr: false,
});
const CategoriesSection = dynamic(
  () => import("./components/CategoriesSection"),
  {
    ssr: false,
  },
);
const FeaturedProducts = dynamic(() => import("./components/FeatuerProducts"), {
  ssr: false,
});

export default function Homepage() {
  const [imagesSliders, setImagesSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [recentWatchedProducts, setrecentWatchedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const navigate = useRouter();
  const isLoggedIn =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

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

        const recentWatchedProductsRes = await getRequest("/api/users/recentWatchedItems");
        setrecentWatchedProducts(recentWatchedProductsRes.data || []);

         const newProductsRes = await getRequest("/api/public/items/recent");
        setNewProducts(newProductsRes.data || []);

      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#F9FAFB] w-full">
      {/* Navigation Bar */}
      <div className="w-full  ">
        <div className="w-full  flex justify-between items-center h-10 text-xs">
          <a
            href="#CategoriesSection"
            className="flex justify-center items-center  hover:bg-red-200 w-full   rounded-md   gap-2  font-bold   cursor-pointer"
          >
            <span className=" text-red-500 md:text-xl xs:text-lg p-1">
              <BiCategory />
            </span>
            {t("categories")}
          </a>
          <hr
            className="w-[10px] h-5 border-0 rounded-full bg-gray-300"
          />
          <a
            href="#FeaturedProducts"
            className="flex justify-center items-center  hover:bg-red-200 w-full   rounded-md   gap-2  font-bold   cursor-pointer"
          >
            <span className="text-red-500 rounded-full md:text-lg xs:text-base p-1">
              <FaStar />
            </span>
            {t("featured_products")}
          </a>


          <hr
            className="w-[10px] h-5 border-0 rounded-full bg-gray-300"
          />
          <a
            href="#newProducts"
            className="flex justify-center items-center  hover:bg-red-200  w-full  rounded-md   gap-2  font-bold   cursor-pointer"
          >
            <span className="  text-red-500 rounded-full  md:text-xl xs:text-lg p-1">
              <HiOutlineSparkles />
            </span>
            {t("New_arrivals")}
          </a>

          <hr
            className="w-[10px] h-5 border-0 rounded-full bg-gray-300"
          />
          <Link
            href="/user/about"
            className="flex justify-center items-center  hover:bg-red-200  w-full  rounded-md   gap-2  font-bold   cursor-pointer"
          >
            <span className=" text-red-500  md:text-xl xs:text-lg p-1">
              <FaUsers />
            </span>
            {t("about_us")}
          </Link>
          <hr
            className="w-[10px] h-5 border-0 rounded-full bg-gray-300"
          />
          <a
            href="#footer"
            className="flex justify-center items-center  hover:bg-red-200  w-full  rounded-md   gap-2  font-bold   cursor-pointer"
          >
            <span className="  text-red-500 rounded-full  md:text-xl xs:text-lg p-1">
              <MdConnectWithoutContact />
            </span>
            {t("contact_us")}
          </a>
        </div>
      </div>

      {/* Image Slider Section */}
      <section id="ImageSlider" className="mb-10">
        {loading ? (
          <div className="w-full md:h-[500px] md:px-10 xs:px-3  xs:h-[300px]  flex justify-center items-center">
            <div className="w-full  h-full bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        ) : (

          <ImageSlider sliderImages={imagesSliders} />
        )}
      </section>
      {/* <div className="w-full h-full flex justify-center items-center my-10 px-20 gap-6">


        <div className="w-full h-[400px] rounded-3xl relative shadow-2xl">
          <Image src="/Images/banner2.png"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-fill rounded-3xl" />
          <div className="absolute text-center flex flex-col justify-center items-center w-full h-full">

            <h1 className="font-sans   text-white font-bold text-6xl ">
              تخفيضات
            </h1>
            <h1 className="   text-white font-semibold text-3xl ">
             %تصل الى 50
            </h1>
          </div>
        </div> */}
      {/* <div className="flex flex-col justify-center items-center">
          <div className="w-[500px] h-[200px] relative ">
            <Image src="/Images/banner.png"
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-fill" />
          </div>
          <div className="w-[490px] h-[200px] relative rounded-lg">
            <Image src="/Images/banner3.png"
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-fill rounded-3xl" />
          </div>
        </div> */}
      {/* <div className="w-full h-[400px] rounded-3xl relative shadow-2xl">
          <Image src="/Images/banner4.png"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-fill rounded-3xl" />
            <div className="absolute text-center flex flex-col justify-center items-center w-full my-10 h-full">

            <h1 className="text-black font-bold text-7xl ">
              منتجات 
            </h1>
            <h1 className="text-black font-serif text-2xl mt-5">
            اقل من 200 جنيه 
                </h1>
               <button className="border font-mono font-bold   p-2 w-[150px] border-black mt-14">
            إشتري الأن
          </button>
          </div>
       
        </div>
<div className="w-full h-[400px] rounded-3xl relative shadow-2xl">
          <Image src="/Images/banner.png"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-fill rounded-3xl" />
        </div>
        <div className="w-full h-[400px] rounded-3xl  relative shadow-2xl">
          <Image src="/Images/banner3.png"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-fill rounded-3xl" />
        </div>
      </div> */}
{!loading && (!isLoggedIn || recentWatchedProducts.length === 0) ? null : (
<section id="FeaturedProducts" className="h-[420px] ">
        <div className="w-full  flex justify-between px-5 items-center gap-2 text-center">
          <div>
            <h1 className="flex items-center font-semibold gap-2 xs:text-base md:text-lg mb-1">
              {t("recentWatched")}
            </h1>
            <hr className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200" />
          </div>
          <div className=" ">
           <button className="bg-gradient-to-l from-red-100 via-red-300 to-red-100  md:text-xs xs:text-[11px] flex items-center justify-center gap-1 rounded-full p-1 font-semibold hover:shadow-md hover:scale-105 duration-200"
              onClick={() => {
                navigate.push(`/user/products/section/${"recentWatched"}`);

              }}
            >
              {t("view_all_products")}
              <BiPlus className="text-red-900 text-lg" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="w-full h-full">
            <div className="w-full h-[260px] grid xl:grid-cols-6 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-10   ">
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden md:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
            </div>
          </div>
        ) : (

          <div className="xs:mt-6 md:mt-5 ">
            <FeaturedProducts Products={recentWatchedProducts} type="" />
          </div>
        )}
      </section>
      )}
      {/* Categories Section */}
      <section
        id="CategoriesSection"
        className="h-[350px] justify-center items-center"
      >
        <div className="w-full px-5  flex justify-between items-center gap-2 text-center">
          <div>
            <h1 className="flex items-center font-semibold gap-2 xs:text-base md:text-lg mb-1">
              {t("shop_by_category")}
            </h1>
            <hr
              className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200"
            />
          </div>
          {/* <div className=" ">
            <button className="bg-gradient-to-l from-red-100 via-red-300 to-red-100  md:text-xs xs:text-[11px] flex items-center justify-center gap-1 rounded-full p-1 font-semibold hover:shadow-md hover:scale-105 duration-200">
              {t("view_all_category")}
              <BiPlus className="text-red-900 text-lg" />
            </button>
          </div> */}
        </div>

        {loading ? (
          <div className="w-full h-full">
            <div className=" w-full h-[300px] grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-2 mt-10">
              <div className="bg-gray-200 rounded-full h-[135px] w-[135px]  animate-pulse" />
              <div className="bg-gray-200 rounded-full h-[135px] w-[135px]  animate-pulse " />
              <div className="bg-gray-200 xs:hidden md:block rounded-full animate-pulse h-[135px] w-[135px] " />
              <div className="bg-gray-200 xs:hidden xl:block rounded-full animate-pulse h-[135px] w-[135px] " />
              <div className="bg-gray-200 xs:hidden xl:block rounded-full animate-pulse h-[135px] w-[135px] " />
              <div className="bg-gray-200 xs:hidden xl:block rounded-full animate-pulse h-[135px] w-[135px] " />
            </div>
          </div>
        ) : (

          <div className="">
            <CategoriesSection categories={categories} />
          </div>
        )}
      </section>
      <div>
        <div>
        </div>
      </div>
      {/* Featured Products Section */}
      <section id="FeaturedProducts" className="h-[420px] ">
        <div className="w-full  flex justify-between px-5 items-center gap-2 text-center">
          <div>
            <h1 className="flex items-center font-semibold gap-2 xs:text-base md:text-lg mb-1">
              {t("featured_products")}
            </h1>
            <hr className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200" />
          </div>
          <div className=" ">
            <button className="bg-gradient-to-l from-red-100 via-red-300 to-red-100  md:text-xs xs:text-[11px] flex items-center justify-center gap-1 rounded-full p-1 font-semibold hover:shadow-md hover:scale-105 duration-200"
              onClick={() => {
                navigate.push(`/user/products/section/${"featured"}`);

              }}
            >
              {t("view_all_products")}
              <BiPlus className="text-red-900 text-lg" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="w-full h-full">
            <div className="w-full h-[260px] grid xl:grid-cols-6 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-10">
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden md:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
            </div>
          </div>
        ) : (

          <div className="xs:mt-6 md:mt-5 ">
            <FeaturedProducts Products={featuredProducts} type={"FeaturedProducts"} />
          </div>
        )}
      </section>
      <section id="newProducts" className="h-[420px] ">
        <div className="w-full  flex justify-between px-5 items-center gap-2 text-center">
          <div>
            <h1 className="flex items-center font-semibold gap-2 xs:text-base md:text-lg mb-1">
              {t("New_arrivals")}
            </h1>
            <hr className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200" />
          </div>
          <div className=" ">
            <button className="bg-gradient-to-l from-red-100 via-red-300 to-red-100  md:text-xs xs:text-[11px] flex items-center justify-center gap-1 rounded-full p-1 font-semibold hover:shadow-md hover:scale-105 duration-200"
            onClick={() => {
                navigate.push(`/user/products/section/${"newProducts"}`);

              }}>
              {t("view_all_products")}
              <BiPlus className="text-red-900 text-lg" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="w-full h-full">
            <div className="w-full h-[260px] grid xl:grid-cols-6 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-10">
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden md:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
              <div className="bg-gray-200 xs:hidden xl:block rounded animate-pulse w-full" />
            </div>
          </div>
        ) : (

          <div className="xs:mt-6 md:mt-5 ">
            <FeaturedProducts Products={newProducts}  type ={"newProduct"}/>
          </div>
        )}
      </section>
      
      <div className="w-full h-28 mb-10">
        <div className="w-full h-full md:text-sm xs:text-[10px] flex bg-white justify-between items-center shadow-md rounded-lg  py-3 mt-5 gap-5">
          <span className="h-full p-2  flex flex-col w-full gap-2 items-center">
            <LiaCertificateSolid className="w-10 h-10 bg-red-100 text-red-600 rounded-3xl p-1 " />
            <h1 className=" text-center font-semibold">{t("High_Quality")}</h1>
          </span>
          <hr
            className="w-5 h-10 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200"
          />
          <span className="h-full p-2 bg-white flex flex-col w-full gap-2 items-center">
            <FaShippingFast className="w-10 h-10 bg-red-100 text-red-600 rounded-3xl p-1 " />
            <h1 className="text-center font-semibold">{t("Fast_Delivery")}</h1>
          </span>
          <hr
            className="w-5 h-10 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200"
          />
          <span className="h-full p-2 bg-white flex flex-col w-full gap-2 items-center">
            <RiLoopRightFill className="w-10 h-10 bg-red-100 text-red-600 rounded-3xl p-1 " />
            <h1 className=" text-center font-semibold">{t("Easy_Returns")}</h1>
          </span>
          <hr
            className="w-5 h-10 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200"
          />
          <span className="h-full p-2 bg-white flex flex-col w-full gap-2 items-center">
            <IoPricetagsOutline className="w-10 h-10 bg-red-100 text-red-600 rounded-3xl p-1 " />
            <h1 className=" text-center font-semibold">{t("Best_Prices")}</h1>

          </span>
          <hr
            className="w-5 h-10 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200"
          />
          <span className="h-full p-2 bg-white flex flex-col w-full gap-2 items-center">
            <LuShieldCheck className="w-10 h-10 bg-red-100 text-red-600 rounded-3xl p-1 " />
            <h1 className=" text-center font-semibold">{t("Original_Products")}</h1>
          </span>
        </div>
      </div>
    </div>
  );
}
