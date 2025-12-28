"use client";
import { MdDelete, MdStar } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { GoStarFill } from "react-icons/go";
import { postRequest } from "../../../../utils/requestsUtils.js";
import { useIdContext } from "../../../../context/idContext"; 

export default function ProductsTable() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const productTableRef = useRef()
  let [itemCategory, setItemCategory] = useState([]);
  // const {selectedProductData, setSelectedProductData } = useIdContext();
  const { setSelectedId } = useIdContext();
  const { setSelectedNameEn } = useIdContext();
  const { setSelectedNameAr } = useIdContext();
  const { setSelectedCode } = useIdContext();
  const { setSelectedPrice } = useIdContext();
  const { setSelectedDescription } = useIdContext();
  const { setSelectedVisible } = useIdContext();
  const { setSelectedCategory } = useIdContext();
  const { setSelectedFeatured } = useIdContext();
    const [ product, setProduct ] = useState({
      nameEn: "",
      nameAr: "",
      category: Number,
      price: Number,
      description: "",
      code: "",
    });
  
  const getAllProducts = useCallback( async () => {
    try {
      const response = await postRequest("/api/public/items/search", {
        page: 0,
        size: 10,
      });
      const resProducts = response.data || [];
      setProducts(resProducts);
// pagination()
//       console.log("Categories after set:", resProducts);
    } catch (error) {
      console.log(error);
    }
  },[]);

  const pagination=()=>{
// console.log(productTableRef.current)
  }

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
   
    // console.log(product)
    setSelectedId(product.itemId);
    setSelectedNameEn(product.nameEn);
    setSelectedNameAr(product.nameAr);
    setSelectedCode(product.code);
    setSelectedPrice(product.price);
    setSelectedDescription(product.description);
    setSelectedVisible(product.active);
    setSelectedCategory(product.itemCategoryId);
    setSelectedFeatured(product.favorite);
    // setSelectedPhoto(product.imageURL);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <div className="bg-white h-[50px] border rounded-lg border-1  w-full mt-5 flex justify-end p-5 items-center">
        <button
          className="p-2 text-white xs:text-xs md:text-sm rounded-md bg-blue-500 text-center flex items-center justify-center gap-2"
          onClick={() => {
            let form = document.querySelector("#add-product-form");
            form.classList.remove("hidden");
            form.classList.add("flex");
          }}
        >
          <span>
            <FaPlus />
          </span>
          <h1>{t("add_new_product")}</h1>
        </button>
      </div>

      <div ref={productTableRef} className=" rounded-xl w-full h-screen border  mt-3 overflow-hidden xs:overflow-x-scroll lg:overflow-auto overflow-y-scroll ">
        <table   className=" xs:w-[220%] lg:w-full    ">
          <thead className="bg-[#F9FAFB] text-xs    text-justify">
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
                  <td >
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className={
                          "flex items-center justify-center gap-3 text-sm " +
                          (product.active ? "text-green-600" : "text-gray-600")
                        }
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
                      >
                        <GoStarFill />
                      </button>
                    </div>
                  </td>
                  <td className="flex items-center gap-4"
                  onClick={() => itemProductId(product)}>
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={45}
                      height={45}
                      className="rounded-xl border my-1 p-1"
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
                      <h1> {localStorage.lang === "ar"
                          ? product.nameAr
                          : product.nameEn}</h1>
                    </div>
                  </td>
                  <td className="text-sm font-bold"
                  
                  onClick={() => itemProductId(product)}>{product.price} EG</td>
                  {/* <td></td> */}
                  <td>
                    <button className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400">
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
