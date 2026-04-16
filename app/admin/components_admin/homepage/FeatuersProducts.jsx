"use client";
import { BsStars } from "react-icons/bs";
import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../../../utils/requestsUtils";
import ProductForm from "../products/ProductForm";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import { useLanguage } from "../../../../context/LanguageContext";
import ProductCard from "../../../user/components/ProductCard";
import { AiFillStar } from "react-icons/ai";
import { getThumbnailUrl } from "../../../../utils/functions";

export default function FeaturedProducts() {
  const [featuersProducts, setFeatuersProduct] = useState([]);
  const { setSelectedProductId } = useIdContext();
  const { refreshKey } = useRefresh();
  const { t } = useLanguage();

  const getFeatuersProducts = async () => {
    const response = await postRequest(
      "/api/public/items/search",
      {
        page: 0,
        size: 100,
        isFavorite: true,
      },
      ""
    );
    setFeatuersProduct(response.data);
  };
  useEffect(() => {
    getFeatuersProducts();
  }, []);
  return (
    <div className="w-full h-auto relative bg-[#F9FAFB]  ">
      <ProductForm />

      <div className=" flex justify-between items-center">
        <div className="flex  items-center gap-3">
          <span className=" text-red-600 rounded-full text-xl  p-1">
            <AiFillStar className="" />
          </span>
          <h1 className="font-semibold md:text-xl xs:text-lg">
            {t("featured_products")}{" "}
          </h1>
        </div>
        <Link
          href="/admin/pages/Products"
          className="md:text-4xl xs:text-3xl mx-10 text-red-700 hover:text-red-800"
        >
          <FaCirclePlus />
        </Link>
      </div>
      <div className="my-5 grid lg:grid-cols-5 md:grid-cols-3 xs:grid-cols-2 gap-5 w-full">
        {featuersProducts.map((product, index) => {
          const describtion =
            localStorage.lang === "ar"
              ? product.descriptionAr
              : product.descriptionEn;
          return (
            <div
              key={index}
              onClick={() => {
                const productForm = document.querySelector("#add-product-form");
                productForm.classList.remove("hidden");
                productForm.classList.add("flex");
                const btn_saveProduct =
                  document.querySelector("#btn-saveProduct");
                btn_saveProduct.classList.add("hidden");
                let nameFormProduct =
                  document.querySelector("#nameFormProduct");
                nameFormProduct.innerHTML = "Edit Product";
                setSelectedProductId(product.itemId);
              }}
              className="cursor-pointer hover:shadow-md hover:scale-105 duration-200"
            >
              <div className="h-[320px] bg-white border rounded-md">
                <div className="">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${
                      getThumbnailUrl(product.mainImageURL) || ""
                    }`}
                    alt=""
                    width={500}
                    height={500}
                    priority
                    className="h-[150px]  w-full rounded-t-lg"
                  />
                  <div className="px-3">
                    <div className="flex justify-between items-center">
                      <h1 className="my-3 text-sm font-semibold">
                        {localStorage.lang === "ar"
                          ? product.nameAr
                          : product.nameEn}
                      </h1>
                      {/* <span
                                              id={`btn_fov_${product.itemId}`}
                                              className={`${product.favorite === true ? "text-gray-400 " : "text-red-600 "}rounded-full`}
                                              onClick={() => {
                                                const btn_fov = document.querySelector(
                                                  `#btn_fov_${product.itemId}`,
                                                );
                                                if (favorite === true) {
                                                  btn_fov.classList.add("text-red-600");
                                                  deleteFavoriteItems(product.itemId);
                                                } else {
                                                  btn_fov.classList.remove("text-gray-400");
                                                  addFavoriteItems(product.itemId);
                                                  btn_fov.classList.add("text-red-600");
                                
                                                }
                                                setSelectedProductId(product.itemId);
                                              }}
                                            >
                                              <FaHeart />
                                            </span> */}
                    </div>
                    <h1 className="md:text-sm xs:text-xs text-gray-400 ">
                      {/* {describtion.length <= 50
                        ? describtion
                        : describtion.slice(0, 50) + " ..."} */}
                    </h1>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 px-3">
                  <div className="flex flex-col my-2">
                    {product.oldPrice ? (
                      <div className="flex gap-2">
                        <span className=" font-semibold line-through text-sm flex text-gray-400">
                          {product.oldPrice} {t("currency")}
                        </span>
                      </div>
                    ) : (
                      <span className="p-[11px]"></span>
                    )}
                    <div className="flex gap-2">
                      <span className=" font-semibold text-base">
                        {product.price} {t("currency")}
                      </span>
                      {product.oldPrice ? (
                        <span className=" font-semibold flex bg-green-600 text-sm px-1 text-white rounded-md">
                          {(
                            ((product.oldPrice - product.price) /
                              product.oldPrice) *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
