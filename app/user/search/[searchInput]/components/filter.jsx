"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../../../../../context/LanguageContext";
import { MdFilterAlt } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaArrowRightLong, FaArrowLeftLong, FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const RATING_OPTIONS = [5, 4, 3, 2, 1];

const getProductBrand = (product, locale) => {
  const brand =
    product?.brand ||
    product?.brandName ||
    product?.itemBrand ||
    product?.manufacturer ||
    null;
  if (!brand) return null;
  if (typeof brand === "string") return brand;
  return (
    brand?.[locale === "ar" ? "nameAr" : "nameEn"] ||
    brand?.nameAr ||
    brand?.nameEn ||
    null
  );
};

export default function Filter({
  products,
  appliedFilters,
  onFilter,
  drawerOpen,
  onDrawerClose,
}) {
  const { t, locale } = useLanguage();
  const isRTL = locale === "ar";

  const prices = useMemo(
    () =>
      (products || [])
        .map((product) => Number(product?.price))
        .filter((price) => !Number.isNaN(price)),
    [products],
  );

  const boundMin = prices.length ? Math.min(...prices) : 0;
  const boundMax = prices.length ? Math.max(...prices) : 1;
  const safeMax = boundMax > boundMin ? boundMax : boundMin + 1;

  const [values, setValues] = useState({
    min: boundMin,
    max: safeMax,
  });
  const [drag, setDrag] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandQuery, setBrandQuery] = useState("");
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const trackRef = useRef(null);
  const brandInputRef = useRef(null);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (appliedFilters) {
      setValues({
        min: Math.max(boundMin, Math.min(appliedFilters.min, safeMax)),
        max: Math.min(safeMax, Math.max(appliedFilters.max, boundMin)),
      });
      setSelectedBrand(appliedFilters.brand || "");
      setBrandQuery(appliedFilters.brand || "");
      setSelectedRating(appliedFilters.rating || null);
    } else {
      setValues({ min: boundMin, max: safeMax });
      setSelectedBrand("");
      setBrandQuery("");
      setSelectedRating(null);
    }
  }, [boundMin, safeMax, appliedFilters]);

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

  const allBrands = useMemo(() => {
    const seen = new Set();
    const list = [];
    (products || []).forEach((product) => {
      const name = getProductBrand(product, locale);
      if (name && !seen.has(name.toLowerCase())) {
        seen.add(name.toLowerCase());
        list.push(name);
      }
    });
    return list;
  }, [products, locale]);

  const suggestions = useMemo(() => {
    const query = brandQuery.trim().toLowerCase();
    const matches = query
      ? allBrands.filter((brand) => brand.toLowerCase().includes(query))
      : allBrands;
    return matches.slice(0, 8);
  }, [allBrands, brandQuery]);

  const getValueFromClientX = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    if (isRTL) ratio = 1 - ratio;
    ratio = Math.max(0, Math.min(1, ratio));
    return Math.round(boundMin + ratio * (safeMax - boundMin));
  };

  const updateValue = (which, value) => {
    const clamped = Math.max(boundMin, Math.min(safeMax, value));
    setValues((prev) => {
      if (which === "min") {
        return { ...prev, min: Math.min(clamped, prev.max - 1) };
      }
      return { ...prev, max: Math.max(clamped, prev.min + 1) };
    });
  };

  useEffect(() => {
    if (!drag) return;

    const handleMove = (event) =>
      updateValue(drag, getValueFromClientX(event.clientX));
    const handleUp = () => setDrag(null);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [drag, isRTL, boundMin, safeMax]);

  const handleTrackPointerDown = (event) => {
    const value = getValueFromClientX(event.clientX);
    const which =
      Math.abs(value - values.min) <= Math.abs(value - values.max)
        ? "min"
        : "max";
    setDrag(which);
    updateValue(which, value);
  };

  const handleThumbKeyDown = (which, event) => {
    const range = safeMax - boundMin;
    const step = Math.max(1, Math.round(range / 50));
    const multiplier = event.shiftKey ? 10 : 1;
    // ArrowRight / ArrowUp increase, ArrowLeft / ArrowDown decrease.
    // In RTL the slider is mirrored, so the arrows are reversed.
    let dir = 0;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") dir = 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") dir = -1;
    if (dir === 0) return;
    event.preventDefault();
    const factor = isRTL ? -1 : 1;
    const current = which === "min" ? values.min : values.max;
    updateValue(which, current + dir * factor * step * multiplier);
  };

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setBrandQuery(brand);
    setShowBrandDropdown(false);
    brandInputRef.current?.blur();
  };

  const handleClearBrand = () => {
    setSelectedBrand("");
    setBrandQuery("");
    setShowBrandDropdown(false);
    brandInputRef.current?.focus();
  };

  const minPercent = ((values.min - boundMin) / (safeMax - boundMin)) * 100;
  const maxPercent = ((values.max - boundMin) / (safeMax - boundMin)) * 100;

  const thumbStyle = (percent) =>
    isRTL ? { right: `${percent}%` } : { left: `${percent}%` };

  const formatPrice = (value) =>
    `${Math.round(value).toLocaleString("en-US")} ${t("currency")}`;

  const desktopHeader = (
    <div className="flex items-center gap-2">
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-50 text-red-600">
        <MdFilterAlt className="w-5 h-5" />
      </span>
      <h2 className="text-lg font-bold text-gray-800">{t("filters")}</h2>
    </div>
  );

  const filterSections = (
    <>
        {/* separator */}
        <div className="h-px w-full bg-gray-100 my-5" />

        {/* Price filter section */}
        <div className="text-start p-2">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            {t("Price")}
          </h3>

          <div dir="ltr" className="relative">
            <div
              ref={trackRef}
              onPointerDown={handleTrackPointerDown}
              className="relative h-1.5 w-full rounded-full bg-gray-200 cursor-pointer"
            >
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-red-400 to-red-600"
                style={{
                  left: isRTL ? `${100 - maxPercent}%` : `${minPercent}%`,
                  right: isRTL ? `${minPercent}%` : `${100 - maxPercent}%`,
                }}
              />
            </div>

            <div
              role="slider"
              aria-label={t("Price")}
              aria-valuemin={Math.round(boundMin)}
              aria-valuemax={Math.round(safeMax)}
              aria-valuenow={Math.round(values.min)}
              tabIndex={0}
              onPointerDown={(event) => {
                event.stopPropagation();
                setDrag("min");
              }}
              onKeyDown={(event) => handleThumbKeyDown("min", event)}
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-red-500 shadow cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-red-300"
              style={thumbStyle(minPercent)}
            />
            <div
              role="slider"
              aria-label={t("Price")}
              aria-valuemin={Math.round(boundMin)}
              aria-valuemax={Math.round(safeMax)}
              aria-valuenow={Math.round(values.max)}
              tabIndex={0}
              onPointerDown={(event) => {
                event.stopPropagation();
                setDrag("max");
              }}
              onKeyDown={(event) => handleThumbKeyDown("max", event)}
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-red-500 shadow cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-red-300"
              style={thumbStyle(maxPercent)}
            />
          </div>

          {/* Selected range display */}
          <p className="mt-4 text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{t("Price")}:</span>{" "}
            {formatPrice(values.min)} <span className="text-gray-400">—</span>{" "}
            {formatPrice(values.max)}
          </p>
        </div>
        {/* separator */}
        <div className="h-px w-full bg-gray-100 my-5" />

        {/* Brand filter section */}
        <div className="relative text-start">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {t("brand")}
          </h3>
          <div className="relative">
            <FiSearch className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 start-3" />
            <input
              ref={brandInputRef}
              type="text"
              value={brandQuery}
              placeholder={t("search_brand")}
              onChange={(event) => {
                setBrandQuery(event.target.value);
                if (selectedBrand) setSelectedBrand("");
                setShowBrandDropdown(true);
              }}
              onFocus={() => setShowBrandDropdown(true)}
              onBlur={() => setTimeout(() => setShowBrandDropdown(false), 150)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && suggestions.length > 0) {
                  handleSelectBrand(suggestions[0]);
                }
                if (event.key === "Escape") {
                  setShowBrandDropdown(false);
                  event.currentTarget.blur();
                }
              }}
              className="w-full h-10 pe-9 ps-9 rounded-xl border border-gray-200 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 text-sm text-gray-800 placeholder:text-gray-400"
            />
            {(brandQuery || selectedBrand) && (
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

          {/* Brand suggestions */}
          {showBrandDropdown && suggestions.length > 0 && (
            <div className="absolute z-30 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {suggestions.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelectBrand(brand)}
                  className={`w-full text-start px-4 py-2.5 text-sm transition-colors ${
                    selectedBrand === brand
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
        {/* separator */}
        <div className="h-px w-full bg-gray-100 mt-5" />

        {/* Rating filter section */}
        <div className="mt-5 text-start">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {t("rating")}
          </h3>
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setSelectedRating(null)}
              className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedRating === null
                  ? "bg-red-50 text-red-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              x
            </button>
            {/* {RATING_OPTIONS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setSelectedRating((prev) => (prev === value ? null : value))
                }
                className={`w-full text-start px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors ${
                  selectedRating === value
                    ? "bg-red-50 text-red-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-0.5" dir={isRTL ? "rtl" : "ltr"}>
                  {Array.from({ length: value }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`w-4 h-4 ${
                        selectedRating === value
                          ? "text-red-500"
                          : "text-amber-400"
                      }`}
                    />
                  ))}
                </span>
                <span className="text-xs text-gray-400">{t("and_up")}</span>
              </button>
            ))} */}
               <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setSelectedRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="outline-none focus:outline-none"
            >
              {value <= hoverRating || value <= selectedRating ? (
                <FaStar
                  className="w-5  h-5 transition-colors duration-200 ease-in-out text-[#f5b800]" />
              ) :
                (<FaRegStar
                  key={value}
                  className="text-gray-300 w-5 h-5 transition-colors duration-200 ease-in-out"
                />)
              }
            </button>
          ))}
        </div>
          </div>
        </div>
        {/* separator */}
        <div className="h-px w-full bg-gray-100 mt-5" />

        {/* Apply button */}
        <button
          type="button"
          onClick={() =>
            onFilter({
              min: Math.round(values.min),
              max: Math.round(values.max),
              brand: selectedBrand || null,
              rating: selectedRating,
            })
          }
          className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-semibold transition-colors shadow-sm"
        >
          {t("apply_filter")}
          {isRTL ? (
            <FaArrowLeftLong className="w-4 h-4" />
          ) : (
            <FaArrowRightLong className="w-4 h-4" />
          )}
        </button>
    </>
  );

  return (
    <>
      {/* Desktop / tablet: existing sidebar */}
      <aside className="hidden md:block w-full md:w-[400px] min-h-screen shrink-0">
        <div className="bg-white h-full rounded-3xl shadow-md border border-gray-100 p-5">
          {desktopHeader}
          {filterSections}
        </div>
      </aside>

      {/* XS / Mobile: filters as a left side drawer */}
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
          className={`absolute left-0 top-0 h-full w-[60%] max-w-[380px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out will-change-transform ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between h-14 shrink-0 px-4 border-b border-gray-100">
            <span className="flex items-center gap-2 text-base font-bold text-gray-800">
              <MdFilterAlt className="w-5 h-5 text-red-600" />
              {t("filters")}
            </span>
            <button
              type="button"
              onClick={onDrawerClose}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              <IoClose className="w-5 h-5" />
              {t("close")}
            </button>
          </div>
          {/* Horizontal separator under the header */}
          <div className="h-px w-full bg-gray-100 shrink-0" />
          {/* Scrollable filter content */}
          <div className="flex-1 overflow-y-auto p-4">
            {filterSections}
          </div>
        </aside>
      </div>
    </>
  );
}