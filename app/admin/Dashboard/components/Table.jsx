"use client";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { FaUserLarge } from "react-icons/fa6";
import { useNamePageInAdminContext } from "../../../../context/namePageInAdmin.jsx";

export default function RecentOrders_table() {
  const { t } = useLanguage();
  const { setSelectedNamePage } = useNamePageInAdminContext();

  const [pendingOrders, setPendingOrders] = useState([]);
  const navigate = useRouter();
  const dashboardPendingOrders = async () => {
    const response = await getRequest("/api/admin/dashboard");
    setPendingOrders(response.data.pendingOrders);
    console.log(response.pendingOrders);
  };

  useEffect(() => {
    dashboardPendingOrders();
  }, []);
  return (
    <div className="mt-5 w-full ">
      <div className="flex justify-between items-center px-5 h-16 border-s border-t rounded-t-md bg-white">
        <h1 className="md:text-lg xs:text-sm  font-semibold ">
          {t("recent_orders")}
        </h1>
        {/* <button
          className="md:text-sm xs:text-xs text-red-600"
          onClick={() => {
            navigate.push("/admin/orders");
            setSelectedNamePage("Orders Management");
          }}
        >
          {t("view_all_orders")}
        </button> */}
      </div>
      <div className=" rounded-b-xl w-full h-[370px] border-s border-b overflow-y-scroll ">
        <table className=" xs:w-[220%] lg:w-full   ">
          <thead className="bg-[#F9FAFB] text-xs text-gray-500 w-full  text-justify sticky top-0  z-10">
            <tr className=" text-gray-500 h-12  ">
              <th className="w-[25%] px-5">{t("order_id")}</th>
              <th className="w-[20%] ">{t("date")}</th>
              <th className="w-[30%]  ">{t("user")}</th>
              <th className="w-[15%] ">{t("total")}</th>
              <th className="w-[25%]">{t("state_order")}</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full ">
            {pendingOrders.map((order, index) => {
              const date = new Date(order.createdDate);
              const dateOnly = date.toLocaleDateString("en-GB");
              return (
                <tr
                  key={index}
                  className=" text-red-950 border w-full hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    navigate.push(
                      `/admin/orders/OrdersDetails/${order.orderId}`
                    );
                    setSelectedNamePage("Orders Management");
                  }}
                >
                  <td className="font-semibold text-red-500 px-5">
                    {order.orderCode}
                  </td>
                  <td className="text-sm">{dateOnly}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="w-[40px] text-gray-600 my-2 h-[40px] bg-gray-50 flex justify-center items-center p-2 rounded-full border ">
                          <FaUserLarge />
                        </span>
                      </div>
                      <div>
                        <h1 className="font-semibold text-sm">
                          {order.userName}
                        </h1>
                        <h1 className="text-xs  text-gray-500">
                          {order.userEmail}
                        </h1>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm font-semibold">
                    {order.orderTotal.toLocaleString("en-US")} {t("currency")}
                  </td>
                  <td className="text-sm font-semibold text-red-500">
                    {t(order.state)}
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
