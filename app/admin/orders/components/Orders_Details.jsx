"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { FaBox, FaCheck, FaShoppingBag, FaTimes, FaTruck } from "react-icons/fa";

export default function Orders_Details() {
  const { t } = useLanguage();
  const [ordersState, setOrdersState] = useState({
    PENDING: 0,
    PROCESSING: 0,
    SHIPPED: 0,
    DELIVERED: 0,
    CANCELLED: 0
  });
  const ordersStates = async () => {
    const response = await getRequest("/api/admin/orders/states");
    response.data.map((state) => {
      setOrdersState((prevState) => ({
        ...prevState,
        [state.state]: state.count,
      }));
    });
  }


  useEffect(() => {
    ordersStates();
  }, []);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full grid md:grid-cols-5 xs:grid-cols-2 lg:gap-10 xs:gap-3">
        {/* {ordersState.map((state, index) => {
          return (
           
          );
        })} */}
         <div  className="p-4 rounded-lg border bg-white">
              <div className="flex items-center gap-3">
              
                  <span className="bg-orange-200 text-orange-600 md:text-lg xs:text-sm  p-2 rounded-md">
                    <FaShoppingBag />
                  </span>
             
                <h1 className="text-base mb-3 text-gray-500 font-semibold">
                  {t("PENDING")}
                </h1>
              </div>
              <h2 className={`text-2xl font-bold  mt-2 `}>{ordersState.PENDING}</h2>
            </div>
             <div  className="  p-4 rounded-lg border bg-white">
              <div className="flex items-center gap-3">
              
                  <span className="bg-blue-200 text-blue-600 md:text-lg xs:text-sm  p-2 rounded-md">
                     <FaBox />
                  </span>
             
                <h1 className="text-base mb-3 text-gray-500 font-semibold">
                  {t("PROCESSING")}
                </h1>
              </div>
              <h2 className={`text-2xl font-bold  mt-2 `}>{ordersState.PROCESSING}</h2>
            </div>

             <div  className="  p-4 rounded-lg border bg-white">
              <div className="flex items-center gap-3">
              
                  <span className="bg-yellow-200 text-yellow-600 md:text-lg xs:text-sm  p-2 rounded-md">
                   <FaTruck />
                  </span>
             
                <h1 className="text-base mb-3 text-gray-500 font-semibold">
                  {t("SHIPPED")}
                </h1>
              </div>
              <h2 className={`text-2xl font-bold   mt-2`}>{ordersState.SHIPPED}</h2>
            </div>
             <div  className="  p-4 rounded-lg border bg-white">
              <div className="flex items-center gap-3">
              
                  <span className="bg-green-200 text-green-600 md:text-lg xs:text-sm  p-2 rounded-md">
                     <FaCheck />
                  </span>
             
                <h1 className="text-base mb-3 text-gray-500 font-semibold">
                  {t("DELIVERED")}
                </h1>
              </div>
              <h2 className={`text-2xl font-bold   mt-2`}>{ordersState.DELIVERED}</h2>
            </div>

             <div  className=" p-4 rounded-lg border bg-white">
              <div className="flex items-center gap-3">
              
                  <span className="bg-red-200 text-red-600 md:text-lg xs:text-sm  p-2 rounded-md">
                    <FaTimes />
                  </span>
             
                <h1 className="text-base mb-3 text-gray-500 font-semibold">
                  {t("CANCELLED")}
                </h1>
              </div>
              <h2 className={`text-2xl font-bold   mt-2`}>{ordersState.CANCELLED}</h2>
            </div>
          
      </div>
    </div>
  );
}
