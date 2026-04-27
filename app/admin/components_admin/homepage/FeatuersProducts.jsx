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
              <div className="h-[330px] bg-white border rounded-md">
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
                     
                    </div>
                    <h1 className="md:text-sm xs:text-xs mt-2 text-gray-400 ">
                      {describtion.length <= 50
                        ? describtion
                        : describtion.slice(0, 50) + " ..."}
                    </h1>
                  </div>
                </div>

                  <div className="flex w-full justify-between items-center mt-3  px-3">
                          {product.available ? (
                            <div
                              className="flex flex-col "
                             
                            >
                              <div className=" my-2 h-4">
                                {product.oldPrice ? (
                                  <span className=" font-semibold  w-full text-center bg-red-600 text-xs p-[4px]  text-white rounded-md">
                                    {t("off")}
                                    {" " +
                                      (
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
                              <div className="flex items-center gap-2">
                                <span className=" font-bold ">
                                  {product.price.toLocaleString("en-US")} {t("currency")}
                                </span>
                                {product.oldPrice ? (
                                  <div className="flex gap-2">
                                    <span className=" font-semibold line-through text-sm  mt-2 flex text-gray-400">
                                      {product.oldPrice.toLocaleString("en-US")}{" "}
                                      {t("currency")}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="p-[11px]"></span>
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {product.available ? (
                            ""
                          ) : (
                            <span className="text-red-600 mt-8">
                              {t("Currently_unavailable")}
                            </span>
                          )}
                         
                        </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
