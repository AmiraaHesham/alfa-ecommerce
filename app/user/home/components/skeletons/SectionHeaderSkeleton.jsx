import Skeleton from "./Skeleton";

// Mirrors the "title + shop more" header used by ProductShowcase / Top10Products / BestPick
export default function SectionHeaderSkeleton({
  titleClassName = "h-5 w-44",
  linkClassName = "h-3 w-16",
  className = "",
}) {
  return (
    <div className={`w-full flex justify-between items-center ${className}`}>
      <Skeleton className={titleClassName} />
      <div className="text-xs font-semibold flex flex-col items-end gap-1">
        <Skeleton className={linkClassName} />
        <hr className="bg-gray-200 h-[2px] border-none w-16" />
      </div>
    </div>
  );
}
