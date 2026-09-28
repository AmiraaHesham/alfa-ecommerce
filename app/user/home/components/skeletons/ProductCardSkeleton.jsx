import Skeleton from "./Skeleton";
import StarsSkeleton from "./StarsSkeleton";

// Mirrors app/user/components/ProductCard.jsx (h-[360px], image 2/3, name, category, stars, prices)
export default function ProductCardSkeleton({ className = "" }) {
  return (
    <div className={`h-[360px] w-full bg-white py-2 rounded-3xl ${className}`}>
      <div className="flex flex-col justify-around gap-3 items-center h-full">
        <div className="relative h-2/3 w-full p-1">
          <Skeleton className="w-full h-full rounded-3xl" />
          <Skeleton className="absolute top-2 left-3 h-6 w-12 rounded-full" />
        </div>

        <div className="flex flex-col gap-2 items-center justify-center w-full px-2">
          <Skeleton className="h-3.5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <StarsSkeleton size="h-[15px] w-[15px]" />
          <div className="flex justify-center items-center gap-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3.5 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
