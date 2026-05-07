"use client";
import { useEffect, useId, useState } from "react";
import { useIdContext } from "../../../context/idContext";
import { getProductDetails, getThumbnailUrl } from "../../../utils/functions";
import Image from "next/image";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import { postRequest } from "../../../utils/requestsUtils";
import "aos/dist/aos.css";
import { useLanguage } from "../../../context/LanguageContext";
import Swal from "sweetalert2";
import FeatuerProducts from "./home/FeatuerProducts";
import { FaQuestionCircle } from "react-icons/fa";
import { useSearshInputContext } from "../../../context/searshInputContext";
export default function ProductDetails({ itemId }) {
  const [count, setCount] = useState(1);
  const { setSelectedCategoryId } = useIdContext();
  const navigate = useRouter();
  const [loading, setLoading] = useState(true);
  const [imageShow, setImageShow] = useState("");
  const urlImage = process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL;
  const { t } = useLanguage();
  const { setSelectedSearchInput } = useSearshInputContext();

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
        img2: resData.images.length >= 1 ? resData.images[0].imageUrl : "",
        img3: resData.images.length >= 2 ? resData.images[1].imageUrl : "",
        available: resData.available,
        category: {
          ...prev.category,
          id: resData.itemCategory.itemCategoryId,
          nameAr: resData.itemCategory.nameAr,
          nameEn: resData.itemCategory.nameEn,
        },
      }));
      setLoading(false);
      setImageShow(urlImage + resData.mainImageURL);
      getProductsByCategory(resData.itemCategory.itemCategoryId);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
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

  const addToCart = async () => {
    try {
      if (userId) {
        if (product.available) {
          await postRequest(
            `/api/shopCarts/${userId}/addLine`,
            {
              itemId: itemId,
              quantity: count,
            },
            "",
          );
        }

        const result = await Swal.fire({
          icon: "success",
          title: t("تم إضافة المنتج الى سلة التسوق"),
          showCancelButton: true,
          confirmButtonText: t("goToCart"),
          cancelButtonText: t("continueShopping"),
          customClass: {
            popup: "rounded-xl shadow-lg border border-gray-200 p-6",
            title: "text-xl font-bold text-gray-800 mb-2",
            content: "text-sm text-gray-600 mb-4",
            confirmButton:
              "bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2 rounded-lg",
            cancelButton:
              "bg-gray-500 hover:bg-gray-400 text-w  font-medium px-6 py-2 rounded-lg ml-2",
          },
        });
        if (result.isConfirmed) {
          navigate.push("/user/cart");
        }
      } else {
        navigate.push("/signin");
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
        <div className="flex lg:flex-row xs:flex-col  gap-10 py-10 mx-10 ">
          {loading && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <Image
                src="/Images/logo.png"
                alt=""
                className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
                width={100}
                height={100}
                priority
              />
            </div>
          )}
          <div className="w-full h-[600px] ">
            <div className="w-full h-[500px] relative  flex justify-center border rounded-md shadow-md  ">
              <Image
                src={imageShow}
                alt="mainImage"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-4 mt-5 ">
              {product.img2 ? (
                <diV className="relative w-[100px] h-[100px] border rounded-md  shadow-md cursor-pointe">
                  <Image
                    src={urlImage + getThumbnailUrl(product.img2)}
                    alt="mainImage"
                    fill
                    priority
                    className="object-containr cursor-pointe"
                    onClick={() => {
                      setImageShow(urlImage + product.img2);
                    }}
                  />
                </diV>
              ) : (
                ""
              )}

              {product.img3 ? (
                <diV className="relative w-[100px] h-[100px] border rounded-md  shadow-md cursor-pointe">
                  <Image
                    src={urlImage + getThumbnailUrl(product.img3)}
                    alt="mainImage"
                    fill
                    priority
                    className="object-contain cursor-pointe"
                    onClick={() => {
                      setImageShow(urlImage + product.img3);
                    }}
                  />
                </diV>
              ) : (
                ""
              )}
              <diV className="relative w-[100px] h-[100px] border rounded-md  shadow-md cursor-pointe">
                <Image
                  src={urlImage + getThumbnailUrl(product.mainImage)}
                  alt="mainImage"
                  fill
                  priority
                  className="object-contain cursor-pointe "
                  onClick={() => {
                    setImageShow(urlImage + product.mainImage);
                  }}
                />
              </diV>
            </div>
          </div>

          <div className="flex py-5 flex-col w-full md:h-[500px] xs:h-[570px] justify-between bg-white  px-5 border rounded-md shadow-md">
            <div>
              <div className="flex justify-between items-start">
                <span>
                  <h1 className="text-xl font-semibold">
                    {typeof localStorage.lang !== "undefined" &&
                    localStorage.lang === "ar"
                      ? product.nameAr
                      : product.nameEn}
                  </h1>
                  <h1 className=" text-gray-500 mt-2  text-sm">
                    {t("code")}: {product.code}
                  </h1>
                </span>
                <span
                  className="text-red-600 cursor-pointer hover:shadow-sm hover:shadow-red-700 px-4 rounded-md  "
                  onClick={() => {
                    setSelectedCategoryId(product.category.id);
                    setSelectedSearchInput("");
                    navigate.push("/user/search");
                  }}
                >
                  {typeof localStorage.lang !== "undefined" &&
                  localStorage.lang === "ar"
                    ? product.category.nameAr
                    : product.category.nameEn}
                </span>
              </div>

              <hr className="w-full  my-5"></hr>
            </div>
            <span className="text-gray-500">
              {typeof localStorage.lang !== "undefined" &&
              localStorage.lang === "ar"
                ? product.descriptionAr
                : product.descriptionEn}
            </span>
            {product.available ? (
              <div className="flex flex-col  gap-3">
                {product.oldPrice ? (
                  <span className=" font-semibold mt-3 w-[80px] text-center bg-red-600 px-1 text-white rounded-md">
                    {t("off")}{" "}
                    {(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                ) : (
                  ""
                )}
                <div className="flex items-center gap-2">
                  <span className="text-3xl  font-semibold  ">
                    {product.price
                      ? product.price.toLocaleString("en-US") +
                        " " +
                        t("currency")
                      : ""}
                  </span>
                  <span className="text-gray-400 text-xl line-through">
                    {product.oldPrice
                      ? product.oldPrice.toLocaleString("en-US") +
                        " " +
                        t("currency")
                      : ""}
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
            <span className="text-red-600">
              {product.available ? "" : t("Currently_unavailable")}
            </span>

            <div className="flex  items-center gap-4 h-10 ">
              <button
                className={`w-[70%] h-full rounded-md text-white text-lg flex  justify-center items-center gap-3  ${
                  product.available
                    ? "bg-red-600 hover:bg-red-700 hover:scale-105 duration-200"
                    : "cursor-not-allowed bg-gray-400 hover:bg-gray-400 hover:scale-100"
                }`}
                disabled={!product.available}
                onClick={addToCart}
              >
                {t("addToCart")}
                <MdOutlineAddShoppingCart />
              </button>
              <div className="flex items-center gap-3 rounded-lg px-4 h-full border text-gray-600 bg-white">
                {/* زر النقصان */}
                <button
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  className="text-xl font-bold text-gray-600  hover:text-red-600"
                >
                  +
                </button>

                {/* الرقم */}
                <span className="font-medium text-lg w-16 text-center">
                  {count}
                </span>

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
          </div>
        </div>
      )}

      <div className="mt-24 ">
        <h1 className="text-2xl flex items-center gap-3 font-bold mx-10 mb-[-90px]">
          <FaQuestionCircle className="text-red-600" />
          {t("You_might_like")}
        </h1>
        <hr />

        <FeatuerProducts FeatuerProducts={products} />
      </div>
    </div>
  );
}
