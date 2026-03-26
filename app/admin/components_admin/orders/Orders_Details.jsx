"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { FaBox, FaCheck, FaShoppingBag, FaTruck } from "react-icons/fa";

export default function Orders_Details() {
  const { t } = useLanguage();
  const [ordersState, setOrdersState] = useState([]);
  const ordersStates = async () => {
    const response = await getRequest("/api/admin/orders/states");
    setOrdersState(response);
  };
  useEffect(() => {
    ordersStates();
  }, []);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full   grid md:grid-cols-4 xs:grid-cols-2 lg:gap-10 xs:gap-3">
        {ordersState.map((state, index) => {
          return (
            <div key={index} className="  p-4 rounded-lg border bg-white">
              <div className="flex items-center gap-3">
                {state.state === "PENDING" ? (
                  <span className="bg-orange-200 text-orange-600 md:text-xl xs:text-lg  p-2 rounded-md">
                    <FaShoppingBag />
                  </span>
                ) : state.state === "DELIVERED" ? (
                  <span className="bg-green-200 text-green-600 md:text-xl xs:text-lg  p-2 rounded-md">
                    <FaCheck />
                  </span>
                ) : state.state === "PROCESSING" ? (
                  <span className="bg-blue-200 text-blue-600 md:text-xl xs:text-lg  p-2 rounded-md">
                    <FaBox />
                  </span>
                ) : state.state === "SHIPPED" ? (
                  <span className="bg-yellow-200 text-yellow-600 md:text-xl xs:text-lg  p-2 rounded-md">
                    <FaTruck />
                  </span>
                ) : null}
                <h1 className="text-lg mb-3 text-gray-500 font-semibold">
                  {t(state.state)}
                </h1>
              </div>
              <h2 className={`text-2xl font-bold  `}>{state.count}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
