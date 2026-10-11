"use client";
import { getThumbnailUrl } from "../../../../utils/functions";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { IoImageOutline } from "react-icons/io5";

export default function ProductImages({ product }) {
  const urlImage = process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL;
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedThumbs, setFailedThumbs] = useState({});
  const { locale } = useLanguage();
  const images = Array.isArray(product.images) ? product.images : [];
  const productName = locale === "ar" ? product.nameAr : product.nameEn;

  return (
    <div className="flex w-full min-w-0 flex-col-reverse gap-3 sm:gap-4 sm:mx-auto sm:max-w-[520px] md:sticky md:top-6 lg:mx-0 lg:max-w-none md:flex-row">
      {images.length > 1 && (
        <div
          role="group"
          className="flex w-full shrink-0 snap-x gap-2 overflow-x-auto pb-1 md:max-h-[560px] md:w-auto md:flex-col md:overflow-x-visible md:overflow-y-auto md:pb-0 lg:max-h-[620px]"
          aria-label={`${productName || "Product"} images`}
        >
          {images.map((img, index) => (
            <button
              key={img?.itemImageId ?? img?.imageUrl ?? index}
              type="button"
              onClick={() => swiperRef.current?.slideTo(index)}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex}
              className={`relative h-16 w-16 shrink-0 snap-start overflow-hidden rounded-xl border-2 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E14A5C] focus-visible:ring-offset-1 sm:h-20 sm:w-20 ${
                index === activeIndex
                  ? "border-[#E14A5C]"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={
                  urlImage +
                  (failedThumbs[index]
                    ? img.imageUrl
                    : getThumbnailUrl(img.imageUrl))
                }
                alt=""
                fill
                sizes="80px"
                className="object-contain p-1"
                onError={() =>
                  setFailedThumbs((prev) => ({ ...prev, [index]: true }))
                }
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white sm:rounded-3xl">
        {images.length > 0 ? (
          <Swiper
            key={locale}
            slidesPerView={1}
            navigation={true}
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            dir={locale === "ar" ? "rtl" : "ltr"}
            spaceBetween={10}
            className="aspect-square w-full max-h-[560px] select-none lg:max-h-[620px]"
          >
            {images.map((img, index) => (
              <SwiperSlide
                key={img?.itemImageId ?? img?.imageUrl ?? index}
                className="group relative"
              >
                <Image
                  src={urlImage + img.imageUrl}
                  alt={
                    productName
                      ? `${productName} - image ${index + 1}`
                      : `Product image ${index + 1}`
                  }
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                  className="object-contain transition-transform duration-300 lg:group-hover:scale-[1.05]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex aspect-square w-full items-center justify-center text-gray-300">
            <IoImageOutline className="h-20 w-20" aria-hidden />
          </div>
        )}
      </div>
    </div>
  );
}
