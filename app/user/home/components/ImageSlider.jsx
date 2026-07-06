"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext";

export default function ImageSlider({ sliderImages }) {
  const { locale } = useLanguage();

  return (
    <div className=" my-10 md:px-10 xs:px-0">
      <Swiper
        key={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        navigation={true}
        slidesPerView={1}
        loop={true}
        autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="md:w-[90%] xs:w-full h-[500px]"
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={img.sliderImageId} className="relative w-full h-full flex justify-center items-center rounded-lg  ">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${
                  img.imageUrl || ""
                }`}
                alt={`Slide ${index + 1}`}
                fill
                priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain "
              />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
