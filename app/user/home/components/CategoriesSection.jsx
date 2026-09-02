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
             <h1 className="flex items-center font-medium gap-2 xs:text-base md:text-2xl ">
              {t("hot_categorios")}
            </h1>
          </div>
        
        </div>
      <div className="w-full grid xl:grid-cols-6 xs:grid-cols-3 gap-3">

          {categories.map((category ,index) => (
          
              <div
              key={index}
                className="mt-4 flex justify-center items-center text-center cursor-pointer rounded-md  "
                onClick={() => {
                  navigate.push(
                    "/user/products/category/" +
                    category.nameEn +
                    "/" +
                    category.itemCategoryId,
                  );
                }}
              >
                <div className=" w-full flex flex-col justify-center items-center   ">
                  <div className="relative rounded-full h-[110px] w-[110px] hover:scale-105 duration-200 ">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${getThumbnailUrl(category.imageURL) || ""
                        }`}
                      alt=""
                      fill
                      quality={100}
                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-fill rounded-full"
                    />
                  </div>
                  <h1 className="font-medium text-sm  mt-6">
                    {locale === "ar" ? category.nameAr : category.nameEn}
                  </h1>
                </div>
              </div>
      
          ))}
     

      </div>
    </div>
  );
}
