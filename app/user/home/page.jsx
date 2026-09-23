"use client";

// ==============================
// Imports - React / Next.js
// ==============================
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

// ==============================
// Imports - Components
// ==============================
import BestPick from "./components/BestPick";
import ProductShowcase from "./components/ProductShowcase";
import Top10Products from "./components/Top10Products";
import SiteFeatures from "./components/SiteFeatures";
import TopDiscounted from "./components/TopDiscounted";
import ImageSlider from "./components/ImageSlider";
import CategoriesSection from "./components/CategoriesSection";
import ProductAdsSlider from "./components/ProductAdsSlider";
import FeaturedProducts from "./components/FeatuerProducts";
import Link from "next/link";

// ==============================
// Imports - Contexts / hooks
// ==============================
import { useLanguage } from "../../../context/LanguageContext";

// ==============================
// Imports - Utilities / helpers
// ==============================
import {
  getCategories,
  getFeatuerProducts,
  getProductDetails,
  getSliderImage,
  getThumbnailUrl,
} from "../../../utils/functions";
import { getRequest } from "../../../utils/requestsUtils";
import "aos/dist/aos.css";

// ==============================
// Constants
// ==============================
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL;

const AD_RANGE = { min: 1, max: 5 };

const EMPTY_ADS = {
  ad1: {
    itemId: "",
    imageUrl: "",
    title: "",
  },
  ad2: {
    itemId: "",
    imageUrl: "",
    title: "",
  },
  ad3: {
    itemId: "",
    imageUrl: "",
    title: "",
  },
  ad4: {
    itemId: "",
    imageUrl: "",
    title: "",
  },
  ad5: {
    itemId: "",
    imageUrl: "",
    title: "",
  },
};

// ==============================
// Reusable components
// ==============================
function ListSkeleton({
  className = "w-full h-full bg-white rounded-3xl p-5 space-y-5",
}) {
  return (
    <div className={className}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-[70px] h-[70px] bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="w-2/3 h-3 bg-gray-200 rounded animate-pulse" />
            <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Homepage() {
  // ==============================
  // Contexts and hooks
  // ==============================
  const { t, locale } = useLanguage();

  // ==============================
  // State
  // ==============================
  const [imagesSliders, setImagesSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [mustWatchedItems, setMustWatchedItems] = useState([]);
  const [topSoldItems, setTopSoldItems] = useState([]);
  const [topDiscountedItems, setTopDiscountedItems] = useState([]);
  const [topLast30DayItems, setTopLast30DayItems] = useState([]);
  const [items, setItems] = useState();
  const [topRatingItems, setTopRatingItems] = useState();
  const [recentWatchedProducts, setRecentWatchedProducts] = useState([]);
  const [ads, setAds] = useState(EMPTY_ADS);
  const [ad1Product, setAd1Product] = useState(null);
  const [ad3Product, setAd3Product] = useState(null);
  const [ad4Product, setAd4Product] = useState(null);
  const [ad5Product, setAd5Product] = useState(null);
  const [loading, setLoading] = useState(true);
const [productType ,setProductType] = useState("popularProducts")
  // ==============================
  // Derived values
  // ==============================
  const isLoggedIn =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  // ==============================
  // Helper functions
  // ==============================
  const buildAdsMap = (adsList = []) => {
    const adsMap = {};
    adsList.forEach((ad) => {
      if (ad.number >= AD_RANGE.min && ad.number <= AD_RANGE.max) {
        adsMap[`ad${ad.number}`] = {
          imageUrl: ad.imageUrl,
          itemId: ad.itemId,
          title: ad.title,
        };
      }
    });
    return adsMap;
  };

  const formatAdImageUrl = (imageUrl) =>
    IMAGE_BASE_URL + getThumbnailUrl(imageUrl);

  // ==============================
  // API / data fetching logic
  // ==============================
  const fetchHomepageData = useCallback(async () => {
    try {
      setLoading(true);

      const [imagesRes, productsRes, adsRes] =
        await Promise.all([
          getSliderImage(),
          // getCategories(),
          getFeatuerProducts(12),
          getRequest("/api/public/offers"),
        ]);
      setImagesSliders(imagesRes);
      setFeaturedProducts(productsRes.data.content || []);
      setAds((prev) => ({ ...prev, ...buildAdsMap(adsRes.data) }));
     

      const ad1ItemId = (adsRes.data || []).find(
        (ad) => ad.number === 1,
      )?.itemId;
      if (ad1ItemId) {
        try {
          const ad1ProductRes = await getProductDetails(ad1ItemId);
          setAd1Product(ad1ProductRes.data || null);
          console.log(ad1ProductRes)
        } catch (error) {
          console.error("Failed to fetch first ad product:", error);
        }
      } const ad3ItemId = (adsRes.data || []).find(
        (ad) => ad.number === 3,
      )?.itemId;
      if (ad3ItemId) {
        try {
          const ad3ProductRes = await getProductDetails(ad3ItemId);
          console.log(ad3ProductRes)
          setAd3Product(ad3ProductRes.data.brand || null);
        } catch (error) {
          console.error("Failed to fetch first ad product:", error);
        }
      }
      const ad4ItemId = (adsRes.data || []).find(
        (ad) => ad.number === 4,
      )?.itemId;
      if (ad4ItemId) {
        try {
          const ad4ProductRes = await getProductDetails(ad4ItemId);
          setAd4Product(ad4ProductRes.data.brand || null);
        } catch (error) {
          console.error("Failed to fetch first ad product:", error);
        }
      }
      const ad5ItemId = (adsRes.data || []).find(
        (ad) => ad.number === 5,
      )?.itemId;
      if (ad5ItemId) {
        try {
          const ad5ProductRes = await getProductDetails(ad5ItemId);
          setAd5Product(ad5ProductRes.data.brand || null);
        } catch (error) {
          console.error("Failed to fetch first ad product:", error);
        }
      }
      const categoryRes = await getRequest("/api/public/itemCategory/latest")
      setCategories(categoryRes.data || []);

      const newProductsRes = await getRequest("/api/public/items/recent");
      setNewProducts(newProductsRes.data || []);
      // console.log(newProductsRes)
      
      const topRatingProductsRes = await getRequest("/api/public/items/topRated");
      setItems(topRatingProductsRes.data.content || []); 
      setTopRatingItems(topRatingProductsRes.data.content || []);

      const mustWatchedRes = await getRequest("/api/public/items/topWatched");
      setMustWatchedItems(mustWatchedRes.data.content || []);

      const topDiscountedRes = await getRequest("/api/public/items/topDiscounted");
      setTopDiscountedItems(topDiscountedRes.data.content || []);

      const soldItemRes = await getRequest("/api/public/items/topSold")
      setTopSoldItems(soldItemRes.data.content)

    const topLast30DaysRes = await getRequest("/api/public/items/topRated/last30Days")
    console.log("topLast30DaysRes" ,topLast30DaysRes.data)
      setTopLast30DayItems(topLast30DaysRes.data.content)
      if (isLoggedIn) {
        const recentWatchedProductsRes = await getRequest("/api/users/recentWatchedItems");
        setRecentWatchedProducts(recentWatchedProductsRes.data || []);
        console.log(recentWatchedProductsRes)
      }

    } catch (error) {
      console.error("Failed to fetch homepage data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==============================
  // Event handlers
  // ==============================
  const handleShowPopularProducts = () =>{ setItems(topRatingItems) , setProductType("popularProducts")};
  const handleShowTopSoldItems = () => {setItems(topSoldItems) , setProductType("topSoldItems")};
  const handleShowMustWatchedItems = () => {setItems(mustWatchedItems) , setProductType("mustWatchedItems")};

  // ==============================
  // useEffect
  // ==============================
  useEffect(() => {
    fetchHomepageData();
  }, [fetchHomepageData]);

  // ==============================
  // Return / JSX
  // ==============================
  return (
    <div className="w-full px-3">
      {/* ========================= Hero Section (Slider + Ads + Categories + Best Pick) ========================= */}
      <div className="py-7">
        {loading ? (
          <div className="w-full md:h-[500px] md:px-10 xs:px-3 xs:h-[300px] flex justify-between items-center gap-5">
            <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="w-full h-full flex flex-col">
              <div className="flex w-full h-full justify-center items-center gap-5">
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="w-full h-[400px] grid grid-cols-2 animate-pulse bg-white p-5 gap-5 rounded-xl">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-[70px] h-[70px] bg-gray-200 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="w-2/3 h-3 bg-gray-200 rounded animate-pulse" />
                      <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex xl:flex-row xs:flex-col justify-center gap-5 items-center w-full">
            {/* Slider */}
            <ImageSlider sliderImages={imagesSliders} />

            <div className="flex flex-col  gap-3 w-full">
              <div className="w-full h-full">
                <div className="flex md:flex-row xs:flex-col gap-3 justify-center items-center h-full  w-full">
                  {/* Ads */}
                  <div className="group md:w-[600px] xs:w-full h-[350px] rounded-2xl  cursor-pointer 
                  text-[#EAEBB8] bg-gradient-to-b from-[#2F4D4C] via-[#263F40] to-[#0F1B1B] 
                  flex flex-col justify-between items-center relative overflow-hidden">
                    <div className="w-full text-center p-5">
                      <span className="text-sm">{t("Special_Offer")} </span>
                      {ad1Product && (
                        <div className="flex flex-col items-center gap-2 my-3 px-4 text-center">
                          <p className="text-2xl font-semibold">
                            {locale === "ar"
                              ? ad1Product.nameAr || ad1Product.nameEn
                              : ad1Product.nameEn || ad1Product.nameAr}
                          </p>
                          <div className="flex items-center gap-2">

                            <span className="text-sm ">
                              {ad1Product.price?.toLocaleString("en-US")}.00{" "}
                              {t("currency")} 
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-[230px] h-[260px] group-hover:scale-105 duration-500 transition-all relative">
                      <Image
                        src={formatAdImageUrl(ads.ad1.imageUrl)}
                        alt="Advertisement"
                        fill
                        sizes="(max-width: 640px) 100vw, 500px"
                        className="object-cover"
                      />
                    </div>


                  </div>

                  {/* Categories */}
                  <CategoriesSection categories={categories} />
                </div>
              </div>

              {/* Best pick of the week */}
              <div>
                <BestPick Products={topLast30DayItems} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================= Site Features ========================= */}
      <SiteFeatures />

      {/* ========================= Featured Products ========================= */}
      <div className=" flex lg:flex-row xs:flex-col my-10 gap-5 items-start w-full mt-20">
        {loading ? (
          <div className="w-[400px] h-[440px]">
            <ListSkeleton />
          </div>
        ) : (
          <div className="xs:order-2 lg:order-1 flex flex-col xs:w-full lg:w-auto items-center gap-5">
            <ProductShowcase Products={recentWatchedProducts} title={"recentViewed"} />
            <div className="w-full lg:flex-col sm:flex-row xs:flex-col flex gap-5">
              <div className="bg-white mt-2 lg:w-[280px] xs:w-full h-[660px] rounded-3xl relative overflow-hidden">
                {ads.ad2.imageUrl && (
                  <Image
                    src={IMAGE_BASE_URL + ads.ad2.imageUrl}
                    alt="Advertisement"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                )}
              </div>
              <section id="newProducts" className="w-full">
                {loading ? (
                  <div className="w-full h-full">
                    <ListSkeleton className="w-full h-[440px] bg-white rounded-3xl p-5 space-y-5" />
                  </div>
                ) : (
                  <div className="w-full h-[660px] ">
                    <ProductShowcase Products={newProducts} title={"latest_products"} />
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
        <section className="w-full xs:order-1 lg:order-2">
          <div className="w-full flex xl:flex-row xs:flex-col justify-between items-center gap-2">
            <div className="w-full">
              <h1 className="flex items-center font-semibold gap-2 text-2xl mb-1">
                {t("featured_products")}
              </h1>
              {/* <hr className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200" /> */}
            </div>
            <div className="flex items-center gap-5 xl:justify-end xs:justify-start w-full md:text-sm xl:text-base  font-semibold">
              <button
                className={` items-center justify-center rounded-full p-1  hover:text-red-600 hover:scale-105 ${productType === "popularProducts" ?"text-red-600" : "text-black"} duration-200`}
                onClick={handleShowPopularProducts}
              >
                {t("popular_products")}
              </button>
<button
                className={`items-center  justify-center rounded-full p-1  hover:text-red-600 hover:scale-105 duration-200 ${productType === "mustWatchedItems" ?"text-red-600" : "text-black"}`}
                onClick={handleShowMustWatchedItems}
              >
                {t("Most_viewed_products")}
              </button>
              <button
                className={`items-center  justify-center rounded-full p-1  hover:text-red-600 hover:scale-105 duration-200 ${productType === "topSoldItems" ?"text-red-600" : "text-black"}`}
                onClick={handleShowTopSoldItems}
              >
                {t("Top_selling")}
              </button>
              
            </div>
          </div>

          {loading ? (
            <div className="w-full h-full">
              <div className="w-full h-[370px] grid xl:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-10">
                <div className="bg-gray-200 rounded-3xl animate-pulse w-full" />
                <div className="bg-gray-200 rounded-3xl animate-pulse w-full" />
                <div className="bg-gray-200 xs:hidden md:block rounded-3xl animate-pulse w-full" />
                <div className="bg-gray-200 xs:hidden xl:block rounded-3xl animate-pulse w-full" />
              </div>
            </div>
          ) : (
            <div className="xs:mt-6 md:mt-5">
              <FeaturedProducts Products={items} type={"FeaturedProducts"} />
              <TopDiscounted Products={topDiscountedItems} />

            </div>
          )}
          <div className="flex xl:flex-row xs:flex-col mt-10 gap-5 justify-between  items-start w-full">
            <div className="md:w-[670px] xs:w-full h-[500px] bg-white rounded-3xl">
              <ProductAdsSlider />
            </div>
            {loading ? (
              <div className="w-full h-full">
                <ListSkeleton className="w-full h-[440px] bg-white rounded-3xl p-5 space-y-5" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5 w-full">
                <Top10Products Products={newProducts} section={"top_products"} />
              </div>
            )}

          </div>
        </section>
      </div>

      {/* ========================= Promo Banner ========================= */}
      <section className="my-10">
        <div className="w-full flex flex-col md:flex-row lg:justify-between items-stretch gap-5">
          <div className="group cursor-pointer w-full flex flex-col justify-center items-center h-[500px] bg-white rounded-3xl  overflow-hidden p-5">
            {ads.ad3.imageUrl ? (
              <div className="w-full h-[300px] relative group-hover:scale-105 duration-500 transition-all">

                <Image
                  src={IMAGE_BASE_URL + ads.ad3.imageUrl}
                  alt="Advertisement"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-fill"
                />
              </div>
            ) : (
              <div className="w-full h-full" />
            )}
            <div className="flex flex-col justify-around items-center w-full">
              <h1 className="text-3xl font-bold">{ad3Product} </h1>

              <h1 className=" text-center my-5">{ads.ad3.title} </h1>
              <button className="text-white rounded-full bg-[#CD4354] hover:bg-[#c13b4a] w-[120px] py-3 px-5 mt-2 text-sm font-semibold ">{t("shopNow")} </button>

            </div>

          </div>
          <div className="group cursor-pointer text-white w-full flex flex-col justify-center items-center h-[500px] bg-black rounded-3xl  overflow-hidden p-5">
            {ads.ad4.imageUrl ? (
              <div className="w-full h-[300px] relative group-hover:scale-105 duration-500 transition-all">
                <Image
                  src={IMAGE_BASE_URL + ads.ad4.imageUrl}
                  alt="Advertisement"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-fill"
                />
              </div>

            ) : (
              <div className="w-full h-full" />
            )}
            <div className="flex flex-col justify-around items-center w-full">
              <h1 className="text-3xl font-bold">{ad4Product} </h1>

              <h1 className=" text-center my-5">{ads.ad4.title} </h1>
              <button className="text-white rounded-full bg-[#CD4354] hover:bg-[#c13b4a] w-[120px] py-3 px-5 mt-2 text-sm font-semibold ">{t("shopNow")} </button>

            </div>
          </div>
          <div className="group cursor-pointer w-full flex flex-col justify-center items-center h-[500px] bg-white rounded-3xl  overflow-hidden p-5">
            {ads.ad5.imageUrl ? (
              <div className="w-full h-[300px] relative group-hover:scale-105 duration-500 transition-all">

                <Image
                  src={IMAGE_BASE_URL + ads.ad5.imageUrl}
                  alt="Advertisement"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-fill"
                />
              </div>
            ) : (
              <div className="w-full h-full" />
            )}
            <div className="flex flex-col justify-around items-center w-full">
              <h1 className="text-3xl font-bold">{ad5Product} </h1>

              <h1 className=" text-center my-5">{ads.ad5.title} </h1>
              <button className="text-white rounded-full bg-[#CD4354] hover:bg-[#c13b4a] w-[120px] py-3 px-5 mt-2 text-sm font-semibold ">{t("shopNow")} </button>

            </div>

          </div>
        </div>
      </section>

      {/* ========================= More Recommended Products ========================= */}
      <section id="newProducts" className="w-full pb-20 mt-20">
        <div className="w-full flex justify-between items-center">

          <div>
            <h1 className="flex items-center font-semibold gap-2 xs:text-base md:text-xl mb-1">
              {t("morerecommendedproducts")}
            </h1>
            {/* <hr className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200" /> */}
          </div>
          <div className="text-xs font-semibold">
            <Link href="/user/products/section/morerecommendedproducts">{t("shopMore")} </Link>
            <hr className="bg-red-500 h-[2px] border-none w-auto " />
          </div>

        </div>

        {loading ? (
          <div className="w-full h-full">
            <div className="w-full h-[300px] grid xl:grid-cols-6 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-3xl animate-pulse w-full" />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <FeaturedProducts Products={featuredProducts} type={"MoreRecommended"} />
          </div>
        )}
      </section>
    </div>
  );
}