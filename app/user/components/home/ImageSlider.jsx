"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function ImageSlider({ sliderImages }) {
  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : "ar";
  return (
    <div className=" my-10 md:px-10 xs:px-0">
      <Swiper
        key={lang}
        dir={lang === "ar" ? "rtl" : "ltr"}
        navigation={true}
        slidesPerView={1}
        loop={true}
        autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full md:h-[550px] xs:h-[450px] md:px-32 xs:px-0"
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={img.sliderImageId}>
            <div className="h-full w-full flex justify-center items-center  relative ">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${
                  img.imageUrl || ""
                }`}
                alt={`Slide ${index + 1}`}
                width={1000}
                height={1000}
                priority
                className="md:h-full xs:h-[90%] w-[80%]  rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
