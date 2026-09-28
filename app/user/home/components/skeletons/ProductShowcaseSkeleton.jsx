import SectionHeaderSkeleton from "./SectionHeaderSkeleton";
import ProductListRowSkeleton from "./ProductListRowSkeleton";

// Mirrors app/user/home/components/ProductShowcase.jsx
// (280px white card, header, compact product rows)
export default function ProductShowcaseSkeleton({
  rows = 5,
  className = "",
}) {
  return (
    <div
      className={`lg:w-[280px] h-full xs:w-full bg-white rounded-3xl ${className}`}
    >
      <div className="flex w-full flex-col gap-2 p-3">
        <SectionHeaderSkeleton className="py-2" />
        <div className="w-full h-full flex flex-col gap-5">
          {Array.from({ length: rows }).map((_, i) => (
            <ProductListRowSkeleton key={`showcase-row-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
