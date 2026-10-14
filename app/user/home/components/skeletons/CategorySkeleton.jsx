import Skeleton from "./Skeleton";

<<<<<<< HEAD
// Mirrors app//components/CategoriesSection.jsx
// (title row + 3 column grid of 64px circles with a 2 line label beside each circle)
=======
// Mirrors app/user/home/components/CategoriesSection.jsx
// (title row + 3 column grid of 80px/100px circles with a 2 line label beside each circle)
>>>>>>> ed19dedd2cab5263c440baf12802c0d645a0f5ea
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
            className="mt-4 flex justify-center items-center text-center min-w-0 px-1"
          >
            <div className="w-full min-w-0 flex flex-row justify-center items-center gap-2">
              <Skeleton className="shrink-0 rounded-full h-[80px] w-[80px] xl:h-[100px] xl:w-[100px]" />
              <div className="min-w-0 flex-1 flex flex-col items-start gap-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-14" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
