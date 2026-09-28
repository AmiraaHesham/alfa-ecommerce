import Skeleton from "./Skeleton";

export default function StarsSkeleton({ count = 5, size = "h-4 w-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={`star-${i}`} className={`${size} rounded-sm`} />
      ))}
    </div>
  );
}
