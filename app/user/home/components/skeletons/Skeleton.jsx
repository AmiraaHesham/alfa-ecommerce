const TONES = {
  light: "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200",
  soft: "bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100",
  dark: "bg-gradient-to-r from-white/10 via-white/20 to-white/10",
};

export default function Skeleton({
  className = "",
  tone = "light",
  rounded = "rounded",
}) {
  return (
    <div
      aria-hidden="true"
      className={`${TONES[tone] || TONES.light} bg-[length:200%_100%] animate-shimmer motion-reduce:animate-none ${rounded} ${className}`}
    />
  );
}
