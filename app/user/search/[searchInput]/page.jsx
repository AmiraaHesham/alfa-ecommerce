"use client";

import { useSearshInputContext } from "../../../../context/searshInputContext";
import { useCallback, useEffect, useRef, useState } from "react";
import CategoriesSideManu from "../../components/CategoriseSideMenu";
import { postRequest } from "../../../../utils/requestsUtils";
import { useRouter } from "next/navigation";
import { useIdContext } from "../../../../context/idContext";
import ProductCard from "../../components/ProductCard";
import { useLanguage } from "../../../../context/LanguageContext";
import { BsList } from "react-icons/bs";
import Select from "react-select";
import { MdOutlineDownloading } from "react-icons/md";

export default function Searchpage({params}) {
    const { searchInput } = params; 
  const [hasMore, setHasMore] = useState(true);

  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ascending, setAscending] = useState();
  const [sortBy, setSortBy] = useState();
  const pageNum = useRef(0);

  const sortOptions = [
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
          size: 10,
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
         const resProducts = response.data || [];
      if (pageNum.current === 0) {
        setProducts(resProducts);
      } else setProducts((prev) => [...prev, ...resProducts]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts(true);
  }, [searchInput, sortBy, ascending]);
  return (
    <div className="mb-20 ">
      <div className="flex flex-col items-start justify-end gap-5 ">

        <div
          className={`p-5 w-full`}
        >
          <div className="flex gap-5 ">
            <div className="bg-white flex  gap-4 items-center  border rounded-md  px-3 h-10  mb-5">
              <span>{t("sortBy")}:</span>
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
                className="h-full w-[200px]"
                placeholder={t("select")}
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
                    fontSize: "18px",
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
          </div>

          {loading ? (
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-1 gap-5 ">
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
              className={`grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 p-2 gap-4`}
            >
              {products.map((product, index) => (
                <div key={index}>
                  <ProductCard productInfo={product} />
                </div>
              ))}
            </div>
            <div className={`w-full  justify-center items-center ${products.length < 10 ? "hidden" : "flex"}`}>
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
