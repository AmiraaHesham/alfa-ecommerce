import Skeleton from "./Skeleton";

// Mirrors app//components/CategoriesSection.jsx
// (title row + 3 column grid of 64px circles with a 2 line label beside each circle)
export default function CategorySkeleton({
  count = 6,
  showHeader = true,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      {showHeader && (
        <div className="w-full px-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
      )}

      <div className="w-full grid grid-cols-3 gap-x-2 gap-y-1 mt-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={`category-${i}`}
            className="mt-4 flex min-w-0 items-center gap-2 rounded-md px-1"
          >
            <Skeleton className="shrink-0 rounded-full h-[64px] w-[64px]" />
            <div className="min-w-0 flex-1 flex flex-col gap-1">
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
