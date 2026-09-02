"use client";
import { useEffect, useState, useRef } from "react";
import { getProductDetails } from "../../../../utils/functions";
import Image from "next/image";
import "aos/dist/aos.css";
import { useLanguage } from "../../../../context/LanguageContext";
import ProductImages from "./ProductImages"
import ProductInfo from "./ProductInfo"
import YouMightLike from "./YouMightLike"
import Specification from "./Specification"
import ProductRating from "./ProductRating"
import ReviewForm from "./ReviewForm"
import CustomerReviewCard from "./CustomerReviewCard"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdOutlineLocalShipping } from "react-icons/md";

import { LuShieldCheck } from "react-icons/lu";
import { IoIosCalendar } from "react-icons/io";
import Link from "next/link";


export default function ProductDetails({ itemId }) {
  const [loading, setLoading] = useState(true);
  const { t, locale } = useLanguage();
  const [product, setProduct] = useState({
    nameEn: "",
    nameAr: "",
    price: null,
    oldPrice: null,
    descriptionAr: "",
    descriptionEn: "",
    category: {
      id: null,
      nameAr: "",
      nameEn: "",
    },
    code: "",
    mainImage: "",
    mainImagefile: "",
    available: null,
    img2: "",
    img2file: "",
    img3: "",
    img3file: "",
  });


  const productDetails = async () => {
    setLoading(true);
    try {
      const res = await getProductDetails(itemId);
      const resData = res.data;
      console.log(resData);
      setProduct((prev) => ({
        ...prev,
        nameEn: resData.nameEn,
        nameAr: resData.nameAr,
        code: resData.code,
        price: resData.price,
        oldPrice: resData.oldPrice,
        descriptionAr: resData.descriptionAr,
        descriptionEn: resData.descriptionEn,
        mainImage: resData.mainImageURL,
        img2: resData.images?.[0]?.imageUrl || "",
        img3: resData.images?.[1]?.imageUrl || "",
        available: resData.available,
        category: {
          ...prev.category,
          id: resData.itemCategory.itemCategoryId,
          nameAr: resData.itemCategory.nameAr,
          nameEn: resData.itemCategory.nameEn,
        },
      }));
      setLoading(false);
      // setImageShow(urlImage + resData.mainImageURL);
      // getProductsByCategory(resData.itemCategory.itemCategoryId);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    productDetails();
  }, []);
  return (
    <div className="">
      {/* {loading ? (
        // Skeleton rows
        [...Array(1)].map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="flex md:flex-row xs:flex-col gap-10 py-10 mx-10 "
          >
            <div className="w-full h-[600px]">
              <div className="w-full h-[500px] flex justify-center items-center  bg-gray-200 rounded animate-pulse"></div>
              <div className="flex justify-stretch items-center gap-4 mt-5 ">
                <div className="h-[100px] w-[100px] bg-gray-200 rounded animate-pulse "></div>
                <div className="h-[100px] w-[100px] bg-gray-200 rounded animate-pulse "></div>

                <div className="h-[100px] w-[100px] bg-gray-200 rounded animate-pulse "></div>
              </div>
            </div>

            <div className="flex py-5 flex-col w-full justify-between   h-[500px] items-center  bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))
      ) : ( */}
      <div className="p-5">
        <span className="text-gray-500">
          <Link href={"user/home"}>Home </Link> /<Link href={"/user/products/category/" +
            product.category.nameEn +
            "/" +
            product.category.id}> {locale == "ar" ? product.category.nameAr : product.category.nameEn} </Link> / <span className="font-semibold text-black">  {locale =="ar"? product.nameAr : product.nameEn}</span>
        </span>
      </div>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 xs:grid-cols-1 w-full gap-1  h-full bg-white py-5 px-3 ">
        {loading && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <Image
              src="/Images/logo.png"
              alt=""
              className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
              width={100}
              height={100}
            />
          </div>
        )}

        <ProductImages product={product} />
        <div className="col-span-2">
          <ProductInfo product={product} itemId={itemId} />

        </div>

        <div className=" h-[350px] xs:col-span-4 xl:col-span-1 border w-full rounded-3xl px-3 py-8" >
          <h1 className="text-xl mb-5 px-3 font-semibold">{t("shipping") + " & " + t("delivery")}</h1>
          <div className="flex justify-between items-center w-full">
            <div className="w-full">
              <span className="flex items-center gap-5 mb-2">
                <MdOutlineLocalShipping className="text-[#E14A5C] w-7 h-7" />
                <h1>{t("courier_delivery")}</h1>

              </span>

              <span className="text-sm text-gray-500">
                {t("delivery_text")}
              </span>
            </div>
            <div className="w-[80px] flex flex-col items-center text-center text-sm text-gray-500">
              <h1>2-3</h1>
              <h1>Days</h1>
            </div>

          </div>
          <hr className="my-10" />
          <div>
            <div className="flex items-center justify-between w-full mb-5">
              <div className="flex items-center gap-1">
                <LuShieldCheck className="w-5 h-5 text-[#E14A5C]" />
                <span className="text-sm ">{t("warranty_text")} </span>
              </div>
              <Link href={"/user/about#Guarantee_Policy"} target="_blank" className="text-xs text-blue-500 font-medium"> {t("details")}</Link>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <IoIosCalendar className="w-5 h-5 text-[#E14A5C]" />
                <span className="text-sm  ">{t("return_text")} </span>
              </div>
              <Link href={"/user/about#Return_Policy"} target="_blank" className="text-xs text-blue-500 font-medium ">{t("details")}</Link>
            </div>
          </div>
        </div>

      </div>
      {/* // )} */}
      <hr></hr>
      <div className="flex w-full justify-between p-10">
        <Specification />
        <div className="w-full h-full">
          <ProductRating />
          <ReviewForm product={product} />
          <CustomerReviewCard name={"amira hesham"} date={"1/9/2026"} rating={3} review={"Great product!"} />
        </div>
      </div>
      <YouMightLike categoryId={product.category.id} />
    </div>
  );
}
