"use client";
import { MdCancel } from "react-icons/md";
import { useLanguage } from "../../../../context/LanguageContext";
import { putRequest } from "../../../../utils/requestsUtils";
import { useState } from "react";
import { useRefresh } from "../../../../context/refreshContext";

export default function ShippingCostForm({ govName, govId, setShowForm }) {
  const [shippingCost, setShippingCost] = useState(0);
  const { triggerRefresh } = useRefresh();

  const saveShippingCost = async () => {
    // console.log(govId , govName , Number(shippingCost))
    try {
      await putRequest(`/api/admin/shipping-rates/${govId}`, {
        shippingCost: Number(shippingCost),
      } , t("message"));
      triggerRefresh();
      setShowForm(false);
    } catch (err) {
    }
  };
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[400px] h-[350px] bg-white rounded-md flex flex-col justify-start items-start p-5 gap-5 ">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t("EditShippingCost")} </h1>
          <button
            className="text-2xl hover:text-red-500"
            onClick={() => setShowForm(false)}
          >
            {" "}
            <MdCancel />{" "}
          </button>
        </div>

        <div className="w-full flex flex-col h-full justify-center gap-10 p-10 items-center ">
          <div className="w-full flex justify-center items-baseline">
            {/* <label htmlFor="governorate" className="text-sm font-semibold ">{t("governorate")}</label> */}
            <h1 className="text-3xl font-bold"> {govName}</h1>
          </div>
          <div className="w-full flex justify-between items-center">
            <label htmlFor="shippingCost" className="font-semibold mr-2 text-">
              {t("shippingcost")}:
            </label>
            <input
              id="shippingCost"
              name="shippingCost"
              className="border rounded-md p-2 w-32"
              onChange={(e) => setShippingCost(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center ">
          <button
            className="bg-red-600 w-full rounded-md h-8 text-white"
            onClick={() => {
              saveShippingCost();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
