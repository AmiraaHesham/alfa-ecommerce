"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

import { useLanguage } from "../../../../context/LanguageContext";
import { getThumbnailUrl } from "../../../../utils/functions";
import StarRating from "../../components/StarRating";
import { useIdContext } from "../../../../context/idContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BestPick({ Products }) {
  const { locale } = useLanguage()
  const { t } = useLanguage()
  const { setSelectedProductId } = useIdContext()
  const navigate = useRouter()
  const truncateText = (text) => {
    if (text.length > 20) {
      return text.slice(0, 18) + "...";
    }

    return text;
  };
  return (
    <div className="w-full  bg-white rounded-2xl p-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-semibold text-base  sticky z-10 ">{t("Best_pick_of_the_week")}</h1>
        <div className="text-xs font-semibold">
          <Link href="/user/products/section/topLast30Days">{t("shopMore")} </Link>
          <hr className="bg-red-500 h-[2px] border-none w-auto " />
        </div>
      </div>
      <div className="w-full mt-5">
        <Swiper
          key={locale}
          dir={locale === "ar" ? "rtl" : "ltr"}
          slidesPerView={1}
          spaceBetween={10}
          modules={[Navigation]}
          navigation={true}
          breakpoints={{
            512: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="w-full px-8 sm:px-12"
        >
          {Products?.slice(0, 4).map((product, index) => {
            const nameProduct = locale === "ar" ? product.nameAr : product.nameEn
            return (
              <SwiperSlide key={index} className="">
                <div
                  className="flex gap-2 items-center cursor-pointer select-none"
                  onClick={() => {
                    setSelectedProductId(product.itemId);
                    navigate.push(`/user/productdetails/${product.nameEn}/${product.itemId}`);
                  }}
                >
                  <div className="relative w-[60px] h-[60px] rounded-full hover:scale-105 duration-200 shrink-0">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                        getThumbnailUrl(product.images[0]?.imageUrl)
                      }
                      alt=""
                      fill
                      priority
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-fill rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 min-w-0">
                    <span className="text-sm font-semibold cursor-pointer truncate" title={nameProduct}
                    >{truncateText(nameProduct)}</span>
                    {product.averageRating === 0 ? "" : <StarRating rating={product.averageRating || 0} />}

                    <div className="flex flex-col  justify-start  items-start">
                      {product.oldPrice ? (
                        <div className="flex gap-2">
                          <span className=" line-through text-xs  flex text-gray-400">
                            {product.oldPrice?.toLocaleString("en-US")}{" "}{t("currency")}
                          </span>
                        </div>
                      ) : (
                        <span className=""></span>
                      )}

                      <span className="text-sm font-bold text-red-600 ">
                        {product.price.toLocaleString("en-US")}.00 {t("currency")}
                      </span>

                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
          }
        </Swiper>
      </div>
    </div>
  )
}