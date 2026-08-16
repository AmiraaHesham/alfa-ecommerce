"use client";
import { FaHourglassStart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoFileTray } from "react-icons/io5";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { useEffect, useState } from "react";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { useRouter } from "next/navigation.js";
import { useNamePageInAdminContext } from "../../../../context/namePageInAdmin.jsx";
import { useIdContext } from "../../../../context/idContext.jsx";

export default function Dashboard_Details() {
  const { t } = useLanguage();
  const [activeItems, setActiveItems] = useState(0);
  const [newUsers, setNewUsers] = useState();
  const [pendingOrders, setPendingOrders] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const navigate = useRouter();
  const { setSelectedState } = useIdContext();

  const { setSelectedNamePage } = useNamePageInAdminContext();
  const dashboardPendingOrders = async () => {
    const response = await getRequest("/api/admin/dashboard");
    const resData = response.data;

    setPendingOrders(resData.pendingOrders.length)

    setNewUsers(resData.newUsers);
    setActiveItems(resData.activeItems);

    setOrdersCount(resData.ordersCount);
  };

  useEffect(() => {
    dashboardPendingOrders();
  }, []);

  return (
    <div className="w-full grid lg:grid-cols-4 xs:grid-cols-2 lg:gap-10 xs:gap-2 ">
      <div
        className="bg-white border flex flex-col gap-5 rounded-lg p-3 cursor-pointer"
        onClick={() => {
          navigate.push("/admin/orders");
          setSelectedNamePage("Orders Management");
          setSelectedState("PENDING");
        }}
      >
        <div className="flex items-center  gap-2">
          <span className="md:text-2xl xs:text-lg  p-1 rounded-md text-red-600 bg-red-100">
            <IoMdCart />
          </span>
          <h1 className="md:text-lg xs:text-xs text-gray-500 font-semibold">
            {t("total_orders")}
          </h1>
        </div>
        <h1 className="md:text-2xl xs:text-lg  font-bold">{ordersCount}</h1>
      </div>

      <div className="bg-white border border-orange-300 flex flex-col gap-5 rounded-lg p-3">
        <div
          className="flex items-center  gap-2"
          onClick={() => {
            navigate.push("/admin/orders");
            setSelectedNamePage("Orders Management");
          }}
        >
          <span className="md:text-2xl xs:text-lg text-orange-600 bg-orange-100 p-1 rounded-md">
            <FaHourglassStart />
          </span>
          <h1 className="md:text-lg xs:text-xs  text-gray-500 font-semibold">
            {t("pending_orders")}
          </h1>
        </div>
        <h1 className="md:text-2xl xs:text-lg font-bold">{pendingOrders}</h1>
      </div>

      <div className="bg-white border flex flex-col gap-5 rounded-lg p-3">
        <div className="flex items-center  gap-2">
          <span className="md:text-2xl xs:text-lg text-purple-600 bg-purple-100 p-1 rounded-md">
            <IoFileTray />
          </span>
          <h1 className="md:text-lg xs:text-xs  text-gray-500 font-semibold">
            {t("active_products")}
          </h1>
        </div>
        <h1 className="md:text-2xl xs:text-lg font-bold">{activeItems}</h1>
      </div>
      <div className="bg-white border flex flex-col gap-5 rounded-lg p-3">
        <div className="flex items-center  gap-2">
          <span className="md:text-2xl xs:text-lg text-pink-600 bg-pink-100 p-1 rounded-md">
            <AiOutlineUsergroupAdd />
          </span>
          <h1 className="md:text-lg xs:text-xs  text-gray-500 font-semibold">
            {t("new_users")}
          </h1>
        </div>
        <h1 className="md:text-2xl xs:text-lg font-bold">+{newUsers}</h1>
      </div>
      {/* <div >
                  <div>
                    <span><FaHourglassStart /></span>

                  </div>
                </div> */}
    </div>
  );
}
