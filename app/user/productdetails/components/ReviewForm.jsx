"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewForm({ product }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      product: product?.nameEn || product?.nameAr || "",
      rating,
      review,
      name,
      email,
      saveInfo,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-lg p-6 md:p-8"
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        Add a review
      </h2>

      <p className="text-sm text-gray-500 mb-8">
        Your email address will not be published. Required fields are marked{" "}
        <span className="text-[#e5485d]">*</span>
      </p>

      {/* Rating */}
      <div className="mb-6 flex items-center gap-3">
        <label className="block text-sm font-medium text-gray-700 ">
          Your rating <span className="text-[#e5485d]">*</span>
        </label>
        <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              className="outline-none focus:outline-none"
            >
              <FaStar
                className={`w-5 h-5 transition-colors duration-200 ease-in-out ${
                  value <= hoverRating || value <= rating
                    ? "text-[#f5b800]"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your review <span className="text-[#e5485d]">*</span>
        </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={8}
          required
          placeholder="Write your review here..."
          className="w-full h-[190px] resize-y rounded-3xl border border-gray-300 bg-white p-4 text-sm text-gray-800 outline-none transition-colors focus:border-[#e5485d]/60"
        />
      </div>

      {/* Name */}
      {/* <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name <span className="text-[#e5485d]">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full h-[42px] rounded-full border border-gray-300 bg-white px-5 text-sm text-gray-800 outline-none transition-colors focus:border-[#e5485d]/60"
        />
      </div> */}

      {/* Email */}
      {/* <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-[#e5485d]">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-[42px] rounded-full border border-gray-300 bg-white px-5 text-sm text-gray-800 outline-none transition-colors focus:border-[#e5485d]/60"
        />
      </div> */}

      {/* Save info */}
      {/* <div className="flex items-start gap-3 mb-8">
        <input
          type="checkbox"
          id="save-info"
          checked={saveInfo}
          onChange={(e) => setSaveInfo(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#e5485d]"
        />
        <label htmlFor="save-info" className="text-sm text-gray-600 leading-snug">
          Save my name, email, and website in this browser for the next time I
          comment.
        </label>
      </div> */}

      {/* Submit */}
      <button
        type="submit"
        className="rounded-full bg-[#e5485d] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d04153] hover:opacity-90"
      >
        Submit
      </button>
    </form>
  );
}