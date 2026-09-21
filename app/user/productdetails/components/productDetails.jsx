"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { getProductDetails, getItemRatings } from "../../../../utils/functions";
import Image from "next/image";
import "aos/dist/aos.css";
import { useLanguage } from "../../../../context/LanguageContext";
import ProductImages from "./ProductImages"
import ProductInfo from "./ProductInfo"
import YouMightLike from "./YouMightLike"
import Specification from "./Specification"
import ProductRating from "./ProductRating"
import ReviewForm from "./ReviewForm"
import ReviewsList from "./ReviewsList";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdOutlineLocalShipping } from "react-icons/md";

import { LuShieldCheck } from "react-icons/lu";
import { IoIosCalendar } from "react-icons/io";
import Link from "next/link";


export default function ProductDetails({ itemId }) {
  const [loading, setLoading] = useState(true);
  const [ratingRefreshKey, setRatingRefreshKey] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState(false);
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
    images: [],
    averageRating: 0,
    ratingCount: 0

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
        images: resData.images,
        available: resData.available,
          ratingCount: resData.ratingCount,
          averageRating: resData.averageRating,
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

  const fetchReviews = useCallback(async () => {
    setReviewsLoading(true);
    setReviewsError(false);
    try {
      const res = await getItemRatings(itemId);
      setReviews(res?.data.content || []);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      setReviewsError(true);
    } finally {
      setReviewsLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    productDetails();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
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
            product.category.id}> {locale == "ar" ? product.category.nameAr : product.category.nameEn} </Link> / <span className="font-semibold text-black">  {locale == "ar" ? product.nameAr : product.nameEn}</span>
        </span>
      </div>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 xs:grid-cols-1 w-full gap-1  h-full bg-white py-5 px-3 ">
        {loading && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <Image
              src="/Images/logo.png"
              alt=""
              sizes="100vw"
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
        <div className="w-full flex flex-col">
           <Specification />
         <div className="w-full  pb-5 mt-10">
            <div className="flex w-full items-center justify-between gap-2">
              <span className="w-full">
                <h1 className="flex items-center font-semibold gap-2 xs:text-base md:text-lg mb-1">
                  {t("reviews_list")}
                </h1>
                <hr className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200" />
              </span>
            </div>

            {reviewsLoading ? (
              <div className="mt-6 flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#f6f5f8] rounded-3xl h-32 animate-pulse" />
                ))}
              </div>
            ) : reviewsError ? (
              <p className="mt-6 text-sm text-gray-500">{t("reviews_error")}</p>
            ) : reviews.length === 0 ? (
              <p className="mt-6 text-sm text-gray-500">{t("no_reviews")}</p>
            ) : (
              <ReviewsList reviews={reviews} />
            )}
          </div>
        </div>
       
        <div className="w-full h-full">
          <ProductRating product={product} itemId={itemId} refreshKey={ratingRefreshKey} />
          <ReviewForm
            product={product}
            itemId={itemId}
            onRatingSubmitted={() => {
              setRatingRefreshKey((key) => key + 1);
              fetchReviews();
            }}
          />
         
        </div>

      </div>

      <YouMightLike categoryId={product.category.id} />
    </div>
  );
}
