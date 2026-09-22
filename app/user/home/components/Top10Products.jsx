import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext";
import { getThumbnailUrl } from "../../../../utils/functions";
import StarRating from "../../components/StarRating";
import Link from "next/link";

export default function Top10Products({ Products, section }) {
    const { locale } = useLanguage()
    const { t } = useLanguage()
    return (
        <div className="w-full h-auto bg-white rounded-3xl p-5 ">
            <div className="w-full h-full flex justify-between items-center">
                <h1 className="font-semibold text-lg sticky z-10 ">{t(section)}</h1>
                <div className="text-xs font-semibold">
                    <Link href="/user/products/section/newProducts">{t("shopMore")} </Link>
                    <hr className="bg-red-500 h-[2px] border-none w-auto " />
                </div>
            </div>
            <div className="w-full  mt-5 overflow-hidden overflow-y-scroll gap-4 xs:grid-cols-1 md:grid-cols-2 grid ">

                {Products?.map((product, index) => {
                    return (

                        <div key={index} className={`${index < 8 ? "flex" :"hidden"} gap-2 items-center cursor-pointer w-full`}>
                            <div className="relative w-[60px] h-[60px] ">
                                <Image src={
                                    process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                                    getThumbnailUrl(product.images[0]?.imageUrl)
                                } alt=""
                                    fill
                                    priority
                                    quality={100}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-fill rounded-full" />
                            </div>
                            <div>

                                <span className="text-sm font-semibold">{locale === "ar" ? product.nameAr : product.nameEn}</span>
                                <div className={product.averageRating ? "block" : "hidden"}>
                                    <StarRating rating={product.averageRating} /></div>

                                <div className="flex  justify-start gap-2 items-center ">
                                    {product.oldPrice ? (
                                        <div className="flex gap-2">
                                            <span className=" line-through text-xs  flex text-gray-400">
                                                {product.oldPrice?.toLocaleString("en-US")}{" "}{t("currency")}
                                            </span>
                                        </div>
                                    ) : (
                                        ""
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