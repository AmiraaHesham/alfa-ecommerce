"use client"
import { IoCloudUploadSharp } from "react-icons/io5"
import { useLanguage } from "../../../../context/LanguageContext"
import AdsForm from "./AdsForm"
import { useEffect, useState } from "react"
import { getRequest } from "../../../../utils/requestsUtils"
import { useRefresh } from "../../../../context/refreshContext.jsx";
import Image from "next/image"

export default function Ads() {
  const { refreshKey } = useRefresh();

  const { t, locale } = useLanguage()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [adNumber, setAdNumber] = useState()
  const [offerId, setOfferId] = useState()
  const [options, setOptions] = useState([]);
  const [ads, setAds] = useState({
    ad1: {
      img: "",
      id: "",
    },
    ad2: {
      img: "",
      id: "",
    },
    ad3: {
      img: "",
      id: "",
    },
    ad4: {
      img: "",
      id: "",
    },
    ad5: {
      img: "",
      id: "",
    },
  })

  const fetchRecentItems = async () => {
    const res = await getRequest("/api/public/items/recent");
    const products = res?.data || [];
    setOptions(
      products.map((product) => ({
        value: product.itemId,
        label: locale === "ar" ? product.nameAr : product.nameEn,
        product,
      }))
    );
  };

  const getAdsData = async () => {
    const res = await getRequest("/api/public/offers")
    console.log(res)
    const respose = res.data
    respose.forEach((res) => {
      if (res.number === 1) setAds((prev) => ({
        ...prev,
        ad1: {
          img: res.imageUrl,
          id: res.offerId
        }
      }))
      if (res.number === 2) setAds((prev) => ({
        ...prev,
        ad2: {
          img: res.imageUrl,
          id: res.offerId
        }
      }))
      if (res.number === 3) setAds((prev) => ({
        ...prev,
        ad3: {
          img: res.imageUrl,
          id: res.offerId
        }
      }))
      if (res.number === 4) setAds((prev) => ({
        ...prev,
        ad4: {
          img: res.imageUrl,
          id: res.offerId
        }
      }))
      if (res.number === 5) setAds((prev) => ({
        ...prev,
        ad5: {
          img: res.imageUrl,
          id: res.offerId
        }
      }))
    })
  }

  useEffect(() => {
    getAdsData()
  }, [refreshKey]);
  return (
    <>
      <AdsForm setIsFormOpen={setIsFormOpen} isFormOpen={isFormOpen} productsOptions={options} adNumber={adNumber} offerId={offerId} mode={offerId ? "update" : "create"} />
      <div className="w-full h-full grid md:grid-cols-5 xs:grid-cols-1 gap-5">
        <div className="w-full h-full">
          <h1 className="mb-4 text-xl font-semibold">{t("Advert1")} </h1>
          <div className="w-[200px] h-[200px] rounded-3xl bg-white p-5 cursor-pointer"
            onClick={() => {
              setIsFormOpen(true)
              setAdNumber(1)
              fetchRecentItems()
              setOfferId(ads.ad1.id)
            }}
          >
            {ads.ad1 ? <div className="w-full h-full relative">
              <Image
                src={process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + ads.ad1.img}
                alt=""
                fill
                className="object-fill rounded-3xl"
              />
            </div> :
              <label className="border-dashed flex justify-center p-5 items-center border-2 h-full w-full rounded-3xl cursor-pointer hover:bg-gray-100">
                <div
                  id="label-uplod"
                  className="flex flex-col justify-center items-center "
                >
                  <span className="text-2xl bg-white p-2 rounded-full text-red-500">
                    <IoCloudUploadSharp />
                  </span>
                  <span className="flex flex-col gap-2 items-center">
                    <div className="text-center text-sm">
                      <h1 className="mb-2">{t("click_to_upload")}</h1>
                      <h2 className="text-[10px] text-gray-500">
                        PNG, JPG or GIF
                      </h2>
                    </div>
                  </span>
                </div>
              </label>
            }


            <input
              type="file"
              accept="image/*"
              // onChange={handelupload}
              className="hidden"
              id="fileInput"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <h1 className="mb-4 text-xl font-semibold ">{t("Advert2")} </h1>
          <div className="w-[200px] h-[300px] rounded-3xl bg-white p-5   cursor-pointer"
            onClick={() => {
              setIsFormOpen(true)
              setAdNumber(2)
              fetchRecentItems()
              setOfferId(ads.ad2.id)
            }}
          >
            {ads.ad2 ? <div className="w-full h-full relative">
              <Image
                src={process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + ads.ad2.img}
                alt=""
                fill
                className="object-fill rounded-3xl"
              />
            </div> : <label className="border-dashed flex justify-center p-5 items-center border-2 h-full w-full rounded-3xl cursor-pointer hover:bg-gray-100">
              <div
                id="label-uplod"
                className="flex flex-col justify-center items-center "
              >
                <span className="text-2xl bg-white p-2 rounded-full text-red-500">
                  <IoCloudUploadSharp />
                </span>
                <span className="flex flex-col gap-2 items-center">
                  <div className="text-center text-sm">
                    <h1 className="mb-2">{t("click_to_upload")}</h1>
                    <h2 className="text-[10px] text-gray-500">
                      PNG, JPG or GIF
                    </h2>
                  </div>
                </span>
              </div>
            </label>}


            <input
              type="file"
              accept="image/*"
              // onChange={handelupload}
              className="hidden"
              id="fileInput"
            />
          </div>
        </div>
        
        <div className="w-full h-full">
          <h1 className="mb-4 text-xl font-semibold">{t("Advert3")} </h1>
          <div className="w-[200px] h-[200px] rounded-3xl bg-white p-5 cursor-pointer"
            onClick={() => {
              setIsFormOpen(true)
              setAdNumber(3)
              fetchRecentItems()
              setOfferId(ads.ad3.id)

            }}>
            {
              ads.ad3 ? <div className="w-full h-full relative">
                <Image
                  src={process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + ads.ad3.img}
                  alt=""
                  fill
                  className="object-fill rounded-3xl"
                />
              </div> :
                <label className="border-dashed flex justify-center p-5 items-center border-2 h-full w-full rounded-3xl cursor-pointer hover:bg-gray-100">
                  <div
                    id="label-uplod"
                    className="flex flex-col justify-center items-center "
                  >
                    <span className="text-2xl bg-white p-2 rounded-full text-red-500">
                      <IoCloudUploadSharp />
                    </span>
                    <span className="flex flex-col gap-2 items-center">
                      <div className="text-center text-sm">
                        <h1 className="mb-2">{t("click_to_upload")}</h1>
                        <h2 className="text-[10px] text-gray-500">
                          PNG, JPG or GIF
                        </h2>
                      </div>
                    </span>
                  </div>
                </label>
            }


            <input
              type="file"
              accept="image/*"
              // onChange={handelupload}
              className="hidden"
              id="fileInput"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <h1 className="mb-4 text-xl font-semibold">{t("Advert4")} </h1>
          <div className="w-[200px] h-[200px] rounded-3xl bg-white p-5 cursor-pointer"
            onClick={() => {
              setIsFormOpen(true)
              setAdNumber(4)
              fetchRecentItems()
              setOfferId(ads.ad4.id)

            }}>
            {
              ads.ad4 ? <div className="w-full h-full relative">
                <Image
                  src={process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + ads.ad4.img}
                  alt=""
                  fill
                  className="object-fill rounded-3xl"
                />
              </div>
                :
                <label className="border-dashed flex justify-center p-5 items-center border-2 h-full w-full rounded-3xl cursor-pointer hover:bg-gray-100">
                  <div
                    id="label-uplod"
                    className="flex flex-col justify-center items-center "
                  >
                    <span className="text-2xl bg-white p-2 rounded-full text-red-500">
                      <IoCloudUploadSharp />
                    </span>
                    <span className="flex flex-col gap-2 items-center">
                      <div className="text-center text-sm">
                        <h1 className="mb-2">{t("click_to_upload")}</h1>
                        <h2 className="text-[10px] text-gray-500">
                          PNG, JPG or GIF
                        </h2>
                      </div>
                    </span>
                  </div>
                </label>
            }


            <input
              type="file"
              accept="image/*"
              // onChange={handelupload}
              className="hidden"
              id="fileInput"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <h1 className="mb-4 text-xl font-semibold">{t("Advert5")} </h1>
          <div className="w-[200px] h-[200px] rounded-3xl bg-white p-5 cursor-pointer"
            onClick={() => {
              setIsFormOpen(true)
              setAdNumber(5)
              fetchRecentItems()
              setOfferId(ads.ad5.id)

            }}>
            {
              ads.ad5 ? <div className="w-full h-full relative">
                <Image
                  src={process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + ads.ad5.img}
                  alt=""
                  fill
                  className="object-fill rounded-3xl"
                />
              </div> :
                <label className="border-dashed flex justify-center p-5 items-center border-2 h-full w-full rounded-3xl cursor-pointer hover:bg-gray-100">
                  <div
                    id="label-uplod"
                    className="flex flex-col justify-center items-center "
                  >
                    <span className="text-2xl bg-white p-2 rounded-full text-red-500">
                      <IoCloudUploadSharp />
                    </span>
                    <span className="flex flex-col gap-2 items-center">
                      <div className="text-center text-sm">
                        <h1 className="mb-2">{t("click_to_upload")}</h1>
                        <h2 className="text-[10px] text-gray-500">
                          PNG, JPG or GIF
                        </h2>
                      </div>
                    </span>
                  </div>
                </label>
            }
            <input
              type="file"
              accept="image/*"
              // onChange={handelupload}
              className="hidden"
              id="fileInput"
            />
          </div>
        </div>
      </div>
    </>
  )
}