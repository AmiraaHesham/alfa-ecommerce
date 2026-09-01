"use client";

import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const ratingData = [
  { stars: 5, count: 1 },
  { stars: 4, count: 1 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const totalReviews = ratingData.reduce((sum, r) => sum + r.count, 0);
const avgRating =
  totalReviews > 0
    ? (
        ratingData.reduce((sum, r) => sum + r.stars * r.count, 0) / totalReviews
      ).toFixed(1)
    : "0.0";

// function StarIcon({ filled, half }) {
//   if (half) return <FaStarHalfAlt className="text-[#f5b800] text-sm" />;
//   if (filled) return <FaStar className="text-[#f5b800] text-sm" />;
//   return <FaRegStar className="text-gray-400 text-sm" />;
// }

function MainStarIcon({ filled, half }) {
  if (half) return <FaStarHalfAlt className="text-[#f5b800] text-2xl" />;
  if (filled) return <FaStar className="text-[#f5b800] text-2xl" />;
  return <FaRegStar className="text-gray-400 text-2xl" />;
}

function renderStars(rating, IconComponent) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const isHalf = !Number.isInteger(rating) && Math.ceil(rating) === i;
    const filled = i <= Math.ceil(rating) && !isHalf;
    stars.push(
      <IconComponent key={i} filled={filled} half={isHalf} />
    );
  }
  return stars;
}

export default function ProductRating({ product }) {
  return (
    <div className="w-full bg-white rounded-lg px-4 py-6 md:px-8">
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
        Customer Reviews
      </h2>

      {/* Average Rating */}
      <div className="flex flex-col items-center mb-6">
        <span className="text-4xl md:text-5xl font-bold text-gray-900">
          {avgRating}
        </span>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-2">
          {renderStars(parseFloat(avgRating), MainStarIcon)}
        </div>

        {/* Review Count */}
        <span className="text-gray-500 mt-2 text-sm md:text-base">
          {totalReviews} reviews
        </span>
      </div>

      {/* Rating Breakdown */}
      <div className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
        {ratingData.map((row) => {
          const percentage =
            totalReviews > 0 ? (row.count / totalReviews) * 100 : 0;

          return (
            <div
              key={row.stars}
              className="flex items-center gap-3 w-full"
            >
              {/* Star icons */}
              <div className="flex items-center gap-0.5 min-w-[80px]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar
                    key={s}
                    className={
                      s <= row.stars
                        ? "text-[#f5b800] text-xs"
                        : "text-gray-300 text-xs"
                    }
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: "#e34b63",
                  }}
                />
              </div>

              {/* Count */}
              <span className="text-gray-600 text-sm min-w-[20px] text-right">
                {row.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
