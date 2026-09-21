"use client";
import { useLanguage } from "../../../../../context/LanguageContext";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

const getPaginationItems = (current, total) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index);
  }
  const middle = [current - 1, current, current + 1];
  const items = [];
  for (let i = 0; i < total; i++) {
    if (i === 0 || i === total - 1 || middle.includes(i)) {
      items.push(i);
    } else if (items[items.length - 1] !== "...") {
      items.push("...");
    }
  }
  return items;
};

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { t, locale } = useLanguage();
  const isRTL = locale === "ar";
  const items = getPaginationItems(currentPage, totalPages);
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  const baseBtn =
    "flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-xl text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-300";

  const navBtn =
    "border border-gray-200 bg-white text-gray-600 hover:border-red-400 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600";

  return (
    <nav aria-label="Pagination" className="w-full flex justify-center mt-8">
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        <button
          type="button"
          aria-label={t("previous")}
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
          className={`${baseBtn} ${navBtn}`}
        >
          {isRTL ? (
            <IoChevronForwardOutline className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <IoChevronBackOutline className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

        {items.map((item, index) =>
          item === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center h-6 w-6 sm:h-10 sm:w-8 text-sm text-gray-400 select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={item === currentPage ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={`${baseBtn} ${
                item === currentPage
                  ? "bg-red-500 text-white shadow-sm hover:bg-red-600"
                  : navBtn
              }`}
            >
              {item + 1}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label={t("next")}
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
          className={`${baseBtn} ${navBtn}`}
        >
          {isRTL ? (
            <IoChevronBackOutline className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <IoChevronForwardOutline className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
    </nav>
  );
}