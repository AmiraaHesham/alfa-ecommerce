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
    <div className="w-full pt-3 md:px-16 xs:px-0 h-full bg-[#F9FAFB]">
      <div className=" rounded-xl w-full h-[580px]   border  overflow-hidden xs:overflow-x-scroll md:overscroll-x-none   overflow-y-scroll ">
        <table className="w-full   ">
          <thead className="bg-[#F9FAFB]  w-full text-xs text-gray-500  sticky top-0  z-10 text-justify">
            <tr className=" text-gray-500 h-12 ">
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
                      <td className="text-sm font-semibold px-5">{gov.shippingCost} </td>
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
