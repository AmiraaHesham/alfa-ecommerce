"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { VscCircleFilled } from "react-icons/vsc";
import { postRequest } from "../../../../utils/requestsUtils";
import "aos/dist/aos.css";
import { useLanguage } from "../../../../context/LanguageContext";
import { useRouter } from "next/navigation";
import { useIdContext } from "../../../../context/idContext";
import { getThumbnailUrl } from "../../../../utils/functions";
export default function OrdersHistory() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [inputSearch, setInputSearch] = useState(null);
  const [state, setState] = useState("");
    const { locale } = useLanguage();

  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  const { setSelectedProductId } = useIdContext();
  useEffect(() => {
  
    getOrders();
  }, [state, inputSearch]);
  const getOrders = async () => {
    try {
      setLoading(true)
      const res = await postRequest(
        "/api/orders/search",
        {
          page: 0,
          size: 100,
          searchText: inputSearch,
          orderState: state,
        },
        ""
      );
      setOrders(res.data);
      // setLength(res.data.length)
      setLoading(false);
    } catch (error) {
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
  
    getOrders();
  }, [state, inputSearch]);
  return (
    <div >
      <div className="md:flex xs:block justify-between  items-center  mb-16">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-bold">{t("orderHistory")} </span>
          <span className=" text-gray-500 opacity-90">
            {t("trackAndManage")}
          </span>
        </div>
        <div className="flex justify-start items-center bg-white border rounded-md">
          <span className="text-gray-500 h-full  rounded-s-md text-2xl p-2 ">
            <IoMdSearch />
          </span>
          <input
            type="text"
            placeholder={t("searchByOrderNumber")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setInputSearch(e.target.value);
              }
            }}
            className="w-[300px] bg-none p-2 outline-none rounded-lg"
          />
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-8 md:text-lg xs:text-sm items-center  ">
          <span
            className={` border-b hover:text-red-600 hover:border-red-600 py-4 cursor-pointer 
               ${state === "" ? "text-red-600 border-red-600" : "text-gray-500"}
              `}
            onClick={() => {
              setState("");
            }}
          >
            {t("allOrders")}
          </span>
          <span
            className={`border-b hover:text-red-600 hover:border-red-600 py-4 cursor-pointer
               ${
                 state === "PENDING"
                   ? "text-red-600 border-red-600"
                   : "text-gray-500"
               }
              `}
            onClick={() => {
              setState("PENDING");
            }}
          >
            {t("PENDING")}
          </span>
          <span
            className={`border-b hover:text-red-600 hover:border-red-600 py-4 cursor-pointer 
               ${
                 state === "PROCESSING"
                   ? "text-red-600 border-red-600"
                   : "text-gray-500"
               }
              `}
            onClick={() => {
              setState("PROCESSING");
            }}
          >
            {t("PROCESSING")}
          </span>
          <span
            className={`border-b hover:text-red-600 hover:border-red-600 py-4 cursor-pointer
            ${
              state === "SHIPPED"
                ? "text-red-600 hover border-red-600"
                : "text-gray-500"
            }  
            `}
            onClick={() => {
              setState("SHIPPED");
            }}
          >
            {t("SHIPPED")}
          </span>
          <span
            className={` border-b hover:text-red-600 hover:border-red-600 py-4 cursor-pointer 
              ${
                state === "DELIVERED"
                  ? "text-red-600 border-red-600"
                  : "text-gray-500"
              }
              `}
            onClick={() => {
              setState("DELIVERED");
            }}
          >
            {t("DELIVERED")}
          </span>
        </div>
        <hr className=""></hr>
      </div>
      {loading ? (
        // Skeleton rows
        [...Array(2)].map((_, index) => (
          <div key={`skeleton-${index}`} className="py-5 flex flex-col gap-5">
            <div className="w-full bg-white   rounded-md shadow-sm p-5">
              <div className="flex justify-between">
                <div className="flex items-center gap-5">
                  <span className="h-4 bg-gray-200 rounded animate-pulse w-24"></span>
                  <span className="h-4 bg-gray-200 rounded animate-pulse w-24"></span>
                  <span className="h-4 bg-gray-200 rounded animate-pulse w-24"></span>
                </div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              </div>
              <div className="flex justify-between items-center ">
                <div className="mt-10 grid grid-cols-3 gap-x-10 gap-y-5 w-[80%]">
                  <div className="h-16 bg-gray-200 rounded animate-pulse "></div>
                  <div className=" h-16 bg-gray-200 rounded animate-pulse "></div>
                  <div className="h-16 bg-gray-200 rounded animate-pulse "></div>
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse w-[200px] mx-5"></div>
              </div>
            </div>
          </div>
        ))
      ) : orders.length === 0 ? (
        <div className="w-full h-[400px]"></div>
      ) : (
        <div className="py-5 flex flex-col gap-5">
          {orders.map((order, index) => {
            const date = new Date(order.createdDate);
            const dateOnly = date.toLocaleDateString("en-GB");
            return (
              <div
                key={index}
                className="w-full bg-white   rounded-md shadow-sm p-5"
              >
                <div className="flex justify-between items-baseline">
                  <div className="flex md:flex-row xs:flex-col gap-5">
                    <span className="p-1 text-sm text-gray-700 rounded-md font-semibold bg-gray-100">
                      {order.code}
                    </span>
                    <div className="flex items-center gap-2">
                       <span className="p-1 text-sm text-gray-700 rounded-md font-semibold flex  items-center gap-2">
                      <FaRegCalendar /> {dateOnly}
                    </span>
                    <br/>
                    <span
                      className={`flex items-center ${
                        order.state === "PROCESSING"
                          ? "text-blue-600"
                          : order.state === "PENDING"
                          ? " text-orange-400"
                          : order.state === "SHIPPED"
                          ? "text-yellow-600":
                          order.state === "CANCELLED"
                          ? "text-red-600"
                          : "text-green-600"
                      } `}
                    >
                      <VscCircleFilled />
                      {t(order.state)}
                    </span>
                    </div>
                   
                  </div>
                  <div className="flex items-center gap-1 mx-5">
                    <span className=" text-gray-600">{t("Total")}: </span>
                    <span className="text-xl font-semibold">
                      {order.netTotal.toLocaleString("en-US")} {t("currency")}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between  ">
                  <div className="mt-10 grid xl:grid-cols-3 md:grid-cols-2 gap-x-3 gap-y-3 lg:w-[80%] xs:w-full">
                    {order.orderItemLines.map((itemLine, index) => {
                      return (
                        <div
                          className="bg-gray-50 p-2 rounded-md flex items-center gap-3 cursor-pointer"
                          key={index}
                          onClick={() => {
                            setSelectedProductId(itemLine.item.itemId);
                            navigate.push(
                              `/user/productdetails/${itemLine.item.itemId}`
                            );
                          }}
                        >
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                             getThumbnailUrl(itemLine.item.mainImageURL)
                            }
                            alt=""
                            width={100}
                            height={100}
                            className="rounded-md w-[50px] h-[50px]"
                          />
                          <div className="flex flex-col text-sm ">
                            <span className="">
                              {locale === "ar"
                                ? itemLine.item.nameAr
                                : itemLine.item.nameEn}
                            </span>
                            <div className="flex xs:flex-col lg:flex-row gap-3 mt-2 lg:text-sm xs:text-xs">
                              <span className="text-gray-500  ">
                                {t("code")} : {itemLine.item.code}
                              </span>
                              <span className="text-gray-500 ">
                                {t("quantity")} : {itemLine.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="w-[200px] h-[35px] flex justify-end xs:text-sm md:text-base  mt-10"
                    onClick={() => {
                      navigate.push(`/user/orderdetails/${order.orderId}`);
                    }}
                  >
                    <button className="px-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                {t("orderDetails")}
                    </button    >
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
