"use client";
import ProductCard from "../../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { postRequest } from "../../../../utils/requestsUtils";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
export default function YouMightLike({categoryId}) {
      const { t } = useLanguage();
      const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);

      const [products, setProducts] = useState([]);
     const getProductsByCategory = async () => {
        try {
          const response = await postRequest(
            "/api/public/items/search",
            {
              page: 0,
              size: 20,
              categoryId: categoryId,
            },
            "",
          );
          setProducts(response.data);
          console.log(categoryId);
          setLoading(false);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      useEffect(()=>{
        getProductsByCategory()
      },[])
return(
      <div className=" bg-[#f6f5f8] p-5">
        <h1 className="md:text-2xl xs:text-lg flex items-center gap-3 font-bold">
          {t("You_might_like")}
        </h1>

        <div className="">
          <Swiper
            key={locale}
            slidesPerView={"auto"}
            slidesOffsetBefore={16}
            slidesOffsetAfter={16}
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".next-btn1",
              prevEl: ".prev-btn1",
            }}
            dir={locale === "ar" ? "rtl" : "ltr"}
            spaceBetween={10}
            className="w-full h-full   "
          >
            {products.map((product) => {
              return (
                <SwiperSlide
                  key={product.itemId}
                  className=" my-10 !w-[220px] rounded-lg select-none"
                >
                  <div className="rounded-lg  flex justify-center  cursor-pointer">
                    <ProductCard productInfo={product} favorite={false} />
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