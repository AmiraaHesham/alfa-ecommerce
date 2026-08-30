"use client";
import { useEffect, useState, useRef } from "react";
import { useIdContext } from "../../../../context/idContext";
import { getProductDetails, getThumbnailUrl } from "../../../../utils/functions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { postRequest } from "../../../../utils/requestsUtils";
import "aos/dist/aos.css";
import { useLanguage } from "../../../../context/LanguageContext";
import { useSearshInputContext } from "../../../../context/searshInputContext";
import { useRefresh } from "../../../../context/refreshContext";
import StarRating from "../../components/StarRating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "../../components/ProductCard";
import { IoShareSocial } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
export default function ProductDetails({ itemId }) {
  const [count, setCount] = useState(1);
  const { setSelectedCategoryId } = useIdContext();
  const navigate = useRouter();
  const [loading, setLoading] = useState(true);
  const [imageShow, setImageShow] = useState("");
  const urlImage = process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL;
  const { t } = useLanguage();
  const { setSelectedSearchInput } = useSearshInputContext();
  const { locale } = useLanguage();
  const { triggerRefresh } = useRefresh();
  const swiperRef = useRef(null);
  const [products, setProducts] = useState([]);
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

  const addFavoriteItems = async () => {
    if (userId) {
      await postRequest(
        `/api/users/${userId}/favoriteItems/${itemId}`,
        "",
        "",
      );
    } else {
      const product = {
        id: productId,
      };

      let favoriteItems = JSON.parse(
        localStorage.getItem("favoriteItems") || "[]",
      );

      const existingItem = favoriteItems.find((item) => item.id === productId);

      if (existingItem) {
      } else {
        favoriteItems.push(product);
        toast.success("تم اضافة المنتج بنجاح");
      }

      localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
    }
  };
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
      getProductsByCategory(resData.itemCategory.itemCategoryId);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };
  const handleShare = async () => {
    const productUrl = window.location.href

    if (navigator.share) {
      await navigator.share({
        title: product.nameEn,
        url: productUrl,
      });
    } else {
      await navigator.clipboard.writeText(productUrl);
      toast.success("Link copied!");
    }
  };
  const getProductsByCategory = async (categoryId) => {
    try {
      const response = await postRequest(
        "/api/public/items/search",
        {
          page: 0,
          size: 20,
          categoryId: categoryId,
        },
        "",
      );
      setProducts(response.data);
      console.log(categoryId);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userId = typeof window !== "undefined" ? localStorage.id : "";

  const addToCart = async (buyNow) => {
    try {
      if (userId) {
        if (product.available) {
          await postRequest(
            `/api/shopCarts/addLine`,
            {
              itemId: itemId,
              quantity: count,
            },
            "",
          );
        }
        triggerRefresh();
        if (buyNow) {
          navigate.push("/user/cart")
        }



      } else {
        const product = {
          id: itemId,
          quantity: count,
        };

        let cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingItem = cart.find((item) => item.id === itemId);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push(product);
        }
        triggerRefresh();
        localStorage.setItem("cart", JSON.stringify(cart));

      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productDetails();
  }, []);
  return (
    <div className=" ">
      {loading ? (
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

            <div className="flex py-5 flex-col w-full justify-between h-[500px] items-center  bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))
      ) : (
        <div className="flex lg:flex-row xs:flex-col w-full justify-center bg-white  gap-10 md:p-10 xs:p-2 ">
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
          <div className="lg:w-1/2 xs:w-full h-[500px] relative">
            {product.oldPrice ? (
              <span className="absolute z-10  font-semibold m-3 text-sm py-1  w-[60px] text-center bg-[#8CBC67]  text-white rounded-full">
                -
                {(
                  ((product.oldPrice - product.price) / product.oldPrice) *
                  100
                ).toFixed(0)}
                %
              </span>
            ) : (
              ""
            )}
            <Swiper
              key={locale}
              slidesPerView={1}
              navigation={true}
              pagination={true}
              modules={[Navigation, Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              dir={locale === "ar" ? "rtl" : "ltr"}
              spaceBetween={10}
              className="w-full h-full  select-none "
            >

              {/* <div className="w-full h-full relative  flex justify-center  rounded-3xl    "> */}

                <SwiperSlide>
                  <Image
                    src={urlImage + product.mainImage}
                    alt="mainImage"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className=" rounded-3xl"
                  />
                </SwiperSlide>
                {product.img3 ? (
                  <SwiperSlide>
                    <Image
                      src={urlImage + product.img3}
                      alt="mainImage"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className=" rounded-3xl"
                    />
                  </SwiperSlide>) : ""}
                {product.img2 ? (
                  <SwiperSlide>
                    <Image
                      src={ urlImage + product.img2}
                      alt="mainImage"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className=" rounded-3xl"
                    />
                  </SwiperSlide>) : ""}
              {/* </div> */}


            </Swiper>
            <div className="flex flex-col items-center gap-4 mt-5 absolute bottom-0 z-10">
              {product.img2 ? (
                <div className="relative w-[50px] h-[50px]  rounded-full   cursor-pointer  select-none shadow-md">
                  <Image
                    src={urlImage + getThumbnailUrl(product.img2)}
                    alt="mainImage"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-fill  rounded-full"
                    onClick={() => {
                       swiperRef.current?.slideTo(1)
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              {product.img3 ? (
                <div className="relative  w-[50px] h-[50px]  rounded-full cursor-pointer select-none shadow-md">
                  <Image
                    src={urlImage + getThumbnailUrl(product.img3)}
                    alt="mainImage"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-fill  rounded-full"
                    onClick={() => {
                     swiperRef.current?.slideTo(2);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="relative  w-[50px] h-[50px]  rounded-full  cursor-pointer select-none shadow-md">
                <Image
                  src={urlImage + getThumbnailUrl(product.mainImage)}
                  alt="mainImage"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-fill rounded-full"
                  onClick={() => {
                   swiperRef.current?.slideTo(0)
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex py-5 flex-col w-full h-auto  justify-between gap-5 bg-white  px-5  rounded-3xl">
            <div>
              <div className="flex justify-between items-start">
                <span>
                  <h1 className="md:text-3xl xs:text-base font-semibold">
                    {locale === "ar" ? product.nameAr : product.nameEn}
                  </h1>
                  <h1 className=" text-gray-500 mt-2  md:text-sm xs:text-xs">
                    {t("code")}: {product.code}
                  </h1>
                </span>
                <span
                  className="text-red-600 cursor-pointer md:text-base xs:text-xs hover:shadow-sm hover:shadow-red-700 px-4 rounded-md  "
                  onClick={() => {
                    setSelectedCategoryId(product.category.id);
                    setSelectedSearchInput("");
                    navigate.push("/user/search");
                  }}
                >
                  {locale === "ar"
                    ? product.category.nameAr
                    : product.category.nameEn}
                </span>
              </div>

            </div>
            {product.available ? (
              <div className="flex flex-col  gap-3">

                <div className="flex items-center gap-2">
                  <span className="text-gray-400 md:text-3xl xs:text-base line-through">
                    {product.oldPrice
                      ? product.oldPrice.toLocaleString("en-US") +
                      " " +
                      t("currency")
                      : ""}
                  </span>
                  <span className="md:text-4xl xs:text-3xl  font-semibold text-[#E14A5C] ">
                    {product.price
                      ? product.price.toLocaleString("en-US") +
                      " " +
                      t("currency")
                      : ""}
                  </span>

                </div>
              </div>
            ) : (
              ""
            )}
            <StarRating rating={10} maxRating={10} />

            <span className="text-gray-400">
              {locale === "ar" ? product.descriptionAr : product.descriptionEn}
            </span>

            <span className="text-red-600">
              {product.available ? "" : t("Currently_unavailable")}
            </span>

            <div className="flex w-full  items-center gap-4 h-12 ">
              <button
                className={`w-[70%] h-full rounded-full text-white  flex  justify-center items-center gap-3  ${product.available
                  ? "bg-[#E14A5C] hover:bg-[#CD4354] hover:scale-105 duration-200"
                  : "cursor-not-allowed bg-gray-400 hover:bg-gray-400 hover:scale-100"
                  }`}
                disabled={!product.available}
                onClick={() => addToCart(false)}
              >
                {t("addToCart")}
              </button>
              <button
                className={`w-[70%] h-full rounded-full text-[#E14A5C]  flex  justify-center items-center gap-3  ${product.available
                  ? "bg-[#F9DBDF] hover:bg-[#EDD0D3]  hover:scale-105 duration-200"
                  : "cursor-not-allowed bg-gray-400 hover:bg-gray-400 hover:scale-100"
                  }`}
                disabled={!product.available}
                onClick={() => addToCart(true)}
              >
                {t("buyNow")}
              </button>
              <div className="flex items-center text-center justify-center gap-3 w-[20%] rounded-full px-4 h-full border text-gray-600 bg-white">
                {/* زر النقصان */}
                <button
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  className="text-xl font-bold text-gray-600  hover:text-red-600"
                >
                  +
                </button>
                <hr className="h-full w-px border-0 bg-gray-100" />
                {/* الرقم */}
                <span className="font-medium text-lg w-16 text-center">
                  {count}
                </span>
                <hr className="h-full w-px border-0 bg-gray-100" />

                {/* زر الزيادة */}
                <button
                  onClick={() => {
                    setCount(count - 1);
                  }}
                  className="text-xl font-bold text-gray-600 hover:text-red-600"
                >
                  −
                </button>
              </div>
            </div>
            <hr className="w-full h-px bg-gray-100" />
            <div className="flex items-center gap-10">
              <div className="flex items-center cursor-pointer gap-2 hover:text-gray-500"
                onClick={handleShare}
              >
                <IoShareSocial />
                <h1>share</h1>
              </div>
              <div className="flex items-center cursor-pointer gap-2 hover:text-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  addFavoriteItems();
                }}
              >
                <FaRegHeart />

                <h1>Add to wishlist</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className="mt-24 ">
        <h1 className="md:text-2xl xs:text-lg flex items-center gap-3 font-bold mx-10 ">
          {t("You_might_like")}
        </h1>

        <div className="px-5 pb-10">
          <Swiper
            key={locale}
            slidesPerView={"auto"}
            slidesOffsetBefore={16}
            slidesOffsetAfter={16}
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".next-btn1",
              prevEl: ".prev-btn1",
            }}
            dir={locale === "ar" ? "rtl" : "ltr"}
            spaceBetween={10}
            className="w-full h-full   "
          >
            {products.map((product) => {
              return (
                <SwiperSlide
                  key={product.itemId}
                  className=" my-10 !w-[220px] rounded-lg select-none"
                >
                  <div className="rounded-lg  flex justify-center  cursor-pointer">
                    <ProductCard productInfo={product} favorite={false} />
                  </div>
                </SwiperSlide>
              );
            })

            }
            {/* <div className=" flex flex-col justify-center items-center relative my-10">
            <div className=" p-1 rounded-full absolute flex gap-2 justify-center items-center  ">
              <button className="prev-btn1 p-1 rounded-full border-2 hover:bg-red-600 border-red-600   hover:text-white text-red-600 text-3xl   font-bold">
                {locale === "ar" ? (
                  <IoIosArrowRoundForward className="text-3xl font-bold" />
                ) : (
                  <IoIosArrowRoundBack />
                )}
              </button>
              <button className="next-btn1 p-1 rounded-full border-2 hover:bg-red-600 border-red-600   hover:text-white text-red-600 text-3xl   font-bold">
                {locale === "ar" ? (
                  <IoIosArrowRoundBack className="text-3xl font-bold" />
                ) : (
                  <IoIosArrowRoundForward />
                )}
              </button>
            </div>
          </div> */}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
