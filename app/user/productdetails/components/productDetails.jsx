"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProductDetails, getThumbnailUrl } from "../../../../utils/functions";
import Image from "next/image";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useRouter } from "next/navigation";
import { postRequest } from "../../../../utils/requestsUtils";
import "aos/dist/aos.css";
import { useLanguage } from "../../../../context/LanguageContext";
import Swal from "sweetalert2";
import FeatuerProducts from "../../home/components/FeatuerProducts";
import { FaQuestionCircle } from "react-icons/fa";
import { useRefresh } from "../../../../context/refreshContext";
export default function ProductDetails({ itemId }) {
  const [count, setCount] = useState(1);
  const navigate = useRouter();
  const [loading, setLoading] = useState(true);
  const [imageShow, setImageShow] = useState("");
  const urlImage = process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL;
  const { t } = useLanguage();
  const { locale } = useLanguage();
  const { triggerRefresh } = useRefresh();

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
    try {
          setLoading(true);

      const res = await getProductDetails(itemId);
      const resData = res.data;
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
      setImageShow(urlImage + resData.mainImageURL);
      getProductsByCategory(resData.itemCategory.itemCategoryId);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const getProductsByCategory = async (categoryId) => {
    try {
            setLoading(true);

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
    } catch (error) {
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
        triggerRefresh();
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
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const addToRecentlyWatched = async () => {
   const token = localStorage.getItem("accessToken");

  if (!token) return;

    try{
     await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/recentWatchedItems/${itemId}`,{},
         {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      }
      )
    }
    catch(error){
    }
  }

  useEffect(() => {
addToRecentlyWatched()
    productDetails();
    getProductsByCategory()
  }, [itemId]);
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
        <div className="flex lg:flex-row xs:flex-col  gap-10 md:p-10 xs:p-2 ">
          <div className="w-full h-[550px] ">
            <div className="w-full h-[450px] relative  flex justify-center border rounded-md shadow-md  ">
              <Image
                src={imageShow}
                alt="mainImage"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-fill"
              />
            </div>
            <div className="flex items-center gap-4 mt-5 ">
              {product.img2 ? (
                <div className="relative w-[100px] h-[100px] border rounded-md  shadow-md cursor-pointer">
                  <Image
                    src={urlImage + getThumbnailUrl(product.img2)}
                    alt="mainImage"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-fill cursor-pointer"
                    onClick={() => {
                      setImageShow(urlImage + product.img2);
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              {product.img3 ? (
                <div className="relative w-[100px] h-[100px] border rounded-md  shadow-md cursor-pointer">
                  <Image
                    src={urlImage + getThumbnailUrl(product.img3)}
                    alt="mainImage"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-fill cursor-pointer"
                    onClick={() => {
                      setImageShow(urlImage + product.img3);
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="relative w-[100px] h-[100px] border rounded-md  shadow-md cursor-pointerr">
                <Image
                  src={urlImage + getThumbnailUrl(product.mainImage)}
                  alt="mainImage"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-fill cursor-pointer "
                  onClick={() => {
                    setImageShow(urlImage + product.mainImage);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex py-5 flex-col w-full h-auto  justify-between gap-5 bg-white  px-5 border rounded-md shadow-md">
            <div>
              <div className="flex justify-between items-start">
                <span>
                  <h1 className="md:text-xl xs:text-base font-semibold">
                    {locale === "ar" ? product.nameAr : product.nameEn}
                  </h1>
                  <h1 className=" text-gray-500 mt-2  md:text-sm xs:text-xs">
                    {t("code")}: {product.code}
                  </h1>
                </span>
                <span
                  className="text-red-600 cursor-pointerr md:text-base xs:text-xs hover:shadow-sm hover:shadow-red-700 px-4 rounded-md  "
                   onClick={() => {
                  navigate.push(
                    "/user/products/category/" +
                    product.category.nameEn +
                    "/" +
                    product.category.itemCategoryId,
                  );
                }}
                >
                  {locale === "ar"
                    ? product.category.nameAr
                    : product.category.nameEn}
                </span>
              </div>

              <hr className="w-full  my-5"></hr>
            </div>
            <span className="text-gray-500">
              {locale === "ar" ? product.descriptionAr : product.descriptionEn}
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
                  <span className="md:text-3xl xs:text-2xl  font-semibold  ">
                    {product.price
                      ? product.price.toLocaleString("en-US") +
                        " " +
                        t("currency")
                      : ""}
                  </span>
                  <span className="text-gray-400 md:text-xl xs:text-base line-through">
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

            <div className="flex w-full  items-center gap-4 h-10 ">
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
              <div className="flex items-center text-center justify-center gap-3 w-[30%] rounded-lg px-4 h-full border text-gray-600 bg-white">
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
  <hr />
      <div className="mt-24 ">
        <h1 className="md:text-2xl xs:text-lg flex items-center gap-3 font-bold mx-10 ">
          <FaQuestionCircle className="text-red-600" />
          {t("You_might_like")}
        </h1>
      
<div className="xs:px-5 md:px-0">
        <FeatuerProducts Products={products} type={"FeaturedProducts"} />

</div>
      </div>
    </div>
  );
}
