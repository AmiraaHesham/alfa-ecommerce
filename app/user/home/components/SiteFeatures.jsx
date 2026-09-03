"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useLanguage } from "../../../../context/LanguageContext";
import { FaShippingFast } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { LuShieldCheck } from "react-icons/lu";
import { RiLoopRightFill } from "react-icons/ri";
import { LiaCertificateSolid } from "react-icons/lia";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ImPriceTags } from "react-icons/im";
import { IoMdPricetags } from "react-icons/io";
export default function SiteFeatures() {
    const { locale } = useLanguage()
    const { t } = useLanguage()
    return (
        <div className=" text-white bg-[#0d0625] w-full rounded-full  p-2 flex justify-center items-center my-5">

            <Swiper
                key={locale}
                slidesPerView={"auto"}
                slidesOffsetBefore={10}
                slidesOffsetAfter={10}
                modules={[Navigation, Autoplay]}
                navigation={{
                    nextEl: ".next-btn1",
                    prevEl: ".prev-btn1",
                }}
                dir={locale === "ar" ? "rtl" : "ltr"}
                spaceBetween={10}
                className="w-full h-full">


                <SwiperSlide className="!w-[280px]   text-center">
                    <div className="h-full w-full  flex   gap-1 items-center">
                        <span className="text-5xl p-1">

                            <LiaCertificateSolid className="w-full h-full text-[#7354ef] " />
                        </span>
                        <h1 className="text-sm ">{t("High_Quality")}</h1>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="!w-[280px]   text-center">
                    <div className="h-full w-full flex  gap-1 items-center">
                        <span className="text-3xl p-1">
                            <FaShippingFast className="w-full h-full  text-[#7354ef] " />
                        </span>
                        <h1 className=" text-sm">{t("Fast_Delivery")}</h1>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="!w-[280px]   text-center">

                    <div className="h-full  w-full flex   gap-1 items-center">
                        <span className="text-3xl p-1">

                            <RiLoopRightFill className="w-full h-full  text-[#7354ef] " />
                        </span>
                        <h1 className=" text-sm ">{t("Easy_Returns")}</h1>
                    </div>
                </SwiperSlide>
                
                <SwiperSlide className="!w-[280px]   text-center">
                    <div className="h-full  flex  w-full gap-1 items-center">
                        <span className="text-3xl p-1">

                            <LuShieldCheck className="w-full h-full  text-[#7354ef]  " />
                        </span>
                        <h1 className=" text-sm ">{t("Original_Products")}</h1>
                    </div>
                </SwiperSlide>
<SwiperSlide className="!w-[280px]   text-center">

                    <div className="h-full  flex w-full  gap-1 items-center">
                        <span className="text-3xl p-1 ">

                            <IoMdPricetags className="w-full h-full text-[#7354ef] " />
                        </span>
                        <h1 className=" text-sm">{t("Best_Prices")}</h1>

                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

    )

}