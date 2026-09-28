import Image from "next/image";
import { getThumbnailUrl } from "../../../../utils/functions";
import { useLanguage } from "../../../../context/LanguageContext";
import StarRating from "../../components/StarRating";
import { useIdContext } from "../../../../context/idContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RecentlyViewed({ Products, title }) {
  const { locale } = useLanguage()
  const { t } = useLanguage()
  const { setSelectedProductId } = useIdContext()
  const navigate = useRouter()
  return (
    <div className="lg:w-[280px] h-full xs:w-full bg-white rounded-3xl">
      <div className="flex w-full flex-col gap-2 p-3">
        <div className="w-full flex justify-between items-center">

          <h1 className="font-semibold  sticky z-10 py-2 bg-white">{t(title)} </h1>
          <div className="text-xs font-semibold">
            <Link
              href={`/user/products/section/${title === "recentViewed" ? "recentWatched" : "newProducts"}`}
              className={title === "recentViewed" ? "hidden" : "block"}
            >{t("shopMore")} </Link>
            <hr className="bg-red-500 h-[2px] border-none w-auto " />
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-5 ">
          {Products?.map((product, index) => {
            const item = product.item || product;

            return (

              <div key={index} className={` ${title === "recentViewed" ? index < 5 ? "flex" : "hidden" : index < 7 ? "flex" : "hidden"} gap-2 items-center `}
                onClick={() => {
                  setSelectedProductId(item.itemId);
                  navigate.push(`/user/productdetails/${item.nameEn}/${item.itemId}`);
                }}
              >
                <div className="relative w-[60px] h-[60px] hover:scale-105 duration-200 cursor-pointer select-none rounded-full ">
                  <Image src={
                    process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                    getThumbnailUrl(item.images?.[0]?.imageUrl)
                  } alt=""
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-fill rounded-full" />
                </div>
                <div>
                  <span className="text-sm font-semibold cursor-pointer">{locale === "ar" ? item.nameAr : item.nameEn}</span>
                  {/* <div>{
                    productInfo?.averageRating === 0 ? "" : <StarRating rating={productInfo?.averageRating} />
                  }

                  </div> */}
                  <div className={item.averageRating ? "block" : "hidden"}>
                    <StarRating rating={item.averageRating} />
                  </div>

                  <div className="flex  justify-start gap-2 items-center ">
                    {item.oldPrice ? (
                      <div className="flex gap-2">
                        <span className=" line-through text-xs  flex text-gray-400">
                          {item.oldPrice?.toLocaleString("en-US")}{" "}{t("currency")}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <span className="text-sm font-semibold text-red-600 ">
                      {item.price?.toLocaleString("en-US")}.00 {t("currency")}
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