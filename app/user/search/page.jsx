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
import Select from 'react-select';

export default function Searchpage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ascending, setAscending] = useState();
  const [sortBy, setSortBy] = useState();

  const sortOptions = [
    { value: "true,price", label: t("priceLowToHigh") },
    { value: "false,price", label: t("priceHighToLow") }
  ];

  const currentValue = sortBy ? sortOptions.find(option => option.value === `${ascending},${sortBy}`) : null;

  const { selectedSearchInput } = useSearshInputContext();
  const { selectedCategoryId } = useIdContext();
  const getAllProducts =async () => {
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

  }
  useEffect(() => {
    getAllProducts(ascending, sortBy);
  }, [
    selectedCategoryId,
    selectedCategoryId,
    sortBy,
    ascending,
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
            <div className="bg-white flex  gap-4 items-center  border rounded-md  px-3 h-10  mb-5">
              <Select
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
                placeholder={t("sortBy")}
                className="h-full w-[200px]"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    fontWeight: '600',
                    height: '100%',
                    width: '100%',
                  }),
                  option: (provided) => ({
                    ...provided,
                    // backgroundColor: '#b91c1c',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
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
               {/* styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#F9FAFB",
                    borderColor: "#e5e7eb",
                    border: "none",
                    // borderRadius: "0.375rem",
                    cursor: "pointer",
                    outline: "none",
                    "&:hover": {
                      borderColor: "#e5e7eb",
                      
                    },
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
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#ffffff",
                    borderRadius: "0.375rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }),
                 
                }} */}
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
            <div className={`grid ${selectedSearchInput ? "xl:grid-cols-5 lg:grid-cols-4 " : "xl:grid-cols-4 lg:grid-cols-3"}  xs:grid-cols-2 gap-5`}>
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
