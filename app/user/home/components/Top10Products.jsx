import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext";
import { getThumbnailUrl } from "../../../../utils/functions";

export default function topProducts({ Products ,section }) {
    const { locale } = useLanguage()
    const { t } = useLanguage()
    return (
        <div className="w-full h-[440px] bg-white rounded-3xl p-5  overflow-hidden overflow-y-scroll ">
            <h1 className="font-semibold text-lg sticky z-10 ">{t(section)}</h1>

            <div className="w-full h-[350px] mt-5 overflow-hidden overflow-y-scroll gap-5 xs:grid-cols-1 lg:grid-cols-2 grid ">

                {Products?.map((product, index) => {
                    return (

                        <div key={index} className="flex gap-2 items-center cursor-pointer">
                            <div className="relative w-[70px] h-[70px] ">
                                <Image src={
                                    process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                                    getThumbnailUrl(product.mainImageURL)
                                } alt=""
                                    fill
                                    priority
                                    quality={100}
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-fill rounded-full" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold">{locale === "ar" ? product.nameAr : product.nameEn}</span>

                                <div className="flex  justify-start gap-2 items-center ">
                                    {product.oldPrice ? (
                                        <div className="flex gap-2">
                                            <span className=" line-through text-xs  flex text-gray-400">
                                                {product.oldPrice?.toLocaleString("en-US")}{" "}{t("currency")}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="p-[11px]"></span>
                                    )}
                                    <span className="text-sm font-semibold text-red-600 ">
                                        {product.price.toLocaleString("en-US")}.00 {t("currency")}
                                    </span>

                                </div>
                            </div>
                        </div>
                    );
                })
                }

            </div></div>
   
    )
}