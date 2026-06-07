"use client";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { MdEditNote } from "react-icons/md";
import Image from "next/image";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { useEffect, useState } from "react";
import { useOrderDetailsContext } from "../../../../context/orderDetailsContext.jsx";
import { getThumbnailUrl } from "../../../../utils/functions.jsx";

export default function OrdersItems({ orderId, orderType }) {
  const { t } = useLanguage();
  const [orderItems, setOrderItems] = useState([]);
  const [itemPrice, setItemPrice] = useState();
  const [itemQuantity, setItemQuantity] = useState();
  const { setSelectedOrderState } = useOrderDetailsContext();
  const { setSelectedOrderCode } = useOrderDetailsContext();
  const { setSelectedOrderDate } = useOrderDetailsContext();

  const [orderTotalPrice, setOrderTotalPrice] = useState("");
  const orderItem = async () => {
    const res = await getRequest(`/api/${orderType}/${orderId}`);
    const resData = res.data;
    console.log(resData);
    setOrderItems(orderType === "orders" ? resData.orderItemLines : resData.item);
    setOrderTotalPrice(
      orderType === "orders" ? resData.total : resData.refundAmount,
    );
    setItemPrice(orderType === "orders" ? "": resData.unitPrice);
    setItemQuantity(orderType === "orders" ? "": resData.quantity);
    setSelectedOrderState(resData.state);
    
    setSelectedOrderDate(resData.createdDate);
    setSelectedOrderCode(resData.code);
  };
  useEffect(() => {
    orderItem();
  }, []);
  return (
    <div className="w-full ">
      <div className="h-16 flex border-t  border-l border-r rounded-t-lg items-center justify-between  px-6 bg-white">
        <h1 className="text-lg">
          {/* {t("order_items")} ({orderItems.length}) */}
        </h1>
        <span className="text-gray-600">
          {" "}
          {t("Total")}:{" "}
          <span className="text-lg text-red-500 font-semibold">
            {orderTotalPrice.toLocaleString("en-US")} {t("currency")}
          </span>{" "}
        </span>
      </div>
      <div className=" rounded-b-lg  w-full h-[435px]  border overflow-hidden overflow-y-scroll ">
        <table className=" w-full  rounded-lg  ">
          <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
            <tr className=" text-gray-500 h-12  ">
              <th className="w-[2%] "></th>
              <th className="w-[30%]">{t("product")}</th>
              <th className="w-[10%] text-center    ">{t("price")}</th>
              <th className="w-[20%] text-center">{t("quantity")}</th>
              {/* <th className="w-[15%] text-center ">{t("total")}</th> */}
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full ">
            {orderType === "orders" ? (
              orderItems.map((item, index) => {
                return (
                  <tr key={index} className=" text-red-950 border-b w-full">
                    <td></td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <Image
                            alt=""
                            src={
                              process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                              getThumbnailUrl(item.item.mainImageURL)
                            }
                            width={55}
                            height={55}
                            className="rounded-xl  my-1 p-1"
                          />
                        </div>
                        <div>
                          <h1 className="font-semibold text-sm">
                            {localStorage.lang === "ar"
                              ? item.item.nameAr
                              : item.item.nameEn}
                          </h1>
                          <h1 className="text-xs  text-gray-500">
                            {item.item.code}
                          </h1>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm font-semibold text-center text-gray-500">
                      {item.item.price.toLocaleString("en-US")} {t("currency")}
                    </td>
                    <td className="text-sm text-center text-gray-500">
                      {item.quantity}
                    </td>

                    <td className="text-sm font-semibold text-center">
                      {item.totalPrice.toLocaleString("en-US")} {t("currency")}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className=" text-red-950 border-b w-full">
                <td></td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <Image
                        alt=""
                        src={
                          process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                          getThumbnailUrl(orderItems.mainImageURL)
                        }
                        width={55}
                        height={55}
                        className="rounded-xl  my-1 p-1"
                      />
                    </div>
                    <div>
                      <h1 className="font-semibold text-sm">
                        {localStorage.lang === "ar"
                          ? orderItems.nameAr
                          : orderItems.nameEn}
                      </h1>
                      <h1 className="text-xs  text-gray-500">
                        {orderItems.code}
                      </h1>
                    </div>
                  </div>
                </td>
                <td className="text-sm font-semibold text-center ">
                  {itemPrice?.toLocaleString("en-US")} {t("currency")}
                </td>
                <td className="text-sm text-center ">
                  {itemQuantity}
                </td>

                {/* <td className="text-sm font-semibold text-center">
                  {orderTotalPrice.toLocaleString("en-US")} {t("currency")}
                </td> */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
