// components/ImageSlider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

export default function ImageSlider({ sliderImages }) {
  const lang = typeof window !== 'undefined' 
    ? localStorage.getItem('lang') || 'ar' 
    : 'ar';

  return (
    <Swiper
      key={lang}
      pagination={{ clickable: true }}
      rtl={lang === 'ar'}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      spaceBetween={20}
      modules={[Pagination]}
      className="w-full h-[450px] rounded-xl " // ⬅️ ارتفاع ثابت هنا!
    >
      {sliderImages.map((img, index) => (
        <SwiperSlide key={index}>
          {/* ⬇️ هذا هو الوالد المباشر للـ Image — يجب أن يكون له ارتفاع */}
          <div className="h-full w-full relative bg-gray-100">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${img.imageUrl || ''}`}
              alt={`Slide ${index + 1}`}
          width={450}
          height={450}
              priority={index === 0}
              className="rounded-lg h-full w-full "
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}