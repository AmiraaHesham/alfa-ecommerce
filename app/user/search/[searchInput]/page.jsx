"use client";

import { useSearshInputContext } from "../../../../context/searshInputContext";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import CategoriesSideManu from "../../components/CategoriseSideMenu";
import { postRequest } from "../../../../utils/requestsUtils";
import { useRouter } from "next/navigation";
import { useIdContext } from "../../../../context/idContext";
import ProductCard from "../../components/ProductCard";
import { useLanguage } from "../../../../context/LanguageContext";
import { BsList } from "react-icons/bs";
import Select from "react-select";
import { MdOutlineDownloading } from "react-icons/md";
import { LuColumns2, LuColumns3, LuColumns4 } from "react-icons/lu";
import Filter from "./components/filter"
export default function Searchpage({params}) {
    const { searchInput } = params; 
  const [hasMore, setHasMore] = useState(true);

  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ascending, setAscending] = useState();
  const [sortBy, setSortBy] = useState();
  const pageNum = useRef(0);

  const showOptions = [9, 12, 18, 24];
  const [showCount, setShowCount] = useState(12);
  const [gridColumns, setGridColumns] = useState(3);

  const gridOptions = [
    { value: 2, icon: LuColumns2 },
    { value: 3, icon: LuColumns3 },
    { value: 4, icon: LuColumns4 },
  ];

  const gridLayoutClasses = {
    2: "grid grid-cols-2",
    3: "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3",
    4: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  const sortOptions = [
    { value: "", label: t("relevance") },
    { value: "true,price", label: t("priceLowToHigh") },
    { value: "false,price", label: t("priceHighToLow") },
  ];

  const currentValue = sortBy
    ? sortOptions.find((option) => option.value === `${ascending},${sortBy}`)
    : null;

  // const { selectedSearchInput } = useSearshInputContext();
  const getAllProducts = async (loading) => {
    try {
      setLoading(loading);

      const response = await postRequest(
        "/api/public/items/search",
        {
          page: pageNum.current,
          size: showCount,
          searchText: searchInput,
          sortBy: sortBy || null,
          ascending: ascending || true,
        },
        "",
      );
    if(response.data.length === 0){
        setHasMore(false);
      }
      else{
         const resProducts = response.data.content || [];
      if (pageNum.current === 0) {
        setProducts(resProducts);
      } else setProducts((prev) => [...prev, ...resProducts]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    pageNum.current = 0;
    getAllProducts(true);
  }, [searchInput, sortBy, ascending, showCount]);
  return (
    <div className="mb-20 flex w-full">
      <Filter/>
      <div className="flex flex-col items-start justify-end gap-5 ">

        <div
          className={`p-5 w-full`}
        >
          <span className="text-xl font-bold ">{t("Search_results")}: "{searchInput}" </span>
          <div className="flex flex-wrap items-center justify-between gap-3 my-5">
            <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white flex  gap-4 items-center text-xs z-50 border rounded-full  px-3 h-10">
              {/* <span>{t("sortBy")}:</span> */}
              <Select
                isSearchable={false}
                options={sortOptions}
                value={currentValue}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setAscending(selectedOption.value.split(",")[0]);
                    setSortBy(selectedOption.value.split(",")[1]);
                  } else {
                    setAscending(undefined);
                    setSortBy(undefined);
                  }
                }}
                className="h-full w-[150px]"
                placeholder={t("relevance")}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "none",
                    boxShadow: "none",
                    background: "transparent",
                    fontWeight: "600",
                    height: "100%",
                    width: "100%",
                  }),
                  option: (provided) => ({
                    ...provided,
                    // backgroundColor: '#b91c1c',
                    color: "white",
                    fontSize: "5px",
                    fontWeight: "600",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "#374151",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#dc2626"
                      : state.isFocused
                        ? "#fee2e2"
                        : "#ffffff",
                    color: state.isSelected ? "#ffffff" : "#374151",
                    cursor: "pointer",
                    padding: "10px",
                    "&:hover": {
                      backgroundColor: state.isSelected ? "#dc2626" : "#fee2e2",
                    },
                  }),
                }}
              />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span className="font-semibold text-gray-900">{t("show")}:</span>
              {showOptions.map((count, i) => (
                <Fragment key={count}>
                  {i > 0 && <span className="text-gray-300">/</span>}
                  <button
                    type="button"
                    onClick={() => setShowCount(count)}
                    className={`px-1 transition-colors ${
                      showCount === count
                        ? "font-bold text-gray-900"
                        : "font-medium text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {count}
                  </button>
                </Fragment>
              ))}
            </div>
            </div>
            <div className="flex items-center gap-1">
              {gridOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGridColumns(option.value)}
                  className={`p-2 rounded-md transition-colors ${
                    gridColumns === option.value
                      ? "text-gray-900 bg-gray-200"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <option.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className={`${gridLayoutClasses[gridColumns]} gap-5 `}>
              {[...Array(8)].map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="h-[320px] bg-gray-100 rounded animate-pulse w-full"
                ></div>
              ))}
            </div>
          ) : products.length != 0 ? (
            <div>
                <div
              className={`${gridLayoutClasses[gridColumns]} p-2 gap-4`}
            >
              {products.map((product, index) => (
                <div key={index}>
                  <ProductCard productInfo={product} />
                </div>
              ))}
            </div>
            <div className={`w-full  justify-center items-center ${products.length < showCount ? "hidden" : "flex"}`}>
              {
                  hasMore ? (
                     <button
                  className=" text-red-600 px-5 py-1 shadow-md  my-3 rounded-lg"
                  onClick={() => {
                    pageNum.current += 1;
                    getAllProducts(false);
                  }}
                >
                  <MdOutlineDownloading className="text-4xl" />
                </button>
                  ):(
                    <span className="text-gray-500 my-3">{t("no_more_products")}</span>
                  )
                }
            </div>
            
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
