import Skeleton from "./Skeleton";
import StarsSkeleton from "./StarsSkeleton";

// Mirrors the compact product row used by ProductShowcase / Top10Products
// (60px circle + name, stars, old price and price)
export default function ProductListRowSkeleton({
  avatarClassName = "w-[60px] h-[60px]",
  className = "",
}) {
  return (
    <div className={`flex gap-2 items-center w-full ${className}`}>
      <Skeleton className={`${avatarClassName} rounded-full shrink-0`} />
      <div className="flex flex-col gap-1 w-full min-w-0">
        <Skeleton className="h-3.5 w-3/4" />
        <StarsSkeleton size="h-[13px] w-[13px]" />
        <div className="flex justify-start gap-2 items-center">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3.5 w-16" />
        </div>
      </div>
    </div>
  );
}
