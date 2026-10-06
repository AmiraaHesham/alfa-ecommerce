"use client";
import ProductCard from "../../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { postRequest } from "../../../../utils/requestsUtils";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
export default function YouMightLike({categoryId}) {
      const { t } = useLanguage();
      const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);

      const [products, setProducts] = useState([]);
     const getProductsByCategory = useCallback(async () => {
        try {
                    console.log(categoryId);

          const response = await postRequest(
            "/api/public/items/search",
            {
              page: 0,
              size: 20,
              categoryId: categoryId,
            },
            "",
          );
          setProducts(response.data.content);
          setLoading(false);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, [categoryId]);
      useEffect(()=>{
        getProductsByCategory()
      },[getProductsByCategory])
return(
      <div className=" bg-[#f6f5f8] py-10">
        <h1 className="md:text-2xl xs:text-lg flex items-center gap-3 font-bold">
          {t("You_might_like")}
        </h1>

        <div className="">
          <Swiper
            key={locale}
            slidesPerView={"auto"}
           
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
                  className=" my-5 !w-[220px] rounded-lg select-none"
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