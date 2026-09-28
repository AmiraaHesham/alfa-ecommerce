import Skeleton from "./Skeleton";

// Mirrors app/user/home/components/SiteFeatures.jsx
// (dark rounded-full bar with 5 icon + label items)
export default function SiteFeaturesSkeleton({ count = 5 }) {
  return (
    <div className="w-full rounded-full mt-5 p-5 flex justify-center items-center bg-[#0d0625]">
      <div className="w-full flex md:grid md:grid-cols-5 grid-cols-1 gap-5 justify-center items-center">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={`feature-${i}`}
            className="flex gap-2 justify-center items-center w-full"
          >
            <Skeleton tone="dark" className="h-7 w-7 rounded-md" />
            <Skeleton tone="dark" className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
