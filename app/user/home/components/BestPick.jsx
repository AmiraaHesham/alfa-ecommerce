import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext";
import { getThumbnailUrl } from "../../../../utils/functions";

export default function BestPick({ Products }) {
    const { locale } = useLanguage()
    const { t } = useLanguage()
    return (
        <div className="w-full  bg-white rounded-2xl p-5">
            <h1 className="font-semibold text-lg sticky z-10 py-2">{t("Best_pick_of_the_week")}</h1>
            <div className=" h-[200px] overflow-hidden overflow-y-scroll grid md:grid-cols-2 xs:grid-cols-1 gap-5 mt-2">

            {Products?.map((product, index) => {
                return (

                    <div key={index} className={`flex  gap-2 items-center `}>
                        <div className="relative w-[70px] h-[70px]">
                            <Image src={
                                process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                                getThumbnailUrl(product.mainImageURL)
                            } alt=""
                                fill
                                priority
                                quality={100}
                                sizes="100vw"
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
        </div>
        </div>
    )
}