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
      
          <div className={` ${orderType === "orders" ? "block" : "hidden"}`}>
          {t("shippingCost") }: {"  "}
          <span className="md:text-lg xs:text-base  font-semibold">
            {shippingCost?.toLocaleString("en-US")} {t("currency")}
          </span>{" "}
        </div>
        <div className="">
          {t("total")}: {"  "}
          <span className="md:text-lg xs:text-base  text-[#CD4354] font-semibold">
            {orderTotalPrice.toLocaleString("en-US")} {t("currency")}
          </span>
        </div>
      </div>
      <div
        className={`  w-full ${orderType === "orders" ? "h-[435px]  overflow-hidden overflow-x-scroll  overflow-y-scroll" : ""}  border  `}
      >
        {/* XS mobile card layout */}
      <div className="">
        {orderType === "orders" ? (
          orderItems.map((item, index) => {
            return (
              <div
                key={`mobile-${index}`}
                className="bg-white border rounded-xl p-3 my-3 mx-2 lg:hidden max-h-[435px] overflow-y-scroll"
              >
                <div className="flex items-start gap-3">
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                      getThumbnailUrl(item.item.mainImageURL)
                    }
                    width={48}
                    height={48}
                    className="rounded-xl w-12 h-12 p-1 shrink-0"
                  />
                  <div className="min-w-0">
                    <h1 className="font-semibold text-sm truncate">
                      {localStorage.lang === "ar"
                        ? item.item.nameAr
                        : item.item.nameEn}
                    </h1>
                    <h1 className="text-xs  text-gray-500 truncate">
                      {item.item.code}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t">
                  <div>
                    <div className="text-sm font-semibold">
                      {item.unitPrice.toLocaleString("en-US")} {t("currency")}
                    </div>
                    <div className="text-xs line-through ">
                      {item.oldUnitPrice.toLocaleString("en-US")} {t("currency")}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 shrink-0">
                    {t("quantity")} : {item.quantity}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="text-base font-bold">
                    {t("total")} : {item.totalPrice.toLocaleString("en-US")}{" "}
                    {t("currency")}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white border rounded-xl p-3 my-3 mx-2 lg:hidden max-h-[435px] overflow-y-scroll">
            <div className="flex items-start gap-3">
              <Image
                alt=""
                src={
                  process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                  getThumbnailUrl(orderItems.mainImageURL)
                }
                width={48}
                height={48}
                className="rounded-xl w-12 h-12 p-1 shrink-0"
              />
              <div className="min-w-0">
                <h1 className="font-semibold text-sm truncate">
                  {localStorage.lang === "ar"
                    ? orderItems.nameAr
                    : orderItems.nameEn}
                </h1>
                <h1 className="text-xs  text-gray-500 truncate">
                  {orderItems.code}
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t">
              <div className="text-sm font-semibold">
                {itemPrice?.toLocaleString("en-US")} {t("currency")}
              </div>
              <div className="text-sm text-gray-500 shrink-0">
                {t("quantity")} : {itemQuantity}
              </div>
            </div>
          </div>
        )}
      </div>
      <table className="hidden lg:table w-full  h-auto rounded-lg">
          <thead className=" text-xs bg-[#f0eff0] text-justify">
            <tr className="  h-12  ">
              <th className=" "></th>
              <th className="">{t("product")}</th>
              <th className="   ">{t("price")}</th>
              <th className="">{t("quantity")}</th>

              {orderType === "orders" ? (
                <th className=" text-center ">{t("total")}</th>
              ) : null}
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full ">
            {orderType === "orders" ? (
              orderItems.map((item, index) => {
                return (
                  <tr key={index} className="  border-b w-full">
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
                            width={80}
                            height={80}
                            className="rounded-xl  my-1 p-1"
                          />
                        </div>
                        <div>
                          <h1 className="font-semibold mx-2">
                            {localStorage.lang === "ar"
                              ? item.item.nameAr
                              : item.item.nameEn}
                          </h1>
                          <h1 className="text-sm mx-2 text-gray-500">
                            {item.item.code}
                          </h1>
                        </div>
                      </div>
                    </td>
                    <td className=" text-gray-500  ">
                      <span className=" font-semibold mx-1 text-black">
                        {item.unitPrice.toLocaleString("en-US")}{" "}
                        {t("currency")}
                      </span>
                      {/* <span className="text-sm line-through ">
                        {" "}
                        {item.oldUnitPrice.toLocaleString("en-US")}{" "}
                        {t("currency")}
                      </span>{" "} */}
                    </td>
                    <td className="">
                      {item.quantity}
                    </td>

                    <td className="text-[#E76E7D] font-semibold text-center">
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
