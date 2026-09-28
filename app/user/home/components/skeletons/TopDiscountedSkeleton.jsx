import Skeleton from "./Skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

// Mirrors app/user/home/components/TopDiscounted.jsx
// (banner block with a discount badge, headline text and a swiper of product cards)
export default function TopDiscountedSkeleton({ cards = 3 }) {
  return (
    <div className="relative w-full md:h-[450px] xs:h-[630px] my-10 flex justify-center items-center rounded-3xl">
      <Skeleton className="absolute inset-0 w-full h-full rounded-3xl" />

      <div className="w-full h-full absolute top-0 flex md:flex-row xs:flex-col px-7 justify-center items-center">
        <div className="w-full h-full flex xs:flex-row md:flex-col gap-5 p-5 xs:justify-between md:justify-center items-center">
          <div className="md:order-1 xs:order-2 flex justify-end">
            <Skeleton className="w-20 h-20 rounded-full" />
          </div>

          <div className="md:order-2 xs:order-1 w-full flex flex-col md:items-center xs:items-start justify-center">
            <div className="md:text-center xs:text-start w-full">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-3 w-52 mt-3" />
            </div>
            <Skeleton className="h-8 w-[100px] rounded-full mt-5" />
          </div>
        </div>

        <div className="relative overflow-hidden px-10 md:w-3/4 xs:w-full h-full flex justify-center items-center">
          <div className="w-full flex xs:flex-col md:flex-row justify-center items-center gap-6">
            {Array.from({ length: cards }).map((_, i) => (
              <div key={`discount-card-${i}`} className="!w-[240px] shrink-0">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
