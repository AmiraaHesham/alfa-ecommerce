"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../../../context/LanguageContext";
import { getThumbnailUrl } from "../../../../utils/functions";
import { productPath } from "../../../../lib/seo";

export default function ImageSlider({ sliderImages }) {
  const { locale } = useLanguage();

  return (
    <div className="w-full lg:h-[510px] xs:h-[470px] rounded-3xl">
      <Swiper
        key={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        navigation={true}
        pagination={true}
        slidesPerView={"auto"}
        loop={true}
        speed={1000}
        // freeMode={{
        //   enabled: true,
        //   momentum: true,
        //   momentumRatio: 0.6,
        //   momentumVelocityRatio: 0.5,
        // }}
        autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-full rounded-3xl"
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={index} className="relative w-full rounded-3xl">
            <Link
              href={img.itemId ? productPath({ itemId: img.itemId, nameEn: img.titleEn || img.title, nameAr: img.titleAr || img.title }) : "/products"}
              className="relative w-full h-full block cursor-pointer"
            >
              <Image
                src={process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + img.imageUrl} 
                alt={img.titleAr || img.title || `عرض ${index + 1}`}
                fill
                priority={index === 0}
                
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover rounded-3xl"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
