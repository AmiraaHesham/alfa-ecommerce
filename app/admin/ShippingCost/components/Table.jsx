"use client";
import { useLanguage } from "../../../../context/LanguageContext";
import { useEffect, useState } from "react";
import { getRequest, putRequest } from "../../../../utils/requestsUtils";
import { BiEdit } from "react-icons/bi";
import { useRefresh } from "../../../../context/refreshContext";

export default function Table({
  setGovernorate,
  setGovernorateId,
  setShowForm,
}) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const {locale} = useLanguage()
  // const [shippingcost, setShippingCost] = useState([]);
   const [governorates, setGovernorates] = useState([]);
    // const [value, setValue] = useState(null);
    const { refreshKey } = useRefresh();

    const getGovernorate = async () => {
      const res = await getRequest("/api/admin/shipping-rates");
      setGovernorates(res.data);
    };
    useEffect(() => {
      getGovernorate();
    }, [refreshKey]);
  // const getShippingCost = async () => {
  //   try {
  //     const response = await getRequest(" /api/admin/shipping-rates");
  //     const resOrders = response.data || [];
  //     console.log(resOrders)
  //       // setShippingCost(resOrders);
 
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getShippingCost();
  // }, []);
  return (
    <div className="w-full pt-3 md:px-16 xs:px-0 h-full ">
      {/* <div className=""> */}
        {/* XS mobile card layout */}
        <div className="lg:hidden p-3">
          {governorates.map((gov) => {
            return (
              <div
                key={gov.shippingRateId}
                className="bg-white border rounded-xl p-3 mb-3 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <h1 className="text-sm font-semibold min-w-0 break-words">
                    {locale === "ar" ? gov.governorate.nameAr : gov.governorate.nameEn}
                  </h1>
                  <button
                    className="hover:bg-red-200 text-red-600 rounded-full p-2 shrink-0"
                    onClick={() => {
                      setGovernorate(locale === "ar" ? gov.governorate.nameAr : gov.governorate.nameEn);
                      setGovernorateId(gov.shippingRateId);
                      setShowForm(true);
                    }}
                  >
                    <BiEdit />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-base font-bold">
                    {t("shippingCost")} : {gov.shippingCost}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      <div className="hidden lg:block h-[570px] mt-3 w-full  overflow-y-scroll">

        <table className="hidden lg:table w-full  border ">
          <thead className="bg-[#f0eff0] text-xs   text-justify sticky top-0  z-10">
            <tr className="  h-12 ">
              <th className="p-5 ">{t("governorate")}</th>
              <th className=" ">{t("shippingCost")}</th>
              <th className=" "></th>
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full ">
            {loading
              ? // Skeleton rows
                [...Array(7)].map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b h-12">
                    <td className="px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                    </td>

                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </td>
                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </td>
                  </tr>
                ))
              : governorates.map((gov) => {
                  return (
                    <tr
                      key={gov.shippingRateId}
                      className="  border w-full h-14 hover:bg-gray-50 "
                    >
                      <td className="font-semibold  px-5">{locale === "ar"?gov.governorate.nameAr : gov.governorate.nameEn}</td>
                      <td className=" font-semibold px-5">{gov.shippingCost} </td>
                      <td className="text-2xl">
                        <button
                          className="hover:bg-red-200 text-red-600 rounded-full p-2"
                          onClick={() => {
                            setGovernorate(locale === "ar"? gov.governorate.nameAr : gov.governorate.nameEn);
                            setGovernorateId(gov.shippingRateId);
                            setShowForm(true);
                          }}
                        >
                          <BiEdit />
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
