"use client";

import { useSearshInputContext } from "../../../context/searshInputContext";
import { useCallback, useEffect, useState } from "react";
import CategoriesSideManu from "../components/CategoriseSideMenu";
import { postRequest } from "../../../utils/requestsUtils";
import { useRouter } from "next/navigation";
import { useIdContext } from "../../../context/idContext";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../../../context/LanguageContext";
import { BsList } from "react-icons/bs";

export default function Searchpage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ascending, setAscending] = useState();
  const [sortBy, setSortBy] = useState();

  const { selectedSearchInput } = useSearshInputContext();
  const { selectedCategoryId } = useIdContext();
  const getAllProducts = useCallback(async () => {
    try {
      const response = await postRequest(
        "/api/public/items/search",
        {
          page: 0,
          size: 10,
          searchText: selectedSearchInput,
          categoryId: selectedSearchInput ? null : selectedCategoryId,
          sortBy: sortBy || null,
          ascending: ascending || true,
        },
        ""
      );
      setProducts(response.data);
      // console.log(response.data);
      // console.log(categoryId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }, [selectedCategoryId, selectedSearchInput, sortBy, ascending]);

  useEffect(() => {
    getAllProducts(ascending, sortBy);
  }, [
    selectedCategoryId,
    selectedCategoryId,
    sortBy,
    ascending,
    getAllProducts,
  ]);
  return (
    <div className=" ">
      <div className="flex items-start justify-end gap-5 ">
       {selectedSearchInput ? '':   <CategoriesSideManu />}

        <div className={` xs:w-full p-5  ${selectedSearchInput ? "w-full" : "md:w-[80%]"} `}>
          <div className="flex gap-5 ">
            <span
              className="xs:flex md:hidden p-2 cursor-pointer gap-2 bg-red-600 h-10 text-white rounded-md items-center"
              onClick={() => {
                const catego_sideMenu =
                  document.querySelector("#catego-sideMenu");
                catego_sideMenu.classList.remove("xs:hidden");
              }}
            >
              <BsList className="text-2xl font-bold" />
              {t("categories")}
            </span>
            <div className="bg-white flex  gap-4 items-center w-[330px] border rounded-md  px-3 h-10  mb-5">
              <h1 className="text-sm text-gray-500"> {t("sortBy")}: </h1>
              <select
                className=" h-full w-[70%] bg-none  font-semibold  rounded-md outline-none "
                onChange={(e) => {
                  setAscending(e.target.value.split(",")[0]);
                  setSortBy(e.target.value.split(",")[1]);
                }}
              >
                <option
                  value=""
                  className="bg-red-700 rounded-md text-lg text-white font-semibold"
                >
                  {t("all")}
                </option>
                <option
                  value="true,price"
                  className="bg-red-700 rounded-md text-lg text-white font-semibold"
                >
                  {t("priceLowToHigh")}{" "}
                </option>
                <option
                  value="false,price"
                  className="bg-red-700 rounded-md text-lg text-white font-semibold"
                >
                  {t("priceHighToLow")}{" "}
                </option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-5 ">
              {[...Array(8)].map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="h-[320px] bg-gray-100 rounded animate-pulse w-full"
                ></div>
              ))}
            </div>
          ) : products.length != 0 ? (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3  xs:grid-cols-2 gap-5">
              {products.map((product, index) => (
                <div key={index}>
                  <ProductCard productInfo={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-10 w-full bg-white flex justify-center py-2  ">
              {t("no_data")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
