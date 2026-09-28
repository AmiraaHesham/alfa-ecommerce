import Skeleton from "./Skeleton";

// Mirrors the ad1 hero card in page.jsx
// (gradient card, offer label, product name, price, 230x270 image)
export default function AdHeroSkeleton() {
  return (
    <div className="xl:w-[580px] lg:w-[500px] xs:w-full h-[350px] rounded-2xl p-5 flex flex-col justify-between items-center relative overflow-hidden bg-gradient-to-b from-[#2F4D4C] via-[#263F40] to-[#0F1B1B]">
      <div className="w-full text-center flex flex-col items-center gap-3">
        <Skeleton tone="dark" className="h-3.5 w-28" />
        <Skeleton tone="dark" className="h-6 w-3/4" />
        <Skeleton tone="dark" className="h-4 w-24" />
      </div>
      <Skeleton tone="dark" className="w-[230px] h-[270px] rounded-2xl" />
    </div>
  );
}
