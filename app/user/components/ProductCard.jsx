import { useIdContext } from "../../../context/idContext";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { deleteRequest, postRequest } from "../../../utils/requestsUtils";
import { useLanguage } from "../../../context/LanguageContext";
import { useRouter } from "next/navigation";
import { useRefresh } from "../../../context/refreshContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";
import { getThumbnailUrl } from "../../../utils/functions";
import { IoMdCart, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import StarRating from "./StarRating"
export default function ProductCard({ productInfo, favorite }) {
  const { setSelectedProductId } = useIdContext();
  const navigate = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState();
  const { locale } = useLanguage();
  const { triggerRefresh } = useRefresh();

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const addToCart = async (productId) => {
    try {
      if (userId) {
        if (productInfo.available) {
          await postRequest(
            `/api/shopCarts/addLine`,
            {
              itemId: productId,
              quantity: 1,
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
          id: productId,
          quantity: 1,
        };

        let cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingItem = cart.find((item) => item.id === productId);

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
  const addFavoriteItems = async (productId) => {
    if (userId) {
      await postRequest(
        `/api/users/${userId}/favoriteItems/${productId}`,
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

  const deleteFavoriteItems = async (productId) => {
    try {
      setLoading(true);

      const res = await deleteRequest(
        `/api/users/${userId}/favoriteItems/${productId}`,
        t("message"),
      );
      // triggerRefresh();
      if (res.success === true) {
        const divProductId = document.querySelector(
          `#div_${productInfo.itemId}`,
        );
        divProductId.classList.add("hidden");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // const describtion =
  // productInfo?.[locale === "ar" ? "descriptionAr" : "descriptionEn"] || "";
  const productName = locale === "ar" ? productInfo?.nameAr : productInfo?.nameEn;

  return (
    <div
      id={`div_${productInfo?.itemId}`}
      className="h-[360px] group relative  bg-white  py-2 w-full rounded-3xl cursor-pointer  "
    >
      <div className="flex flex-col justify-center gap-4  items-center h-full">
        <div className=" relative h-[200px] w-full  ">
          <div className="absolute h-4 flex justify-center items-center gap-2 z-20 p-4 "
            onClick={() => {
              setSelectedProductId(productInfo?.itemId);
              navigate.push(`/user/productdetails/${productName}/${productInfo?.itemId}`);
            }}
          >

            {productInfo?.oldPrice ? (
              <span className="font-semibold flex justify-center items-center  text-center bg-[#8CBC67] text-xs  w-12 h-6 text-white rounded-full">
                {" - " +
                  (
                    ((productInfo?.oldPrice - productInfo?.price) /
                      productInfo?.oldPrice) *
                    100
                  ).toFixed(0)}
                %
              </span>
            ) : (
              ""
            )}

          </div>
          <div className="w-full h-full flex justify-center px-3 items-center z-10">
            <div className=" h-full w-full relative  bg-gray-100 rounded-3xl">


              <Image
                src={
                  process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                  getThumbnailUrl(productInfo?.mainImageURL)
                }
                alt=""
                fill
                priority
                quality={200}
                sizes="100vw"
                className="object-fill rounded-3xl"
                onClick={() => {
                  setSelectedProductId(productInfo?.itemId);
                  navigate.push(`/user/productdetails/${productName}/${productInfo?.itemId}`);
                }}
              />
            </div>
          </div>
          <div
            className="
    absolute bottom-0 left-0
    px-3 w-full
    opacity-0 invisible
    transition-all duration-300
    group-hover:opacity-100 group-hover:visible
    text-center
  "
          >
            <div
              className="
      flex items-center justify-center
      w-full
      bg-[#E76E7D]
      rounded-b-3xl
      overflow-hidden
    "
            >

              {/* Wish List */}
              <button
                id={`btn_fov_${productInfo?.itemId}`}
                className="
        group/wishlist
        flex items-center justify-center 
        text-white
        w-full
        py-2
        
        transition-all duration-200
        hover:bg-[#CD4354]
       
      "
                onClick={(e) => {
                  e.stopPropagation();

                  if (favorite === true) {
                    deleteFavoriteItems(productInfo?.itemId);
                  } else {
                    addFavoriteItems(productInfo?.itemId);
                  }

                  setSelectedProductId(productInfo?.itemId);
                }}
              >
                <IoMdHeart
                  className="
          w-5 h-5
          opacity-0
      invisible
      scale-75
      transition-all duration-300
      group-hover/wishlist:opacity-100
      group-hover/wishlist:visible
      group-hover/wishlist:scale-100
        "
                />

                <span
                  className=" text-xs
      transition-all duration-300
      opacity-100
      visible
      scale-100
      group-hover/wishlist:opacity-0
      group-hover/wishlist:invisible
      group-hover/wishlist:absolute
      group-hover/wishlist:scale-75">
                  {t("wishlist")}
                </span>
              </button>


              {/* Add To Cart */}
              {productInfo?.available && (
                <button
                  className="
    group/cart
    flex items-center justify-center
    text-white
    w-full
    py-2
    text-sm
    transition-all duration-300
   hover:bg-[#CD4354]

  "
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(productInfo?.itemId);
                  }}
                >
                  {/* Add to Cart */}
                  <span
                    className="
    text-xs
      transition-all duration-300
      opacity-100
      visible
      scale-100
      group-hover/cart:opacity-0
      group-hover/cart:invisible
      group-hover/cart:absolute
      group-hover/cart:scale-75
    "
                  >
                    {t("Cart")}
                  </span>

                  {/* Cart Icon */}
                  <MdOutlineAddShoppingCart
                    className="
      w-5 h-5
      opacity-0
      invisible
      scale-75
      transition-all duration-300
      group-hover/cart:opacity-100
      group-hover/cart:visible
      group-hover/cart:scale-100
    "
                  />
                </button>
              )}

            </div>
          </div>


        </div>



        <div className="w-full flex flex-col justify-center items-center">
          <h1
            className="text-sm font-semibold"
            onClick={() => {
              setSelectedProductId(productInfo?.itemId);
              navigate.push(`/user/productdetails/${productName}/${productInfo?.itemId}`);

            }}
          >
            {productName?.length <= 29
              ? productName
              : productName?.slice(0, 29) + " ..."}
          </h1>
          <div className="flex justify-center items-cente text-gray-500 text-sm">
            {locale === "ar" ? productInfo?.itemCategory?.nameAr : productInfo?.itemCategory?.nameEn}
            {" "}
          </div>

        </div>

        <div>
          <StarRating rating={10} maxRating={10} />
        </div>

        <div className="w-full">
          <div className="flex w-full justify-center items-center">
            {productInfo?.available ? (
              <div
                className="flex flex-col w-full"

              >

                <div className="flex  justify-center gap-2 items-center ">
                  {productInfo?.oldPrice ? (
                    <div className="flex gap-2">
                      <span className=" line-through text-sm  flex text-gray-400">
                        {productInfo?.oldPrice.toLocaleString("en-US")}{" "}{t("currency")}
                      </span>
                    </div>
                  ) : (
                    <span className="p-[11px]"></span>
                  )}
                  <span className=" font-semibold text-red-600 ">
                    {productInfo?.price.toLocaleString("en-US")}.00 {t("currency")}
                  </span>

                </div>
              </div>
            ) : (
              <span className="text-red-600 mt-10 text-xs ">
                {t("Currently_unavailable")}
              </span>
            )}
            {/* {productInfo?.available ? (
              ""
            ) : (
             
            )} */}

          </div>

        </div>

      </div>
    </div>
    // </div>
  );
}
