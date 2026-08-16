"use client";
import { useLanguage } from "../../../../../context/LanguageContext.js";
import Image from "next/image";
import { getRequest } from "../../../../../utils/requestsUtils.js";
import { useEffect, useState } from "react";
import { useOrderDetailsContext } from "../../../../../context/orderDetailsContext.jsx";
import { getThumbnailUrl } from "../../../../../utils/functions.jsx";

export default function OrdersItems({ orderId, orderType }) {
  const { t } = useLanguage();
  const [orderItems, setOrderItems] = useState([]);
  const [reasonMessage, setReasonMessage] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [shippingCost, setShippingCost] = useState();
  const [itemQuantity, setItemQuantity] = useState();
  const { setSelectedOrderState } = useOrderDetailsContext();
  const { setSelectedOrderCode } = useOrderDetailsContext();
  const { setSelectedOrderDate } = useOrderDetailsContext();

  const [orderTotalPrice, setOrderTotalPrice] = useState("");
  const orderItem = async () => {
    const res = await getRequest(`/api/${orderType}/${orderId}`);
    const resData = res.data;
    setOrderItems(
      orderType === "orders" ? resData.orderItemLines : resData.item,
    );
    setOrderTotalPrice(
      orderType === "orders" ? resData.netTotal : resData.refundAmount,
    );
    setShippingCost(resData.shippingCost);
    setReasonMessage(resData.reasonMessage);
    setItemPrice(orderType === "orders" ? "" : resData.unitPrice);
    setItemQuantity(orderType === "orders" ? "" : resData.quantity);
    setSelectedOrderState(resData.state);

    setSelectedOrderDate(resData.createdDate);
    setSelectedOrderCode(resData.code);
  };
  useEffect(() => {
    orderItem();
  }, []);
  return (
    <div className="w-full ">
      <div className="h-16 flex md:text-base xs:text-sm border-t  border-l border-r rounded-t-lg items-center justify-between  px-6 bg-white">
        <h1
          className={`md:text-base xs:text-sm  ${orderType === "orders" ? "hidden" : "block"}`}
        >
          {t("reasonMessage")}: {reasonMessage}
        </h1>
      
          <div className={`text-gray-600 ${orderType === "orders" ? "block" : "hidden"}`}>
          {t("shippingCost") }: {"  "}
          <span className="md:text-lg xs:text-base  font-semibold">
            {shippingCost?.toLocaleString("en-US")} {t("currency")}
          </span>{" "}
        </div>
        <div className="text-gray-600">
          {t("grandTotal")}: {"  "}
          <span className="md:text-lg xs:text-base  text-red-500 font-semibold">
            {orderTotalPrice.toLocaleString("en-US")} {t("currency")}
          </span>
        </div>
      </div>
      <div
        className={`rounded-b-lg  w-full ${orderType === "orders" ? "h-[435px]  overflow-hidden overflow-x-scroll  overflow-y-scroll" : ""}  border  `}
      >
        <table className="md:w-full  rounded-lg  xs:w-[200%] ">
          <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
            <tr className=" text-gray-500 h-12  ">
              <th className="w-[2%] "></th>
              <th className="w-[30%]">{t("product")}</th>
              <th className="w-[15%] text-center    ">{t("price")}</th>
              <th className="w-[20%] text-center">{t("quantity")}</th>

              {orderType === "orders" ? (
                <th className="w-[15%] text-center ">{t("total")}</th>
              ) : null}
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
                    <td className=" text-center text-gray-500  ">
                      <span className="text-sm font-semibold ">
                        {item.unitPrice.toLocaleString("en-US")}{" "}
                        {t("currency")}
                      </span>
                      <span className="text-xs line-through mx-1 ">
                        {" "}
                        {item.oldUnitPrice.toLocaleString("en-US")}{" "}
                        {t("currency")}
                      </span>{" "}
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
                <td className="text-sm text-center ">{itemQuantity}</td>

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
