"use client";
import { IoShareSocial } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { FaShippingFast, FaStarHalfAlt } from "react-icons/fa";
import { postRequest } from "../../../../utils/requestsUtils";
import { useRouter } from "next/navigation";
import { useRefresh } from "../../../../context/refreshContext";
import { useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import StarRating from "../../components/StarRating";
export default function ProductInfo({ product, itemId }) {
    const navigate = useRouter();
    const { triggerRefresh } = useRefresh();
    const [count, setCount] = useState(1);
    const { locale, t } = useLanguage();

    const addFavoriteItems = async () => {
        if (userId) {
            await postRequest(
                `/api/users/${userId}/favoriteItems/${itemId}`,
                "",
                "",
            );
        } else {
            const product = {
                id: itemId,
            };

            let favoriteItems = JSON.parse(
                localStorage.getItem("favoriteItems") || "[]",
            );

            const existingItem = favoriteItems.find((item) => item.id === itemId);

            if (existingItem) {
            } else {
                favoriteItems.push(product);
                toast.success("تم اضافة المنتج بنجاح");
            }

            localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
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
    }
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
        }
    };

    return (
        <div className="w-full h-full flex-col justify-center items-center">
            <div className="flex  flex-col w-full h-auto  justify-between gap-5 bg-white  px-5  rounded-3xl">
                <div className={`w-full flex items-center justify-between  py-2 px-5 rounded-full text-white ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"}  from-[#da643b] via-orange-400 to-[#f6b30f]`}>
                    <span >{t("Fast_delivery")} </span>
                    <FaShippingFast className="w-8 h-8 text-[#d91c10]" />

                </div>


                <div>
                    <div className="flex justify-between items-start">
                        <span>
                            <h1 className="text-3xl font-semibold">
                                {locale === "ar" ? product.nameAr : product.nameEn}
                            </h1>
                            <h1 className=" text-gray-500 mt-2  md:text-sm xs:text-xs">
                                {t("code")}: {product.code}
                            </h1>
                        </span>
                        {/* <span
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
                        </span> */}
                    </div>

                </div>
                {product.available ? (
                    <div className="flex flex-col  gap-3">

                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 md:text-2xl xs:text-xl line-through">
                                {product.oldPrice
                                    ? product.oldPrice.toLocaleString("en-US") +
                                    " " +
                                    t("currency")
                                    : ""}
                            </span>
                            <span className="text-3xl  font-semibold text-[#E14A5C] ">
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

                <span className="text-gray-500 text-sm">
                    {locale === "ar" ? product.descriptionAr : product.descriptionEn}
                </span>

                <span className="text-red-600">
                    {product.available ? "" : t("Currently_unavailable")}
                </span>

                <div className="flex w-full  items-center gap-4 h-9 text-sm">
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
                    <div className="flex items-center text-center justify-center gap-3 w-[150px] rounded-full h-full border text-gray-600 bg-white">
                        {/* زر النقصان */}
                        <button
                            onClick={() => {
                                setCount(count + 1);
                            }}
                            className="text-sm font-bold text-gray-600  hover:text-red-600"
                        >
                            +
                        </button>
                        <hr className="h-full w-px border-0 bg-gray-100" />
                        {/* الرقم */}
                        <span className="font-medium  text-center">
                            {count}
                        </span>
                        <hr className="h-full w-px border-0 bg-gray-100" />

                        {/* زر الزيادة */}
                        <button
                            onClick={() => {
                                setCount(count - 1);
                            }}
                            className="text-sm font-bold text-gray-600 hover:text-red-600"
                        >
                            −
                        </button>
                    </div>
                </div>
                <hr className="w-full h-px bg-gray-100" />
                <div className="flex items-center gap-10 text-sm">
                    <div className="flex items-center cursor-pointer gap-2 hover:text-gray-500"
                        onClick={handleShare}
                    >
                        <IoShareSocial />
                        <h1>{t("share")} </h1>
                    </div>
                    <div className="flex items-center cursor-pointer gap-2 hover:text-gray-500"
                        onClick={(e) => {
                            e.stopPropagation();
                            addFavoriteItems();
                        }}
                    >
                        <FaRegHeart />

                        <h1>{t("addToWishList")} </h1>
                    </div>
                    {/* <div className="flex items-center cursor-pointer gap-2 hover:text-gray-500"
                        onClick={(e) => {
                            e.stopPropagation();
                            addFavoriteItems();
                        }}
                    >
                        <FaStarHalfAlt />

                        <h1>{t("product_rating")} </h1>
                    </div> */}
                </div>
            </div>

        </div>
    )
}