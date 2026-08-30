"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../../context/LanguageContext";

export default function ImageSlider({ sliderImages }) {
  const { locale } = useLanguage();
  const navigate = useRouter();

  return (
    <div className="w-full h-[500px] rounded-3xl">
      <Swiper
        key={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        navigation={true}
        pagination={true}
        slidesPerView={"auto"}
        loop={true}
        speed={1000}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.6,
          momentumVelocityRatio: 0.5,
        }}
        autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-full rounded-3xl"
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={index} className="relative w-full rounded-3xl">
            <button
              onClick={() => img.itemId ? navigate.push(`/user/productdetails/item/${img.itemId}`) : null}
              className="relative w-full h-full block cursor-pointer"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${img.imageUrl}`}
                alt={`Slide ${index + 1}`}
                fill
                priority
                quality={100}
                sizes="100vw"
                className="object-fill rounded-3xl"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
