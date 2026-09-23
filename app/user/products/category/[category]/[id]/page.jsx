"use client";
import { useSearshInputContext } from "../../../../../../context/searshInputContext";
import { useEffect, useState } from "react";
import CategoriesSideManu from "../../../../components/CategoriseSideMenu";
import { postRequest } from "../../../../../../utils/requestsUtils";
import { useRouter } from "next/navigation";
import { useIdContext } from "../../../../../../context/idContext";
import ProductCard from "../../../../components/ProductCard";
import { useLanguage } from "../../../../../../context/LanguageContext";
import { BsList } from "react-icons/bs";
import Select from "react-select";
import Pagination from "../../../../search/[searchInput]/components/Pagination";

export default function ProductsByCategory({ params }) {
  const { category, id } = params;

  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ascending, setAscending] = useState();
  const [sortBy, setSortBy] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const PAGE_SIZE = 12;

  const sortOptions = [
    { value: "true,price", label: t("priceLowToHigh") },
    { value: "false,price", label: t("priceHighToLow") },
  ];

  const currentValue = sortBy
    ? sortOptions.find((option) => option.value === `${ascending},${sortBy}`)
    : null;

  const normalizePage = (payload, fallbackSize) => {
    const data = payload?.data ?? payload ?? {};
    const content = Array.isArray(data)
      ? data
      : Array.isArray(data?.content)
        ? data.content
        : Array.isArray(data?.items)
          ? data.items
          : [];
    const size = Number(data?.size ?? fallbackSize) || fallbackSize;
    const totalElements =
      Number(
        data?.totalElements ??
        data?.totalItems ??
        data?.totalCount ??
        data?.total ??
        0,
      ) || 0;
    const totalPages =
      Number(data?.totalPages ?? data?.totalPage ?? 0) ||
      (content.length > 0 ? Math.max(1, Math.ceil(totalElements / size)) : 0);
    const number =
      Number(data?.number ?? data?.pageNumber ?? data?.currentPage ?? 0) || 0;
    return { content, number, size, totalElements, totalPages };
  };

  const getAllProducts = async (loading, requestedPage) => {
    try {
      setLoading(loading);

      const page = requestedPage ?? currentPage;
      const response = await postRequest(
        "/api/public/items/search",
        {
          page,
          size: PAGE_SIZE,
          categoryId: id,
          sortBy: sortBy || null,
          ascending: ascending || true,
        },
        "",
      );

      const normalized = normalizePage(response, PAGE_SIZE);
      setProducts(normalized.content);
      setCurrentPage(normalized.number);
      setTotalPages(normalized.totalPages);
      setTotalElements(normalized.totalElements);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setCurrentPage(0);
    getAllProducts(true, 0);
  }, [id, sortBy, ascending]);

  useEffect(() => {
    if (currentPage === 0) return;
    getAllProducts(true, currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page === currentPage || page < 0 || page >= totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className=" w-full ">
      <div className="flex flex-col items-start justify-start  ">
        <CategoriesSideManu category={category} />

        <div className="p-3 w-full ">
          <div className="flex gap-5 ">
            <div className="bg-white flex  gap-4 items-center  border rounded-full  px-3 h-10  mb-5">
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
                className="h-full w-[200px] rounded-full z-50"
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
                {products.map((product, index) => (
                  <div key={index}>
                    <ProductCard productInfo={product} />
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
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
