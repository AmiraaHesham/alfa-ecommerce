// Mirrors app/user/home/components/FeatuerProducts.jsx grid + ProductCard
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton({
  count = 4,
  className = "grid xl:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 gap-5",
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={`card-${i}`} />
      ))}
    </div>
  );
}
