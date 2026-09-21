"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useLanguage } from "../../../../context/LanguageContext";
import CustomerReviewCard from "./CustomerReviewCard";

const VISIBLE_COUNT = 3;

export default function ReviewsList({ reviews }) {
  const { t } = useLanguage();
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (!popupOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setPopupOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupOpen]);

  const list = Array.isArray(reviews) ? reviews : [];
  const shownReviews = list.slice(0, VISIBLE_COUNT);
  const hasMore = list.length > VISIBLE_COUNT;

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4">
        {shownReviews.map((review) => (
          <CustomerReviewCard
            key={review.itemRatingId ?? review.rating + review.comment}
            review={review}
          />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setPopupOpen(true)}
          className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 mt-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-red-400 hover:text-red-600 transition-colors"
        >
          {t("view_all_reviews")} ({list.length})
        </button>
      )}

      {popupOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setPopupOpen(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between h-14 px-5 border-b border-gray-100 shrink-0">
              <h3 className="text-lg font-bold text-gray-800">
                {t("CustomerReviews")}
              </h3>
              <button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                <IoClose className="w-5 h-5" />
                {t("close")}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex flex-col gap-4">
                {list.map((review) => (
                  <CustomerReviewCard
                    key={review.itemRatingId ?? review.rating + review.comment}
                    review={review}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}