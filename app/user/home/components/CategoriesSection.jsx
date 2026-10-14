"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

import { useIdContext } from "../../../../context/idContext";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useLanguage } from "../../../../context/LanguageContext";
import { useEffect, useState } from "react";
import { getThumbnailUrl } from "../../../../utils/functions";
import { useSearshInputContext } from "../../../../context/searshInputContext";
import { AiFillFire } from "react-icons/ai";

export default function CategorySection({ categories }) {
  const { locale } = useLanguage();

  const { t } = useLanguage();
  const { setSelectedSearchInput } = useSearshInputContext();

  const { setSelectedCategoryId } = useIdContext();
  const navigate = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="w-full">
       <div className="w-full px-5  flex justify-between items-center gap-2 text-center">
          <div className="flex items-center gap-2">
           
            <span className="text-[#7354EF] text-xl"> <AiFillFire/> </span>
             <h1 className="flex items-center font-semibold gap-2 text-2xl  ">
              {t("hot_categorios")}
            </h1>
          </div>
        
        </div>
      <div className="w-full grid grid-cols-3 gap-x-2 gap-y-1 mt-2">
        {categories.map((category, index) => (
          <div
            key={index}
<<<<<<< HEAD
            className="mt-4 flex xl:flex-row xs:flex-col min-w-0 cursor-pointer items-center gap-2 rounded-md px-1 text-start"
=======
            className="mt-4 flex justify-center items-center text-center cursor-pointer rounded-md min-w-0 px-1"
>>>>>>> ed19dedd2cab5263c440baf12802c0d645a0f5ea
            onClick={() => {
              navigate.push(
                "/user/products/category/" +
                  category.nameEn +
                  "/" +
                  category.itemCategoryId,
              );
            }}
          >
<<<<<<< HEAD
            <div className="relative shrink-0 rounded-full h-[75px] w-[75px] hover:scale-105 duration-200">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${getThumbnailUrl(category.imageURL) || ""
                  }`}
                alt={locale === "ar" ? category.nameAr : category.nameEn}
                fill
                quality={100}
                sizes="100px"
                className="object-fill rounded-full"
              />
=======
            <div className="w-full min-w-0 flex flex-row justify-center items-center gap-2">
              <div className="relative shrink-0 rounded-full xl:h-[100px] xl:w-[100px] xs:h-[80px] xs:w-[80px] hover:scale-105 duration-200">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${getThumbnailUrl(category.imageURL) || ""
                    }`}
                  alt={locale === "ar" ? category.nameAr : category.nameEn}
                  fill
                  quality={100}
                  sizes="100px"
                  className="object-fill rounded-full"
                />
              </div>
              <h1 className="min-w-0 flex-1 font-semibold text-sm break-words line-clamp-2">
                {locale === "ar"
                  ? category.nameAr || category.nameEn
                  : category.nameEn || category.nameAr}
              </h1>
>>>>>>> ed19dedd2cab5263c440baf12802c0d645a0f5ea
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
