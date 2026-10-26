import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext";

// الأبعاد الأصلية لكل صورة عشان تتحافظ على نسبتها وتتغير مع عرض الشاشة
const REVIEW_IMAGES = [
  { src: "/Images/ReviewsClients/1.png", width: 445, height: 82 },
  { src: "/Images/ReviewsClients/2.png", width: 445, height: 82 },
  { src: "/Images/ReviewsClients/3.png", width: 445, height: 82 },
  { src: "/Images/ReviewsClients/8.png", width: 445, height: 82 },
  { src: "/Images/ReviewsClients/5.png", width: 654, height: 100 },
  { src: "/Images/ReviewsClients/6.png", width: 445, height: 82 },
  { src: "/Images/ReviewsClients/7.png", width: 631, height: 136 },
];

export default function ReviewsClients() {
  const { t } = useLanguage();

  return (
    <div className="w-full h-auto rounded-3xl p-5 mt-5">
      <h1 className="text-lg font-medium my-7 sm:text-xl lg:text-2xl">
        {t("reviews_clients")}
      </h1>
      <div className="w-full mb-10 grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10">
        {REVIEW_IMAGES.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={`Review ${index + 1}`}
            width={image.width}
            height={image.height}
            quality={100}
            priority={index < 3}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-auto rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
