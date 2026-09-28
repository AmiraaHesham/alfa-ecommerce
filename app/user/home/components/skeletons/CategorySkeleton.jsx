import Skeleton from "./Skeleton";

// Mirrors app/user/home/components/CategoriesSection.jsx
// (title row + grid-cols-4 of 80px/100px circles with a 2 line label)
export default function CategorySkeleton({
  count = 4,
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

      <div className="w-full grid grid-cols-4 xl:grid-cols-4 gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={`category-${i}`}
            className="mt-4 flex justify-center items-center text-center min-w-0 px-1"
          >
            <div className="w-full flex flex-col justify-center items-center">
              <Skeleton className="rounded-full h-[80px] w-[80px] xl:h-[100px] xl:w-[100px]" />
              <div className="w-full flex flex-col items-center gap-1 mt-2 px-1">
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
