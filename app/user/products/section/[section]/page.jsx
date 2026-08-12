"use client";
import { useSearshInputContext } from "../../../../../context/searshInputContext";
import { useCallback, useEffect, useRef, useState } from "react";
import CategoriesSideManu from "../../../components/CategoriseSideMenu";
import { getRequest, postRequest } from "../../../../../utils/requestsUtils";
import { useRouter } from "next/navigation";
import { useIdContext } from "../../../../../context/idContext";
import ProductCard from "../../../components/ProductCard";
import { useLanguage } from "../../../../../context/LanguageContext";
import { BsList, BsStarFill, BsClockHistory, BsFire } from "react-icons/bs";
import Select from "react-select";
import { MdOutlineDownloading } from "react-icons/md";

export default function ProductsBySection({ params }) {
  const { section } = params;

  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ascending, setAscending] = useState();
  const [sortBy, setSortBy] = useState();
  const [hasMore, setHasMore] = useState(true);
  const pageNum = useRef(0);

  const sortOptions = [
    { value: "true,price", label: t("priceLowToHigh") },
    { value: "false,price", label: t("priceHighToLow") },
  ];

  const currentValue = sortBy
    ? sortOptions.find((option) => option.value === `${ascending},${sortBy}`)
    : null;

  const sectionTitle =
    section === "featured"
      ? t("featured_products")
      : section === "recentWatched"
        ? t("recentWatched")
        : t("New_arrivals");

  const sectionIcon =
    section === "featured"
      ? <BsStarFill className="text-red-600" />
      : section === "recentWatched"
        ? <BsClockHistory className="text-red-600" />
        : <BsFire className="text-red-600" />;

  const getAllProducts = async (loading) => {
    try {
      setLoading(loading);

      const response = 
      section === "featured"?
      await postRequest(
        "/api/public/items/search",
        {
         
          isFavorite: true,
          sortBy: sortBy || null,
          ascending: ascending || true,
        },
        "",
      )
      :  section === "recentWatched"?
      await getRequest(
        "/api/users/recentWatchedItems",
        {
          sortBy: sortBy || null,
          ascending: ascending || true,
        },
        "",
      ):
 await getRequest(
        "/api/public/items/recent",
        {
          sortBy: sortBy || null,
          ascending: ascending || true,
        },
        "",
      )
      setProducts(response.data)

       
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts(true);
  }, [sortBy, ascending]);

  return (
    <div className=" w-full ">
      <div className="flex flex-col items-start justify-start  ">


        <div className="p-3 w-full ">
          <div className="mb-4">
            <h1 className="flex items-center font-semibold gap-2 xs:text-base md:text-lg mb-1">
              {sectionIcon}
              {sectionTitle}
            </h1>
            <hr className="w-24 h-1 border-0 rounded-full bg-gradient-to-l from-red-200 via-red-400 to-red-200" />
          </div>
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
                className="h-full w-[200px] z-50"
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
            <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-5 ">
              {[...Array(6)].map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="h-[280px] bg-gray-100 rounded animate-pulse w-full"
                ></div>
              ))}
            </div>
          ) : products.length != 0 ? (
            <div>
              <div
                className={`grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 p-2 gap-5`}
              >
                {section === "featured" || section === "newProducts"? products.map((product, index) => (
                  <div key={index}>
                    <ProductCard productInfo={product} />
                  </div>
                ))
              : 
              products.map((product, index) => (
                  <div key={index}>
                    <ProductCard productInfo={product.item} />
                  </div>
                ))}
              </div>
              <div
                className={`w-full  justify-center items-center ${products.length < 10 ? "hidden" : "flex"}`}
              >
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
                  ) : (
                    <span className="text-gray-500 my-3">{t("no_more_products")}</span>
                  )
                }

              </div>
            </div>
          ) : (
            <div className="h-screen w-full">
              <div className="h-10 w-full bg-white flex justify-center py-2  ">
                {t("no_data")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
