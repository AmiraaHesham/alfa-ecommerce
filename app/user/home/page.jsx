"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  getCategories,
  getFeatuerProducts,
  getSliderImage,
} from "../../../utils/functions";
import { useLanguage } from "../../../context/LanguageContext";
import "aos/dist/aos.css";
import { getRequest } from "../../../utils/requestsUtils";
import { useRouter } from "next/navigation";
import BestPick from "./components/BestPick"
import RecentlyViewed from "./components/RecentlyViewed"
import Top10Products from "./components/Top10Products"
import SiteFeatures from "./components/SiteFeatures"
import TopDiscounted from "./components/TopDiscounted"
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
  const [mustWatchedItem, setMustWatchedItem] = useState([]);
  const [topSoldItems, setTopSoldItems] = useState([]);
  const [topDiscountedItems, setTopDiscountedItems] = useState([]);
  const [items, setItems] = useState();
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
        setItems(productsRes.data || [])
        const newProductsRes = await getRequest("/api/public/items/recent");
        setNewProducts(newProductsRes.data || []);

        const mustWatchedRes = await getRequest("/api/public/items/mustWatched");
        setMustWatchedItem(mustWatchedRes.data || []);

        const topSoldRes = await getRequest("/api/public/items/topSold");
        setTopSoldItems(topSoldRes.data || []);

        const topDiscountedRes = await getRequest("/api/public/items/topDiscounted");
        setTopDiscountedItems(topDiscountedRes.data || []);
        if (isLoggedIn) {
          const recentWatchedProductsRes = await getRequest(
            "/api/users/recentWatchedItems",
          );
          setrecentWatchedProducts(recentWatchedProductsRes.data || []);
          // console.log(recentWatchedProductsRes.data)
        }

      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" w-full px-5">

      <div className="py-10">
        {loading ? (
          <div className="w-full md:h-[500px] md:px-10 xs:px-3  xs:h-[300px]  flex justify-between items-center gap-5">
            <div className="w-full  h-full bg-gray-200 rounded-2xl animate-pulse"></div>
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
          <div className="flex xl:flex-row xs:flex-col justify-between  gap-5 items-center w-full">
            <ImageSlider sliderImages={imagesSliders} />
            <div className="flex flex-col gap-5 w-full">
              <div className="w-full"
              >
                <div className="">
                  <CategoriesSection categories={categories} />
                </div>

              </div>
              <div>
                <BestPick Products={newProducts} />
              </div>
            </div>
          </div>
        )}
      </div>

      <SiteFeatures />

      {/* Featured Products Section */}
      <div className="flex lg:flex-row xs:flex-col my-20 gap-5 items-start w-full">
        {loading ? (
          <div className="w-[400px] h-[440px]">
            <div className="w-full h-full bg-white rounded-3xl p-5 space-y-5">
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
        ) : (
          <div className="flex flex-col xs:w-full lg:w-auto items-center gap-5">
            <RecentlyViewed Products={recentWatchedProducts} />
<div className="bg-white w-[300px] h-[500px] rounded-3xl"></div>
          </div>
        )}
        <section className="w-full" >
          <div className="w-full flex md:flex-row xs:flex-col justify-between  items-start gap-2">
            <div className="w-2/3">
              <h1 className="flex items-center font-semibold gap-2 xs:text-base md:text-lg mb-1">
                {t("featured_products")}
              </h1>
              <hr className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200" />
            </div>
            <div className="flex items-center w-full  md:text-base xs:text-[13px] font-medium ">
              <button className="flex w-full items-center justify-center rounded-full p-1 font-medium  hover:text-red-600 hover:scale-105 duration-200"
                onClick={() => {
                  // navigate.push(`/user/products/section/${"featured"}`);
                  setItems(featuredProducts)
                }}
              >
                {t("popular_products")}
              </button>

              <button className=" flex items-center  w-full justify-center  rounded-full p-1 font-medium  hover:text-red-600 hover:scale-105 duration-200"
                onClick={() => {
                  // navigate.push(`/user/products/section/${"featured"}`);
                  setItems(topSoldItems)
                }}
              >
                 {t("Top_selling")}
              </button>
              <button className=" flex items-center  w-full justify-center rounded-full p-1 font-medium hover:text-red-600 hover:scale-105 duration-200"
                onClick={() => {
                  setItems(mustWatchedItem)
                }}
              >
                {t("Most_viewed_products")}
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

            <div className="xs:mt-6 md:mt-5 ">
              <FeaturedProducts Products={items} type={"FeaturedProducts"} />
            </div>
          )}
        </section>
      </div>
      <TopDiscounted Products={topDiscountedItems} />
      <div className="flex lg:flex-row xs:flex-col   my-20 gap-10 items-start w-full">
        {loading ? (
          <div className="w-full h-full">
            <div className="w-full h-[440px] bg-white rounded-3xl p-5 space-y-5">
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
        ) : (

          <div className="flex flex-col items-center gap-5 w-full">
            <Top10Products Products={newProducts} section={"latest_products"} />

          </div>
        )}
        <section id="newProducts" className="w-full">
          <div className=" flex justify-between px-5 items-center gap-2 text-center">
            <div className=" ">
              {/* <button className="bg-gradient-to-l from-red-100 via-red-300 to-red-100  md:text-xs xs:text-[11px] flex items-center justify-center gap-1 rounded-full p-1 font-semibold hover:shadow-md hover:scale-105 duration-200"
            onClick={() => {
                navigate.push(`/user/products/section/${"newProducts"}`);

              }}>
              {t("view_all_products")}
              <BiPlus className="text-red-900 text-lg" />
            </button> */}
            </div>
          </div>

          {loading ? (
            <div className="w-full h-full">
              <div className="w-full h-[440px] bg-white rounded-3xl p-5 space-y-5">
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
          ) : (

            <div className=" w-auto">
              <Top10Products Products={newProducts} section={"top_100_products"} />
            </div>
          )}

        </section>
      </div>
<section className="my-20">
  <div className="w-full h-[500px] flex justify-between items-center gap-5">
    <div className="w-full h-full bg-white rounded-3xl"></div>
    <div className="w-full h-full bg-black rounded-3xl"></div>
    <div className="w-full h-full bg-white rounded-3xl"></div>
  </div>
</section>
      <section id="newProducts" className="w-full pb-20">
        <div>
          <h1 className="flex items-center font-semibold gap-2 xs:text-base md:text-lg mb-1">
            {t("More_recommended_products")}
          </h1>
          <hr className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200" />
        </div>



        {loading ? (
          <div className="w-full h-full">
            <div className="w-full h-[300px] grid xl:grid-cols-6 md:grid-cols-3 xs:grid-cols-2 gap-5 mt-10">

              {Array.from({ length: 6 }).map((_, i) => (

                <div key={i} className="bg-gray-200 rounded-3xl animate-pulse w-full" />

              ))}    </div>
          </div>
        ) : (

          <div className="mt-5">
            <FeaturedProducts Products={newProducts} type={"MoreRecommended"} />
          </div>
        )}

      </section>
    </div>
  );
}
