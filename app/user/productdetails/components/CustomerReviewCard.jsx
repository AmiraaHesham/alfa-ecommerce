"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { useLanguage } from "../../../../context/LanguageContext";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL;

function getInitials(name) {
  return (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatDate(value, locale) {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US");
}

export default function CustomerReviewCard({ review }) {
  const { t, locale } = useLanguage();
  const { user, rating = 0, comment } = review || {};

  const name = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ") || user?.username || "";

  const avatarUrl = user?.imageUrl || user?.image || user?.avatar || "";
  const date = review?.createdDate || review?.date || "";

  const displayName = name || t("anonymous");

  return (
    <div className="w-full">
      <div className="w-full bg-[#f6f5f8] rounded-3xl border p-6">
        <div className="flex items-center gap-4 mb-3">
          {avatarUrl ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
              <Image
                src={avatarUrl.startsWith("http") ? avatarUrl : IMAGE_BASE_URL + avatarUrl}
                alt={displayName}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#e5485d] text-white flex items-center justify-center font-bold text-lg shrink-0">
              {getInitials(displayName)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">{displayName}</h3>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= rating ? (
                  <FaStar key={star} className="text-[#f5b800]" />
                ) : (
                  <FaRegStar key={star} className="text-gray-300" />
                )
              )}
            </div>
          </div>

          {date && (
            <span className="text-sm text-gray-500 shrink-0">{formatDate(date, locale)}</span>
          )}
        </div>

        {comment ? (
          <p className="text-gray-700 leading-relaxed">{comment}</p>
        ) : (
          <p className="text-gray-400 italic">{t("no_comment")}</p>
        )}
      </div>
    </div>
  );
}