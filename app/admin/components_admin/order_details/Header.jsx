"use client";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { MdEditNote } from "react-icons/md";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { useEffect, useState } from "react";
import { useOrderDetailsContext } from "../../../../context/orderDetailsContext.jsx";

export default function Orders_Details({ orderId , orderType }) {
  const { t } = useLanguage();
  const [orderCode, setOrderCode] = useState("");
  const { selectedOrderState } = useOrderDetailsContext();
  const { selectedOrderCode } = useOrderDetailsContext();
  const { selectedOrderDate } = useOrderDetailsContext();

  const date = new Date(selectedOrderDate);
  const fullDateTime = date.toLocaleDateString("en-GB");

   const orderItem = async () => {
      const res = await getRequest(`/api/${orderType}/${orderId}`);
      setOrderCode(res.code)
    };
  useEffect(() => {
    orderItem();
  }, []);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full gap-3">
        <h1 className="md:text-3xl  xs:text-2xl font-semibold">
          {" "}
          {selectedOrderCode} #
        </h1>
        <h1
          className={`text-sm h-10 flex items-center justify-center w-[120px] ${
            selectedOrderState === "PROCESSING"
              ? "text-red-700 bg-red-100"
              : "text-red-700 bg-red-100"
          } font-semibold py-2 px-4 text-center rounded-3xl`}
        >
          {t(selectedOrderState)}
        </h1>
      </div>
      <h1 className="text-xs text-gray-600 mt-3">Placed on {fullDateTime}</h1>
    </div>
  );
}
