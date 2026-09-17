"use client";
import { MdFilterList, MdOutlineDownloading } from "react-icons/md";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { postRequest } from "../../../../utils/requestsUtils.js";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import Select from "react-select";
import { useIdContext } from "../../../../context/idContext.jsx";
export default function Orders_Table() {
  const { t } = useLanguage();
  const navigate = useRouter();
  const { selectedState, setSelectedState } = useIdContext();

  // const [state, setState] = useState(selectedPendingState || "");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageNum = useRef(0);
  const searchInputRef = useRef(null);

  const getAllOrders = async () => {
    try {
      const response = await postRequest(
        "/api/orders/search",
        {
          page: pageNum.current,
          size: 15,
          searchText: searchInputRef.current.value,
          orderState: selectedState,
        },
        "",
      );
      const resOrders = response.data.content || [];

      if (pageNum.current === 0) {
        setOrders(resOrders);
      } else setOrders((prev) => [...prev, ...resOrders]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const nextStatus = {
    PENDING: [{ value: "PROCESSING", label: t("PROCESSING") }],
    PROCESSING: [{ value: "SHIPPED", label: t("SHIPPED") }],
    SHIPPED: [{ value: "DELIVERED", label: t("DELIVERED") }],
    DELIVERED: [],
  };
  const updateOrderState = async (orderId, newState) => {
    try {
      if (newState === "CANCELED") {
        ("");
      } else {
        const res = await postRequest(
          `/api/admin/orders/${orderId}/changeState/${newState}`,
          "",
          t("message"),
        );
        if (res.success === true) {
          setOrders((prev) => {
            const updated = prev.map((item) =>
              item.orderId === orderId ? { ...item, state: newState } : item,
            );

            return updated;
          });
        }
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    getAllOrders();
  }, [selectedState]);
  const statusSelect = (order, selectClass) => (
    <Select
      value={{
        value: order.state,
        label: t(order.state),
      }}
      onChange={(option) => updateOrderState(order.orderId, option.value)}
      options={nextStatus[order.state] || []}
      isSearchable={false}
      className={selectClass}
      styles={{
        control: (base) => ({
          ...base,

          backgroundColor: "#f3f4f6",
          border: "none",
          borderRadius: "0.375rem",
          minHeight: "36px",
          cursor: "pointer",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#dc2626",
          },
          "&:focus": {
            borderColor: "#b91c1c",
            boxShadow: "0 0 0 3px rgba(185, 28, 28, 0.2)",
            // outline: "none",
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "#dc2626"
            : state.isFocused
              ? "#fee2e2"
              : "#ffffff",
          color: state.isSelected ? "#ffffff" : "#374151",
          cursor: "pointer",
          // padding: "8px 12px",
          fontSize: "14px",
          "&:hover": {
            backgroundColor: state.isSelected ? "#dc2626" : "#fee2e2",
          },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#ffffff",
          borderRadius: "0.375rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          zIndex: 9999,
        }),
        placeholder: (base) => ({
          ...base,
          color: "#374151",
          fontSize: "14px",
          fontWeight: "600",
        }),
        singleValue: (base) => ({
          ...base,
          color:
            order.state === "PROCESSING"
              ? "#3b82f6"
              : order.state === "SHIPPED"
                ? "#eab308"
                : order.state === "PENDING"
                  ? "#c2410c"
                  : order.state === "CANCELLED"
                    ? "#f21818"
                    : "#22c55e",
          fontSize: "14px",
          fontWeight: "600",
        }),
        input: (base) => ({
          ...base,
          color: "#374151",
        }),
      }}
    />
  );
  return (
    <div>
      <div className="w-full  bg-white mt-3 rounded-lg border flex md:flex-row xs:flex-col gap-5  items-start  p-4 ">
        <div className="flex items-center justify-between border px-1 rounded-md w-[300px] bg-gray-100">
          <input
            type="text"
            ref={searchInputRef}
            placeholder={t("search")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getAllOrders();
              }
            }}
            className="bg-none outline-none placeholder:text-xs h-8   bg-gray-100 p-3 rounded-lg"
          />
          <button
            className="text-lg bg-red-300 hover:bg-red-500 p-1 text-white  rounded-md"
            onClick={getAllOrders}
          >
            <IoMdSearch />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center border px-3 rounded-md bg-gray-100 h-9">
            <span className="text-gray-400 text-lg ">
              <MdFilterList />
            </span>
            <Select
              value={
                selectedState
                  ? {
                    value: selectedState,
                    label: t(selectedState),
                  }
                  : null
              }
              onChange={(option) => {
                setSelectedState(option ? option.value : "");
              }}
              options={[
                { value: "", label: t("all_statuses") },
                { value: "PENDING", label: t("PENDING") },
                { value: "PROCESSING", label: t("PROCESSING") },
                { value: "SHIPPED", label: t("SHIPPED") },
                { value: "DELIVERED", label: t("DELIVERED") },
              ]}
              placeholder={t("all_statuses")}
              isClearable
              isSearchable={false}
              className="w-[200px] text-sm font-semibold"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#f3f4f6",
                  border: "none",
                  borderRadius: "0.375rem",
                  minHeight: "36px",
                  cursor: "pointer",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#dc2626",
                  },
                  "&:focus": {
                    borderColor: "#b91c1c",
                    boxShadow: "0 0 0 3px rgba(185, 28, 28, 0.2)",
                    // outline: "none",
                  },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#dc2626"
                    : state.isFocused
                      ? "#fee2e2"
                      : "#ffffff",
                  color: state.isSelected ? "#ffffff" : "#374151",
                  cursor: "pointer",
                  // padding: "8px 12px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: state.isSelected ? "#dc2626" : "#fee2e2",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#ffffff",
                  borderRadius: "0.375rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  zIndex: 9999,
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#374151",
                  fontSize: "14px",
                  fontWeight: "600",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#374151",
                  fontSize: "14px",
                  fontWeight: "600",
                }),
                input: (base) => ({
                  ...base,
                  color: "#374151",
                }),
              }}
            />
          </div>
        </div>
      </div>
      {/* <div className="  "> */}
      {/* XS mobile card layout */}
      <div className="lg:hidden mt-5">
        {loading
          ? // Skeleton cards
          [...Array(6)].map((_, index) => (
            <div
              key={`mobile-skeleton-${index}`}
              className="bg-white border rounded-xl p-3 mb-3"
            >
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16 mt-2"></div>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t">
                <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-28"></div>
                  <div className="h-2 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mt-3"></div>
            </div>
          ))
          : orders.map((order, index) => {
            const date = new Date(order.createdDate);
            const dateOnly = date.toLocaleDateString("en-GB");
            return (
              <div
                key={`mobile-${index}`}
                className="bg-white border rounded-xl p-3 mb-3 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span
                      className="text-sm font-bold text-red-600 cursor-pointer"
                      onClick={() =>
                        navigate.push(
                          `/admin/orders/OrdersDetails/${order.orderId}`,
                        )
                      }
                    >
                      {order.code}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{dateOnly}</div>
                  </div>
                  <span className="shrink-0 w-[150px]">
                    {statusSelect(order, "w-full xs:text-xs text-sm font-semibold")}
                  </span>
                </div>
                <div
                  className="flex items-center gap-3 mt-3 pt-3 border-t cursor-pointer"
                  onClick={() =>
                    navigate.push(
                      `/admin/orders/OrdersDetails/${order.orderId}`,
                    )
                  }
                >
                  <span className="w-9 h-9 text-gray-600 shrink-0 bg-gray-50 flex justify-center items-center p-2 rounded-full border ">
                    <FaUserLarge />
                  </span>
                  <div className="min-w-0">
                    <h1 className="font-semibold text-sm truncate">
                      {order.user.firstName + " " + order.user.lastName}
                    </h1>
                    <h1 className="text-xs  text-gray-500 truncate">
                      {order.user.email}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center gap-3">
                    <span
                      className="py-1 px-3 font-semibold rounded-full bg-red-100 text-red-600 text-xs cursor-pointer"
                      onClick={() =>
                        navigate.push(
                          `/admin/orders/OrdersDetails/${order.orderId}`,
                        )
                      }
                    >
                      {order.orderItemLines.length} {t("items")}
                    </span>
                    <span className="text-base font-bold break-words">
                      {order.netTotal.toLocaleString("en-US")} {t("currency")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="flex justify-center py-3">
          <button
            className=" text-red-600 w-[100px] py-1 text-center rounded-lg"
            onClick={() => {
              pageNum.current += 1;
              getAllOrders();
            }}
          >
            <MdOutlineDownloading className="text-4xl" />
          </button>
        </div>
      </div>
      <div className="hidden lg:block h-[520px] border-t mt-3 w-full  overflow-y-scroll">

      <table className="w-full h-auto">
          <thead className="bg-[#f0eff0] text-xs   text-justify sticky top-0  z-10">
            <tr className="  h-12">
              {/* <th className="w-[2%] "></th> */}
              <th className=" px-5 ">{t("order_id")}</th>
              <th className=" ">{t("date")}</th>
              <th className=" ">{t("user")}</th>
              <th className=" ">{t("items")}</th>
              <th className=" ">{t("total")}</th>
              <th className=" ">{t("state_order")}</th>
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

                  {/* <td className="px-4 py-2 flex items-center gap-2">
                    <div className="h-12 bg-gray-200 rounded-full animate-pulse w-12"></div>
                    <div className="flex flex-col gap-2">
                    <div  className="h-4 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                    <div  className="h-2 bg-gray-200 rounded-md animate-pulse w-20"></div>
                    </div>
                  </td> */}
                  {/* <td className="px-4 py-2"><div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div></td> */}
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </td>
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                  </td>
                  <td className=" py-2">
                    <div className="h-10 bg-gray-200 rounded-full animate-pulse w-10"></div>
                  </td>
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                </tr>
              ))
              : orders.map((order, index) => {
                const date = new Date(order.createdDate);
                const dateOnly = date.toLocaleDateString("en-GB");
                return (
                  <tr
                    key={index}
                    className=" text-red-950 border-t w-full hover:bg-gray-50 cursor-pointer"
                  >
                    <td
                      className="font-semibold text-red-500 px-5"
                      onClick={() =>
                        navigate.push(
                          `/admin/orders/OrdersDetails/${order.orderId}`,
                        )
                      }
                    >
                      {order.code}
                    </td>
                    <td className="text-sm">{dateOnly}</td>
                    <td
                      onClick={() =>
                        navigate.push(
                          `/admin/orders/OrdersDetails/${order.orderId}`,
                        )
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-[40px] h-[40px] text-gray-600 my-2  bg-gray-50 flex justify-center items-center p-2 rounded-full border ">
                          <FaUserLarge />
                        </span>
                        <div>
                          <h1 className="font-semibold text-sm">
                            {order.user.firstName + " " + order.user.lastName}
                          </h1>
                          <h1 className="text-xs  text-gray-500">
                            {order.user.email}
                          </h1>
                        </div>
                      </div>
                    </td>

                    <td
                      className="text-sm "
                      onClick={() =>
                        navigate.push(
                          `/admin/orders/OrdersDetails/${order.orderId}`,
                        )
                      }
                    >
                      <span className="py-2 px-5 font-semibold rounded-full   bg-red-100 text-red-600">
                        {order.orderItemLines.length}
                      </span>
                    </td>
                    <td className="text-sm font-bold">
                      {order.netTotal.toLocaleString("en-US")} {t("currency")}
                    </td>
                    <td>
                      {statusSelect(order, "w-[200px] text-sm font-semibold")}
                    </td>
                  </tr>
                );
              })}
            {/* {orders.length <= 5 ? (
              " "
            ) : ( */}
            <tr className="h-5 text-center">
              <td colSpan="6">
                <button
                  className=" text-red-600 w-[100px] py-1 text-center  my-3 rounded-lg"
                  onClick={() => {
                    pageNum.current += 1;
                    getAllOrders();
                  }}
                >
                  <MdOutlineDownloading className="text-4xl" />
                </button>
              </td>
            </tr>
            {/* )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
