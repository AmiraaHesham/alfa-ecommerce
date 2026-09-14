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
  };

  useEffect(() => {
    dashboardPendingOrders();
  }, []);
  const goToOrder = (orderId) => {
    navigate.push(`/admin/orders/OrdersDetails/${orderId}`);
    setSelectedNamePage("Orders Management");
  };
  return (
    <div className="mt-5 w-full ">
      <div className="flex justify-between items-center px-5 h-16 border-s border-t rounded-t-md bg-white">
        <h1 className="lg:text-lg xs:text-sm  font-semibold ">
          {t("recent_orders")}
        </h1>
      </div>
      <div className=" ">
        {/* XS mobile card layout */}
        <div className="sm:hidden bg-white rounded-b-xl border p-3 h-[370px] overflow-y-scroll">
          {pendingOrders.map((order, index) => {
            const date = new Date(order.createdDate);
            const dateOnly = date.toLocaleDateString("en-GB");
            return (
              <div
                key={index}
                className="bg-white border rounded-xl p-3 mb-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => goToOrder(order.orderId)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-red-600">
                      {order.orderCode}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{dateOnly}</div>
                  </div>
                  <span className="text-xs font-semibold text-red-500">
                    {t(order.state)}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t">
                  <span className="w-9 h-9 text-gray-600 shrink-0 bg-gray-50 flex justify-center items-center p-2 rounded-full border ">
                    <FaUserLarge />
                  </span>
                  <div className="min-w-0">
                    <h1 className="font-semibold text-sm truncate">
                      {order.userName}
                    </h1>
                    <h1 className="text-xs  text-gray-500 truncate">
                      {order.userEmail}
                    </h1>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <span className="text-base font-bold">
                    {order.orderTotal.toLocaleString("en-US")} {t("currency")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* SM and larger: existing table */}
        <table className="hidden sm:table bg-white rounded-b-xl w-full h-[370px] border overflow-y-scroll">
          <thead className="bg-[#f0eff0] text-xs  w-full  text-justify sticky top-0  z-10">
            <tr className="h-12">
              <th className=" px-5">{t("order_id")}</th>
              <th className=" ">{t("date")}</th>
              <th className="  ">{t("user")}</th>
              <th className=" ">{t("total")}</th>
              <th className="">{t("state_order")}</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full divide-y divide-gray-200">
            {pendingOrders.map((order, index) => {
              const date = new Date(order.createdDate);
              const dateOnly = date.toLocaleDateString("en-GB");
              return (
                <tr
                  key={index}
                  className="text-red-950 border-t w-full hover:bg-gray-50 cursor-pointer"
                  onClick={() => goToOrder(order.orderId)}
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