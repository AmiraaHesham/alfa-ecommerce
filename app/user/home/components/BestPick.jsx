import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext";
import { getThumbnailUrl } from "../../../../utils/functions";
import StarRating from "../../components/StarRating";
import { useIdContext } from "../../../../context/idContext";
import { useRouter } from "next/navigation";

export default function BestPick({ Products }) {
    const { locale } = useLanguage()
    const { t } = useLanguage()
    const {setSelectedProductId} = useIdContext()
    const navigate = useRouter()
    return (
        <div className="w-full  bg-white rounded-2xl p-5">
            <h1 className="font-semibold text-lg sticky z-10 py-2">{t("Best_pick_of_the_week")}</h1>
            <div className=" h-auto grid md:grid-cols-4 xs:grid-cols-2 p-1  gap-5 mt-2">

                {Products?.map((product, index) => {
                    return (

                        <div key={index} className={`${index < 4 ? "flex" : "hidden"}   gap-2 items-center  `}
                            onClick={() => {
                                setSelectedProductId(product.itemId);
                                navigate.push(`/user/productdetails/${product.nameEn}/${product.itemId}`);
                            }}
                        >
                            <div className="relative w-[70px] h-[70px] cursor-pointer select-none rounded-full hover:scale-105 duration-200 ">
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
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-bold cursor-pointer">{locale === "ar" ? product.nameAr : product.nameEn}</span>

                                <StarRating  rating={product.averageRating || 0} />
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
                    );
                })
                }
            </div>
        </div>
    )
}