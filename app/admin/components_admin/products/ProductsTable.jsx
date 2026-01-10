"use client";
import { MdDelete, MdStar } from "react-icons/md";
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

export default function ProductsTable() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const productTableRef = useRef();

  const { refreshKey } = useRefresh();
  const { triggerRefresh } = useRefresh();
  const [searchInput, setsearchInput] = useState();
  const { setSelectedProductId } = useIdContext();
  const searchInputRef = useRef();
  const getAllProducts = async () => {
    try {
      console.log(searchInputRef.current.value);
      const response = await postRequest("/api/public/items/search", {
        page: 0,
        size: 10,
        searchText: searchInputRef.current.value,
      },'');
      const resProducts = response.data || [];
      setProducts(resProducts);
      // pagination()
      //       console.log("Categories after set:", resProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const productFavorite = async (productId) => {
    await postRequest(`/api/admin/items/${productId}/favorite`, "");
    triggerRefresh();
  };

  const productUnfavorite = async (productId) => {
    await postRequest(`/api/admin/items/${productId}/unfavorite`, "");
    triggerRefresh();
  };
  const productActive = async (productId) => {
    await postRequest(`/api/admin/items/${productId}/activate`, "");
    triggerRefresh();
  };

  const productDeaactive = async (productId) => {
    await postRequest(`/api/admin/items/${productId}/deactivate`, "");
    triggerRefresh();
  };

  const pagination = () => {
    // console.log(productTableRef.current)
  };

  const itemProductId = (product) => {
    let form = document.querySelector("#add-product-form");
    let nameFormProduct = document.querySelector("#nameFormProduct");
    let btn_saveProduct = document.querySelector("#btn-saveProduct");
    let btn_editProduct = document.querySelector("#btn-editProduct");
    btn_editProduct.classList.remove("hidden");
    btn_saveProduct.classList.add("hidden");
    nameFormProduct.innerHTML = "Edit Product";
    form.classList.remove("hidden");
    form.classList.add("flex");
    setSelectedProductId(product.itemId);
  };
  const deleteProduct = async (product) => {
    try {
      await deleteRequest(`/api/admin/items/${product.itemId}`);
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [refreshKey]);
  return (
    <div className="w-full">
      <div className="bg-white  border rounded-lg border-1  w-full mt-5 flex flex-row justify-between  p-3 items-center  xs:gap-4">
        <div className="flex items-center justify-between border px-1 rounded-md w-[300px] bg-gray-100">
          <input
            type="text"
            placeholder={t('search')}
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
            className="text-lg bg-blue-300 hover:bg-blue-500 p-1 text-white  rounded-md"
            onClick={getAllProducts}
          >
            <IoMdSearch />
          </button>
        </div>
        <button
          className="p-2 text-white xs:text-xs md:text-sm rounded-md bg-blue-500 text-center flex items-center justify-center gap-2"
          onClick={() => {
            let form = document.querySelector("#add-product-form");
            form.classList.remove("hidden");
            form.classList.add("flex");
            let nameFormProduct = document.querySelector("#nameFormProduct");
            let btn_saveProduct = document.querySelector("#btn-saveProduct");
            let btn_editProduct = document.querySelector("#btn-editProduct");
            btn_editProduct.classList.add("hidden");
            btn_saveProduct.classList.remove("hidden");
            nameFormProduct.innerHTML = "Add Product";
            setSelectedProductId(null)
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
        className=" rounded-xl w-full border  h-screen mt-3 overflow-hidden xs:overflow-x-scroll lg:overflow-auto overflow-y-scroll "
      >
        <table className=" xs:w-[200%] lg:w-full">
          <thead className="bg-[#F9FAFB] text-xs text-justify">
            <tr className=" text-gray-500 h-12  ">
              <th className="w-[10%]"></th>
              <th className="w-[30%]">{t("PRODUCT_NAME")}</th>
              <th className="w-[20%]">{t("product_category")}</th>
              <th className="w-[20%]">{t("price")}</th>
              {/* <th></th> */}

              <th className="w-[20%]"></th>
            </tr>
          </thead>
          <tbody className="bg-white text-black text-lg w-full ">
            {products.map((product, index) => {
              return (
                <tr key={index} className=" border hover:bg-gray-100  ">
                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className={
                          "flex items-center justify-center gap-3 text-sm " +
                          (product.active ? "text-green-600" : "text-gray-600")
                        }
                        onClick={() => {
                          if (product.active === false) {
                            productActive(product.itemId);
                          } else {
                            productDeaactive(product.itemId);
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
                            await productFavorite(product.itemId);
                          } else {
                            await productUnfavorite(product.itemId);
                          }
                        }}
                      >
                        <GoStarFill />
                      </button>
                    </div>
                  </td>
                  <td
                    className="flex items-center gap-4"
                    onClick={() => itemProductId(product)}
                  >
                    <Image
                      alt=""
                      src={`${
                        process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                          product.mainImageURL || ""
                      }`}
                      width={40}
                      height={40}
                      className="rounded-xl xs:w-10 xs:h-10 md:w-14 md:h-12  border my-1 p-1"
                    />
                    <div>
                      <h1 className="text-sm font-semibold">
                        {localStorage.lang === "ar"
                          ? product.nameAr
                          : product.nameEn}
                      </h1>
                      <h1 className="text-xs text-gray-500">
                        {t("code")} : {product.code}
                      </h1>
                    </div>
                  </td>

                  <td onClick={() => itemProductId(product)}>
                    <div className="  text-sm text-gray-500 font-semibold mx-1">
                      <h1>
                        {localStorage.lang === "ar"
                          ? product.itemCategory.nameAr
                          : product.itemCategory.nameEn}
                      </h1>
                    </div>
                  </td>
                  <td
                    className="text-sm font-bold"
                    onClick={() => itemProductId(product)}
                  >
                    {product.price}
                  </td>
                  {/* <td></td> */}
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
