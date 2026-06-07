"use client";
import { MdBlock, MdDelete, MdOutlineDownloading, MdStar } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { GoStarFill } from "react-icons/go";
import { postRequest } from "../../../../utils/requestsUtils.js";
import { useIdContext } from "../../../../context/idContext";
import { IoMdSearch } from "react-icons/io";
import { deleteRequest } from "../../../../utils/requestsUtils.js";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import { getThumbnailUrl } from "../../../../utils/functions.jsx";
import { CgUnavailable } from "react-icons/cg";
import { ImBlocked } from "react-icons/im";

export default function ProductsTable({ setIsFormOpen }) {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const productTableRef = useRef();
  const pageNum = useRef(0);
  const { refreshKey } = useRefresh();
  const { triggerRefresh } = useRefresh();
  const { setSelectedProductId } = useIdContext();
  const searchInputRef = useRef();
  const [loading, setLoading] = useState(true);
  const getAllProducts = async () => {
    setLoading(true)
    try {
      console.log(searchInputRef.current.value);
      const response = await postRequest(
        "/api/public/items/search",
        {
          page: pageNum.current,
          size: 10,
          searchText: searchInputRef.current.value,
        },
        "",
      );
      const resProducts = response.data || [];
      if (pageNum.current === 0) {
        setProducts(resProducts);
      } else setProducts((prev) => [...prev, ...resProducts]);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [refreshKey]);

  const productFavorite = async (productId , favorite) => {
    await postRequest(
      `/api/admin/items/${productId}/favorite/${favorite}`,
      "",
      t("message"),
    );
    triggerRefresh();
  };

  // const productUnfavorite = async (productId) => {
  //   await postRequest(
  //     `/api/admin/items/${productId}/unfavorite`,
  //     "",
  //     t("message"),
  //   );
  //   triggerRefresh();
  // };
  const productActive = async (productId,active) => {
    await postRequest(
      `/api/admin/items/${productId}/activate/${active}`,
      "",
      t("message"),
    );
    triggerRefresh();
  };

    const productAvailable = async (productId,available) => {
    await postRequest(
      `/api/admin/items/${productId}/availability/${available}`,
      "",
      t("message"),
    );
    triggerRefresh();
  };
  // const productDeaactive = async (productId) => {
  //   await postRequest(
  //     `/api/admin/items/${productId}/deactivate`,
  //     "",
  //     t("message"),
  //   );
  //   triggerRefresh();
  // };

  const openForm = (productID) => {
    setIsFormOpen(true);
    setSelectedProductId(productID);
  };
  const deleteProduct = async (product) => {
    try {
      await deleteRequest(`/api/admin/items/${product.itemId}`, t("message"));
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };
  // const SkeletonRow = () => (
  //     <tr className="border-b">
  //       <td className="px-4 py-3">
  //         <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
  //       </td>
  //       <td className="px-4 py-3">
  //         <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
  //       </td>
  //       <td className="px-4 py-3">
  //         <div className="h-6 bg-gray-200 rounded animate-pulse w-12"></div>
  //       </td>
  //       <td className="px-4 py-3">
  //         <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
  //       </td>
  //       <td className="px-4 py-3">
  //         <div className="h-6 bg-gray-200 rounded animate-pulse w-28"></div>
  //       </td>
  //       <td className="px-4 py-3">
  //         <div className="h-6 bg-gray-200 rounded animate-pulse w-36"></div>
  //       </td>
  //     </tr>
  //   );
  //   const SkeletonInputSearch = () => (
  //         <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>

  //   );
  return (
    <div className="w-full h-screen">
      <div className="bg-white  border rounded-lg border-1  w-full mt-5 flex flex-row justify-between  p-3 items-center  xs:gap-4">
        <div className="flex items-center justify-between border px-1 rounded-md w-[300px] bg-gray-100">
          <input
            type="text"
            placeholder={t("search")}
            className="bg-none outline-none placeholder:text-sm   bg-gray-100 p-1 rounded-lg"
            // value={searchInput}
            ref={searchInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getAllProducts();
              }
            }}
          />
          <button
            className="text-lg bg-red-300 hover:bg-red-500 p-1 text-white  rounded-md"
            onClick={getAllProducts}
          >
            <IoMdSearch />
          </button>
        </div>
        <button
          className="p-2 text-white xs:text-xs md:text-sm rounded-md bg-red-500 text-center flex items-center justify-center gap-2"
          onClick={() => {
            setIsFormOpen(true);
            setSelectedProductId(null);
          }}
        >
          <span className="text-base">
            <FaPlus />
          </span>
          <h1 className="xs:hidden md:block">{t("add_new_product")}</h1>
        </button>
      </div>

      <div
        ref={productTableRef}
        className=" rounded-xl w-full border h-[600px] mt-3 overflow-hidden xs:overflow-x-scroll lg:overflow-x-auto overflow-y-scroll "
      >
        <table className=" xs:w-[200%] lg:w-full">
          <thead className="bg-[#F9FAFB] text-xs text-justify sticky top-0  z-10">
            <tr className=" text-gray-500 h-12  ">
              <th className="w-[10%]"></th>
              <th className="w-[30%]">{t("PRODUCT_NAME")}</th>
              <th className="w-[20%]">{t("product_category")}</th>
              <th className="w-[15%]">{t("price")}</th>
              <th className="w-[15%]">{t("old_price")}</th>
              {/* <th></th> */}

              <th className="w-[20%]"></th>
            </tr>
          </thead>
          <tbody className="bg-white text-black text-lg w-full ">
            {loading
              ? // Skeleton rows
                [...Array(9)].map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b">
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-16"></div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                        <div className="h-2 bg-gray-200 rounded-md animate-pulse w-20"></div>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                  </tr>
                ))
             :  
            products.map((product, index) => (
              <tr
                key={index}
                className=" border hover:bg-gray-100 cursor-pointer  "
              >
                <td>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className={
                        "flex items-center justify-center gap-3 text-sm " +
                        (product.active ? "text-green-600" : "text-gray-600")
                      }
                      onClick={() => {
                        if (product.active === false) {
                          productActive(product.itemId , true);
                        } else {
                          productActive(product.itemId , false);
                        }
                      }}
                    >
                      <FaCircle />
                    </button>
                    <button
                      className={
                        "flex items-center justify-center " +
                        (product.favorite
                          ? " text-yellow-500"
                          : " text-gray-500")
                      }
                      onClick={async () => {
                        console.log(product.favorite);
                        if (product.favorite === false) {
                          await productFavorite(product.itemId , true);
                        } else {
                          await productFavorite(product.itemId , false);
                        }
                      }}
                    >
                      <GoStarFill />
                    </button>
                      <button
                      className={
                        "flex items-center justify-center " +
                        (product.available
                          ? " text-green-500"
                          : " text-red-500")
                      }
                      onClick={async () => {
                        console.log(product.available);
                        if (product.available === false) {
                          await productAvailable(product.itemId , true);
                        } else {
                          await productAvailable(product.itemId , false);
                        }
                      }}
                    >
                      <MdBlock />
                    </button>
                  </div>
                </td>
                <td
                  className="flex items-center gap-4"
                  onClick={() => openForm(product.itemId)}
                >
                  <Image
                    alt=""
                    src={`${
                      process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                        getThumbnailUrl(product.mainImageURL) || ""
                    }`}
                    width={40}
                    height={40}
                    className="rounded-xl xs:w-10 xs:h-10 md:w-14 md:h-12  border my-1 p-1"
                  />
                  <div>
                    <h1 className="text-sm font-semibold">
                      {typeof window !== "undefined"
                        ? localStorage.lang === "ar"
                          ? product.nameAr
                          : product.nameEn
                        : null}
                    </h1>
                    <h1 className="text-xs text-gray-500">
                      {t("code")} : {product.code}
                    </h1>
                  </div>
                </td>

                <td onClick={() => openForm(product.itemId)}>
                  <div className="  text-sm text-gray-500 font-semibold mx-1">
                    <h1>
                      {typeof window !== "undefined"
                        ? localStorage.lang === "ar"
                          ? product.itemCategory.nameAr
                          : product.itemCategory.nameEn
                        : null}
                    </h1>
                  </div>
                </td>
                <td
                  className="text-sm font-bold"
                  onClick={() => openForm(product.itemId)}
                >
                  {product.price.toLocaleString("en-US")}
                </td>
                {/* <td></td> */}
                <td
                  className="text-sm font-bold text-gray-600"
                  onClick={() => openForm(product.itemId)}
                >
                  {product.oldPrice
                    ? product.oldPrice.toLocaleString("en-US") +
                      " " +
                      t("currency")
                    : "--"}
                </td>
                <td>
                  <button
                    className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400"
                    onClick={() => {
                      deleteProduct(product);
                    }}
                  >
                    <MdDelete />
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          
            <tr className="h-5 text-center">
              <td colSpan="6">
                <button
                  className=" text-red-600 px-5 py-1   my-3 rounded-lg"
                  onClick={() => {
                    pageNum.current += 1;
                    getAllProducts();
                  }}
                >
                  <MdOutlineDownloading className="text-4xl" />
                </button>
              </td>
            </tr>
       
          </tbody>
        </table>
      </div>
    </div>
  );
}
