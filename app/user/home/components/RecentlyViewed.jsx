import Image from "next/image";
import { getThumbnailUrl } from "../../../../utils/functions";
import { useLanguage } from "../../../../context/LanguageContext";
import StarRating from "../../components/StarRating";

export default function RecentlyViewed({ Products }) {
    const {locale} = useLanguage()
    const{t}=useLanguage()
    return (
        <div className="lg:w-[300px] xs:w-full bg-white rounded-3xl">
            <div className="flex w-full flex-col gap-5 p-5">
                <h1 className="font-semibold text-lg sticky z-10 py-2 bg-white">{t("recentViewed")} </h1>
<div className="w-full h-[250px] flex flex-col gap-3 overflow-hidden overflow-y-scroll">
      {Products?.map((product, index) => {
                    return (

                        <div className={`flex gap-2 items-center `}>
                            <div className="relative w-[70px] h-[70px]">
                                <Image src={
                                    process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                                    getThumbnailUrl(product.item.mainImageURL)
                                } alt=""
                                    fill
                                    priority
                                    quality={100}
                                    sizes="100vw"
                                    className="object-fill rounded-full" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold">{locale === "ar"?product.item.nameAr :product.item.nameEn}</span>
                           <div>
<StarRating rating={10} maxRating={10}/>
        </div>
                           <div className="flex  justify-start gap-2 items-center ">
                  {product.item.oldPrice ? (
                    <div className="flex gap-2">
                      <span className=" line-through text-xs  flex text-gray-400">
                        {product.item.oldPrice?.toLocaleString("en-US")}{" "}{t("currency")}
                      </span>
                    </div>
                  ) : (
                    <span className="p-[11px]"></span>
                  )}
                  <span className="text-sm font-semibold text-red-600 ">
                    {product.item.price.toLocaleString("en-US")}.00 {t("currency")}
                  </span>

                </div>
                            </div>
                        </div>
                    );
                })
                }
</div>
              

            </div>
        </div>
    )
}