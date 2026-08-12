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
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

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
            `/api/shopCarts/${userId}/addLine`,
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
      console.log(error);
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
      console.log(res);
      if (res.success === true) {
        const divProductId = document.querySelector(
          `#div_${productInfo.itemId}`,
        );
        divProductId.classList.add("hidden");
      }
    } catch (error) {
      console.log(error);
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
      className="h-[270px] bg-white border border-gray-300 shadow-md w-full rounded-md cursor-pointer  hover:border-b-[7px] hover:border-b-red-600  hover:scale-105 duration-200   hover:shadow-lg "
    >
      <div className="flex flex-col h-full gap-2 ">
        <div className="relative h-[150px] w-full  ">
          <button
              id={`btn_fov_${productInfo?.itemId}`}
              className={`inline-flex items-center hover:text-red-600 m-1 rounded-full htransition  absolute right-0 p-1 z-20 text-lg bg-gray-100   ${
                favorite === true ? "text-red-600" : "text-gray-400"
              } rounded-full`}
              onClick={() => {
                const btn_fov = document.querySelector(
                  `#btn_fov_${productInfo?.itemId}`,
                );
                if (favorite === true) {
                  btn_fov.classList.add("text-red-600");
                  deleteFavoriteItems(productInfo?.itemId);
                } else {
                  btn_fov.classList.remove("text-gray-400");
                  addFavoriteItems(productInfo?.itemId);
                  btn_fov.classList.add("text-red-600");
                }
                setSelectedProductId(productInfo?.itemId);
              }}
            >
              <IoMdHeart className="w-5 h-5" />
            </button>
            <div className="w-full h-full my-2 flex justify-center items-center   z-10">
               <div className="h-full w-[200px] relative bg-gray-100">
                <Image
            src={
              process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
              getThumbnailUrl(productInfo?.mainImageURL)
            }
            alt=""
            fill
            priority
            className="object-fill rounded-md"
            onClick={() => {
              setSelectedProductId(productInfo?.itemId);
              navigate.push(`/user/productdetails/${productInfo?.itemId}`);
            }}
          />
            </div>
            </div>
           
        
        </div>

        <div className="px-2 mt-3 w-full flex items-center flex-col ">
          {/* <div className="w-full flex justify-end items-end">
            
          </div> */}
                  
          <div className="w-full flex justify-between items-center">
            {/* <div> */}
            <h1
              className="text-sm font-bold"
              onClick={() => {
                setSelectedProductId(productInfo?.itemId);
                navigate.push(
                  `/user/productdetails/${productInfo?.itemId}`,
                );
              }}
            >
              {productName?.length <= 29
                ? productName
                : productName?.slice(0, 29) + " ..."}
            </h1>
          
    
          </div>
         
        </div>
<div className="w-full">
   <div className="flex w-full justify-between items-center  px-2">
          {productInfo?.available ? (
            <div
              className="flex flex-col w-full"
              
            >
              <div className=" h-4 flex justify-start items-center gap-2 mt-3"
                onClick={() => {
              setSelectedProductId(productInfo?.itemId);
              navigate.push(`/user/productdetails/${productInfo?.itemId}`);
            }}
              >
                {productInfo?.oldPrice ? (
                  <div className="flex gap-2">
                    <span className=" font-semibold line-through text-sm  flex text-gray-400">
                      {productInfo?.oldPrice.toLocaleString("en-US")}{" "}{t("currency")}
                    </span>
                  </div>
                ) : (
                  <span className="p-[11px]"></span>
                )}
                {productInfo?.oldPrice ? (
                  <span className="font-semibold  text-center bg-red-600 text-[10px] p-[2px]  text-white rounded-md">
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
              <div className="flex  justify-between  items-center ">
                <span className="text-base  font-bold ">
                  {productInfo?.price.toLocaleString("en-US")} {t("currency")}
                </span>
              {productInfo?.available ? (
          <div className="my-1">
             <button
              className="text-lg  text-white bg-red-600 p-[5px]   hover:bg-red-700 hover:text-white transition duration-200 hover:scale-105 rounded-3xl"
              onClick={() => {
                addToCart(productInfo?.itemId);
              }}
            >
              <MdOutlineAddShoppingCart />
            </button>
          </div>
           
          ) : (
            ""
          )}
              </div>
            </div>
          ) : (
            ""
          )}
          {productInfo?.available ? (
            ""
          ) : (
            <span className="text-red-600 mt-10 text-xs ">
              {t("Currently_unavailable")}
            </span>
          )}
         
        </div>
        
</div>
       
      </div>
    </div>
    // </div>
  );
}
