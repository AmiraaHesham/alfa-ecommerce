"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../../../../context/LanguageContext";
import { MdFilterAlt } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

export const EMPTY_FILTERS = {
  brand: "",
  minPrice: "",
  maxPrice: "",
  rating: "",
  year: "",
};

const RATING_OPTIONS = [5, 4, 3, 2, 1];

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const sanitizeNumber = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const cleaned = String(value).replace(/[^\d.]/g, "");
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed) || parsed < 0) return "";
  return String(parsed);
};

const sanitizeYear = (value) => {
  if (value === "" || value === null || value === undefined) return "";
  const cleaned = String(value).replace(/[^\d]/g, "").slice(0, 4);
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed) || parsed < 0) return "";
  return String(parsed);
};

export default function Filter({
  priceBounds,
  brands = [],
  years = [],
  appliedFilters,
  onFilter,
  onClear,
  drawerOpen,
  onDrawerClose,
}) {
  const { t, locale } = useLanguage();
  const isRTL = locale === "ar";

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [brandQuery, setBrandQuery] = useState("");
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  // sync the draft inputs whenever the applied filters change (apply / clear / new search)
  useEffect(() => {
    const next = appliedFilters
      ? {
          brand: appliedFilters.brand ?? "",
          minPrice:
            appliedFilters.minPrice === null || appliedFilters.minPrice === undefined
              ? ""
              : String(appliedFilters.minPrice),
          maxPrice:
            appliedFilters.maxPrice === null || appliedFilters.maxPrice === undefined
              ? ""
              : String(appliedFilters.maxPrice),
          rating:
            appliedFilters.rating === null || appliedFilters.rating === undefined
              ? ""
              : String(appliedFilters.rating),
          year:
            appliedFilters.year === null || appliedFilters.year === undefined
              ? ""
              : String(appliedFilters.year),
        }
      : EMPTY_FILTERS;
    setFilters(next);
    setBrandQuery(next.brand);
    setShowBrandDropdown(false);
  }, [appliedFilters]);

  // close the drawer on Escape + lock body scroll while it is open
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleKey = (event) => {
      if (event.key === "Escape") onDrawerClose?.();
    };

    if (drawerOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", handleKey);
      };
    }
  }, [drawerOpen, onDrawerClose]);

  const suggestions = useMemo(() => {
    const query = brandQuery.trim().toLowerCase();
    const matches = query
      ? brands.filter((brand) => brand.toLowerCase().includes(query))
      : brands;
    return matches.slice(0, 8);
  }, [brands, brandQuery]);

  const handleSelectBrand = useCallback((brand) => {
    setFilters((prev) => ({ ...prev, brand }));
    setBrandQuery(brand);
    setShowBrandDropdown(false);
  }, []);

  const handleClearBrand = useCallback(() => {
    setFilters((prev) => ({ ...prev, brand: "" }));
    setBrandQuery("");
    setShowBrandDropdown(false);
  }, []);

  const minPrice = toNumber(filters.minPrice);
  const maxPrice = toNumber(filters.maxPrice);
  const priceRangeInvalid = minPrice !== null && maxPrice !== null && minPrice > maxPrice;

  const handleApply = useCallback(() => {
    if (priceRangeInvalid) return;
    const year = toNumber(filters.year);
    onFilter?.({
      brand: filters.brand.trim() || null,
      minPrice,
      maxPrice,
      rating: toNumber(filters.rating),
      year,
    });
    onDrawerClose?.();
  }, [priceRangeInvalid, filters, minPrice, maxPrice, onFilter, onDrawerClose]);

  const handleReset = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setBrandQuery("");
    setShowBrandDropdown(false);
    onClear?.();
    onDrawerClose?.();
  }, [onClear, onDrawerClose]);

  const boundMin = priceBounds?.min ?? 0;
  const boundMax = priceBounds?.max ?? 0;

  const desktopHeader = (
    <div className="flex items-center gap-2">
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-600 shrink-0">
        <MdFilterAlt className="w-5 h-5" />
      </span>
      <h2 className="text-lg font-bold text-gray-800">{t("filters")}</h2>
    </div>
  );

  const filterSections = (
    <div className="min-w-0">
      {/* Price filter section */}
      <div className="text-start">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          {t("Price")}
        </h3>

        <div className="flex items-center gap-2 w-full min-w-0">
          <div className="flex-1 min-w-0">
            <label
              htmlFor="filter-min-price"
              className="block text-xs text-gray-500 mb-1"
            >
              {t("from")}
            </label>
            <input
              id="filter-min-price"
              type="number"
              inputMode="numeric"
              min={boundMin >= 0 ? Math.floor(boundMin) : 0}
              step="any"
              value={filters.minPrice}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice: sanitizeNumber(event.target.value),
                }))
              }
              placeholder={String(Math.floor(boundMin) || 0)}
              className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 [appearance:textfield]"
            />
          </div>

          <span className="text-gray-400 text-xs shrink-0 mt-5">—</span>

          <div className="flex-1 min-w-0">
            <label
              htmlFor="filter-max-price"
              className="block text-xs text-gray-500 mb-1"
            >
              {t("to")}
            </label>
            <input
              id="filter-max-price"
              type="number"
              inputMode="numeric"
              min={0}
              step="any"
              value={filters.maxPrice}
              onChange={(event) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: sanitizeNumber(event.target.value),
                }))
              }
              placeholder={String(Math.ceil(boundMax) || 0)}
              className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 [appearance:textfield]"
            />
          </div>
        </div>

        {priceRangeInvalid && (
          <p role="alert" className="mt-2 text-xs font-medium text-red-600">
            {t("price_range_error")}
          </p>
        )}
      </div>

      <div className="h-px w-full bg-gray-100 my-5" />

      {/* Brand filter section */}
      <div className="relative text-start">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          {t("brand")}
        </h3>
        <div className="relative min-w-0">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 start-3" />
          <input
            id="filter-brand"
            type="text"
            value={brandQuery}
            placeholder={t("search_brand")}
            autoComplete="off"
            onChange={(event) => {
              setBrandQuery(event.target.value);
              setFilters((prev) => ({ ...prev, brand: event.target.value }));
              setShowBrandDropdown(true);
            }}
            onFocus={() => setShowBrandDropdown(true)}
            onBlur={() => setTimeout(() => setShowBrandDropdown(false), 150)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && suggestions.length > 0) {
                event.preventDefault();
                handleSelectBrand(suggestions[0]);
              }
              if (event.key === "Escape") {
                setShowBrandDropdown(false);
                event.currentTarget.blur();
              }
            }}
            className="w-full h-10 pe-9 ps-9 rounded-xl border border-gray-200 bg-white focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 text-sm text-gray-800 placeholder:text-gray-400"
          />
          {brandQuery && (
            <button
              type="button"
              onClick={handleClearBrand}
              className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 hover:text-gray-600"
              aria-label={t("clear")}
            >
              <IoClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {showBrandDropdown && suggestions.length > 0 && (
          <div className="absolute z-30 mt-2 w-full min-w-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {suggestions.map((brand) => (
              <button
                key={brand}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelectBrand(brand)}
                className={`w-full text-start px-4 py-2.5 text-sm transition-colors ${
                  filters.brand === brand
                    ? "bg-red-50 text-red-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-px w-full bg-gray-100 my-5" />

      {/* Rating filter section */}
      <div className="text-start">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          {t("rating")}
        </h3>

        <button
          type="button"
          onClick={() => setFilters((prev) => ({ ...prev, rating: "" }))}
          className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
            filters.rating === ""
              ? "bg-red-50 text-red-600 font-semibold"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          {t("all_ratings")}
        </button>

        <div className="mt-2 flex flex-col gap-1">
          {RATING_OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  rating: String(prev.rating) === String(value) ? "" : String(value),
                }))
              }
              className={`w-full text-start px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors ${
                String(filters.rating) === String(value)
                  ? "bg-red-50 text-red-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span
                className="flex items-center gap-0.5 shrink-0"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {Array.from({ length: value }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={`w-4 h-4 ${
                      String(filters.rating) === String(value)
                        ? "text-red-500"
                        : "text-amber-400"
                    }`}
                  />
                ))}
              </span>
              {value < 5 && (
                <span className="text-xs text-gray-400">{t("and_up")}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gray-100 my-5" />

      {/* Manufacturing year filter section */}
      <div className="text-start">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          {t("releaseYear")}
        </h3>
        <input
          id="filter-year"
          type="number"
          inputMode="numeric"
          min={1900}
          step="1"
          list="filter-year-options"
          value={filters.year}
          onChange={(event) =>
            setFilters((prev) => ({
              ...prev,
              year: sanitizeYear(event.target.value),
            }))
          }
          placeholder={t("select_year")}
          className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 [appearance:textfield]"
        />
        <datalist id="filter-year-options">
          {years.map((year) => (
            <option key={year} value={year} />
          ))}
        </datalist>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex flex-col gap-2 min-w-0">
        <button
          type="button"
          onClick={handleApply}
          disabled={priceRangeInvalid}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shadow-sm"
        >
          {t("apply_filter")}
          {isRTL ? (
            <FaArrowLeftLong className="w-4 h-4" />
          ) : (
            <FaArrowRightLong className="w-4 h-4" />
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-red-400 hover:text-red-600 text-gray-700 text-sm font-semibold transition-colors"
        >
          <IoClose className="w-4 h-4" />
          {t("clear_filters")}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop / tablet: existing sidebar */}
      <aside className="hidden md:block w-full md:w-[400px] shrink-0">
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 min-w-0">
          {desktopHeader}
          {filterSections}
        </div>
      </aside>

      {/* XS / Mobile: filters as a side drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          drawerOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!drawerOpen}
      >
        {/* Dark overlay */}
        <div
          onClick={onDrawerClose}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Drawer */}
        <aside
          role="dialog"
          aria-modal="true"
          className={`absolute start-0 top-0 h-full w-[85%] max-w-[360px] bg-white shadow-2xl flex flex-col overflow-hidden transform transition-transform duration-300 ease-in-out will-change-transform ${
            drawerOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 h-14 shrink-0 px-4 border-b border-gray-100">
            <span className="flex items-center gap-2 text-base font-bold text-gray-800 min-w-0">
              <MdFilterAlt className="w-5 h-5 text-red-600 shrink-0" />
              <span className="truncate">{t("filters")}</span>
            </span>
            <button
              type="button"
              onClick={onDrawerClose}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-red-600 transition-colors shrink-0"
            >
              <IoClose className="w-5 h-5" />
              {t("close")}
            </button>
          </div>
          <div className="h-px w-full bg-gray-100 shrink-0" />
          {/* Scrollable filter content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            {filterSections}
          </div>
        </aside>
      </div>
    </>
  );
}