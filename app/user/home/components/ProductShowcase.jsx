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
      <div className="flex w-full flex-col gap-2 p-5">
        <div className="w-full flex justify-between items-center">

          <h1 className="font-semibold text-lg sticky z-10 py-2 bg-white">{t(title)} </h1>
          <div className="text-xs font-semibold">
            <Link
              href={`/user/products/section/${title === "recentViewed" ? "recentWatched" : "newProducts"}`}
              className={title === "recentViewed" ? "hidden" : "block"}
            >{t("shopMore")} </Link>
            <hr className="bg-red-500 h-[2px] border-none w-auto " />
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-3 ">
          {Products?.map((product, index) => {
            return (

              <div key={index} className={` ${title === "recentViewed" ? index < 3 ? "flex" : "hidden" : index < 7 ? "flex" : "hidden"} gap-2 items-center `}
                onClick={() => {
                  setSelectedProductId(product.item ? product.item.itemId : product.itemId);
                  navigate.push(`/user/productdetails/${product.item ? product.item.nameEn : product.nameEn}/${product.item ? product.item.itemId : product.itemId}`);
                }}
              >
                <div className="relative w-[70px] h-[70px] hover:scale-105 duration-200 cursor-pointer select-none rounded-full ">
                  <Image src={
                    process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                    getThumbnailUrl(product.item ? product.item.images[0]?.imageUrl : product.images[0]?.imageUrl)
                  } alt=""
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-fill rounded-full" />
                </div>
                <div>
                  <span className="text-xs font-semibold cursor-pointer">{locale === "ar" ? product.item ? product.item.nameAr : product.nameEn : product.item ? product.item.nameEn : product.nameEn}</span>
                  {/* <div>{
                    productInfo?.averageRating === 0 ? "" : <StarRating rating={productInfo?.averageRating} />
                  }

                  </div> */}
                  {title === "recentViewed" ?
                    <div className={product.item.averageRating ? "block" : "hidden"}>
                      <StarRating rating={product.item.averageRating} />
                    </div>
                    :
                    <div className={product.averageRating ? "block" : "hidden"}>
                      <StarRating rating={product.averageRating} />
                    </div>
                  }

                  <div className="flex  justify-start gap-2 items-center ">
                    {product.item ? product.item.oldPrice : product.oldPrice ? (
                      <div className="flex gap-2">
                        <span className=" line-through text-xs  flex text-gray-400">
                          {product.item ? product.item.oldPrice?.toLocaleString("en-US") : product.oldPrice?.toLocaleString("en-US")}{" "}{t("currency")}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <span className="text-sm font-semibold text-red-600 ">
                      {product.item ? product.item.price.toLocaleString("en-US") : product.price.toLocaleString("en-US")}.00 {t("currency")}
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