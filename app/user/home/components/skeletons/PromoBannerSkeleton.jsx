import Skeleton from "./Skeleton";

// Mirrors the 3 promo banners (ad3 / ad4 / ad5) in page.jsx
// (h-[550px] card: image 2/3, brand title, subtitle, buy now button)
export default function PromoBannerSkeleton({ tone = "light" }) {
  const isDark = tone === "dark";

  return (
    <div
      className={`w-full flex flex-col justify-center items-center h-[550px] rounded-3xl overflow-hidden p-5 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <Skeleton className="w-full h-2/3 rounded-3xl" />
      <div className="flex flex-col justify-around items-center w-full gap-4 mt-5">
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-9 w-[120px] rounded-full" />
      </div>
    </div>
  );
}
