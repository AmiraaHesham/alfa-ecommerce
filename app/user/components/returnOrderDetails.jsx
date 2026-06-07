"use client";
import Image from "next/image";
import { MdCancel, MdDelete } from "react-icons/md";
import { getRequest, postRequest } from "../../../utils/requestsUtils";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { useIdContext } from "../../../context/idContext";
import { useRouter } from "next/navigation";
import { FaBox, FaCheck, FaShoppingBag, FaTruck } from "react-icons/fa";
import { getThumbnailUrl } from "../../../utils/functions";
import { GiMoneyStack } from "react-icons/gi";
import { TfiTimer } from "react-icons/tfi";

export default function OrderDetails({ returnOrderId }) {
  const [order, setOrder] = useState({});
  // const [itemPrice, setItemPrice] = useState(0);
  // const [totalDiscount, setTotalDiscount] = useState(0);
  // const [itemsNum, setItemsNum] = useState();
  // const [createdDate, setCreatedDate] = useState();
  // const [state, setState] = useState();
  // const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState();
  const [reason, setReason] = useState();
  const [orderSummary, setOrderSummary] = useState({
    total: "",
    state: "",
    quantity:"",

    createdDate: "",
    itemsNum: "",
    totalDiscount: "",
    unitPrice: "",
    reason: "",
    reasonMessage: "",
  });
const navigate = useRouter();
  const { t } = useLanguage();
  const { locale } = useLanguage();

  const steps = [
    { icon: <TfiTimer  size={20} />, label: t("PENDING") },
    { icon: <FaCheck  size={20} />, label: t("APPROVED") },
    { icon: <GiMoneyStack size={20} />, label: t("REFUNDED") },
  ];
  const [orderStepPath, setOrderStepPath] = useState();
  const [activeStep, setActiveStep] = useState();


  const getOrder = async () => {
    const res = await getRequest(`/api/return-orders/${returnOrderId}`);
    const resData = res.data;
    setOrder(resData.item);
    console.log(resData);
    setOrderSummary((prev) => ({
      ...prev,
      total: resData.unitPrice,
      state: resData.state,
      quantity: resData.quantity,
      createdDate: resData.createdDate,
      itemsNum: resData.length,
      totalDiscount: resData.refundAmount,
      unitPrice: resData.unitPrice,
      reasonMessage: resData.reasonMessage,
      reason: resData.reason,
    }));
  };
  const orderCancel = async () => {
    try {
      if (state === "PENDING")
        await postRequest(
          `/api/user/orders/${returnOrderId}/cancel`,
          "",
          t("message"),
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);
  useEffect(() => {
    if (orderSummary.state === "PENDING") {
      setActiveStep(1);
      setOrderStepPath(8);
    } else if (orderSummary.state === "APPROVED") {
      setActiveStep(2);
      setOrderStepPath(27);
    
    } else if (orderSummary.state === "REFUNDED") {
      setActiveStep(4);
      setOrderStepPath(30);
    } else {
      setActiveStep(0);
      setOrderStepPath(1);
    }
  }, [orderSummary.state]);

  const date = new Date(orderSummary.createdDate);
  const dateOnly = date.toLocaleDateString("en-GB");
  return (
    <div className="w-full h-full p-10">
      <div className="relative flex items-center h-16 px-4 my-5">
        <div
          className="absolute top-1/2 left-0 right-0 h-0.5"
          style={{
            background: `linear-gradient(${
              locale === "en" ? "to right" : "to left"
            }, red ${activeStep * orderStepPath}%, #e0e0e0 ${
              activeStep * orderStepPath
            }%)`,
          }}
        ></div>
        <div className="flex justify-between w-full relative z-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              onClick={() => {
                // console.log(step.l);
                changeState(step.label);
              }}
            >
              {/* الدائرة المحيطة بالأيقونة */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index + 1 <= activeStep
                    ? "bg-red-100 border-2 border-red-300"
                    : "bg-gray-100 border-2 border-gray-300"
                }`}
              >
                {/* الأيقونة (ملونة حسب المرحلة النشطة) */}
                <div
                  className={
                    index + 1 <= activeStep ? "text-red-600" : "text-gray-400"
                  }
                >
                  {step.icon}
                </div>
              </div>
              {/* العنوان تحت الأيقونة */}
              <span
                className={`text-xs mt-1 font-medium transition-opacity ${
                  index + 1 <= activeStep
                    ? "text-red-600 opacity-100"
                    : "text-gray-500 opacity-70"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex md:flex-row xs:flex-col gap-7 ">
        <div className="re rounded-xl w-full h-[420px]  border overflow-hidden overflow-x-auto md:overflow-x-hidden overflow-y-scroll ">
          <table className="  xs:w-[200%] lg:w-full  ">
            <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
              <tr className=" text-gray-500 h-12">
                <th className="w-[30%] px-5">{t("product")} </th>
                <th className="w-[20%]">{t("price")} </th>
                <th className="w-[10%] ">{t("discount")} </th>
                <th className="w-[10%] px-2 ">{t("quantity")} </th>
                {orderSummary.state === "DELIVERED" ? (
                  <th className="w-[10%] ">{t("Returned_quantity")} </th>
                ) : (
                  ""
                )}
                <th className="w-[10%] ">{t("total")} </th>
                {orderSummary.state === "DELIVERED" ? (
                  <th className="w-[20%] ">{t("return_order")} </th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody className="bg-white text-md w-full  ">
              <tr className=" text-red-950 border h-14 w-full  hover:bg-gray-100">
                <td
                  className="px-5 cursor-pointer"
                  onClick={() => {
                    // setSelectedProductId(order.itemId);
                    navigate.push(`/user/pages/productdetails/${order.itemId}`);
                  }}
                  f
                >
                  <div className="flex orderss-center gap-3">
                    <Image
                      alt=""
                      src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${getThumbnailUrl(order.mainImageURL)}`}
                      width={45}
                      height={45}
                      className="rounded-full border my-1 p-1"
                    />

                    <div>
                      <h1 className="font-semibold text-sm">
                        {locale === "ar" ? order.nameAr : order.nameEn}
                      </h1>
                      <h1 className="text-xs  text-gray-500">{order.code}</h1>
                    </div>
                  </div>
                </td>
                <td className="font-semibold text-red-500">
                  <div>
                    <span>
                      {order.price?.toLocaleString("en-US")}{" "}
                      {t("currency")}
                    </span>

                    {order.oldPrice ? (
                      <span className="text-gray-400 line-through text-sm mx-2 opacity-90">
                        {order.oldPrice.toLocaleString("en-US")}{" "}
                        {t("currency")}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
                <td className="">
                  <div className="flex gap-5">
                    {order.oldPrice ? (
                      <span className="bg-red-600 text-sm px-2 text-white rounded-md">
                        {(
                          ((order.oldPrice - order.price) / order.oldPrice) *
                          100
                        ).toFixed()}
                        %
                      </span>
                    ) : (
                      "--"
                    )}
                  </div>
                </td>
                <td className="text-sm">
                  <div className="  gap-3 rounded-lg h-full text-center w-[50px] border text-gray-600 bg-white">
                    <span className="font-medium  text-sm w-10 text-center">
                      {orderSummary.quantity}
                    </span>
                  </div>
                </td>

                <td className="text-sm font-semibold">
                  {order.price*orderSummary.quantity.toLocaleString("en-US")}{" "}
                  {t("currency")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className=" md:w-[40%]  xs:w-full">
          <div className=" p-7  w-full bg-white rounded-lg border">
            <div className="flex justify-between items-center mb-10">
              <h1 className=" text-2xl font-bold">{t("orderSummary")} </h1>
              {orderSummary.state === "CANCELLED" ? (
                <h1 className="flex items-center gap-2 text-lg font-bold text-red-600">
                  <MdCancel />
                  {t("CANCELLED")}
                </h1>
              ) : (
                ""
              )}
            </div>

            <div className="flex justify-between orderss-center mb-5">
              <span className="text-gray-600"> {t("createdDate")}</span>
              <span className="font-semibold">{dateOnly}</span>
            </div>

            <div className="flex justify-between orderss-center mb-5">
              <span className="text-gray-600">
                {t("totalProducts") + " " + `[${orderSummary.quantity}]`}
              </span>

              <span className="font-semibold">
                {orderSummary.unitPrice.toLocaleString("en-US") +
                  " " +
                  t("currency")}
              </span>
            </div>
            <div className="flex justify-between items-center mb-5">
              <span className="text-gray-600">{t("reason")} </span>
              <span className="font-semibold">{t(orderSummary.reason)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t("reasonMessage")} </span>
              <span className="font-semibold">
                {orderSummary.reasonMessage}
              </span>
            </div>

            <hr className="my-6" />
            <div className="flex justify-between orderss-center text-2xl font-semibold">
              <span>{t("grandTotal")} </span>
              <span className="">
                {orderSummary.total.toLocaleString("en-US") +
                  " " +
                  t("currency")}
              </span>
            </div>
            <button
              className={`w-full h-7  mt-7 rounded-md text-white ${
                orderSummary.state === "PENDING"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              onClick={orderCancel}
            >
              {t("order_cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
