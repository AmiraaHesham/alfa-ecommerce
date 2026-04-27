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

export default function OrderDetails({ orderId }) {
  const [order, setOrder] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [itemsNum, setItemsNum] = useState();
  const [createdDate, setCreatedDate] = useState();
  const [state, setState] = useState();
  const [total, setTotal] = useState(0);

  const { setSelectedProductId } = useIdContext();
  const navigate = useRouter();
  const { t } = useLanguage();

  const lang =
    typeof window !== "undefined" ? localStorage.getItem("lang") : null;
  const steps = [
    { icon: <FaShoppingBag size={20} />, label: t("PENDING") },
    { icon: <FaBox size={20} />, label: t("PROCESSING") },
    { icon: <FaTruck size={20} />, label: t("SHIPPED") },
    { icon: <FaCheck size={20} />, label: t("DELIVERED") },
  ];
  const [orderStepPath, setOrderStepPath] = useState();
  const [activeStep, setActiveStep] = useState();

  const shappingCost = 50;
  const getOrder = async () => {
    const res = await getRequest(`/api/orders/${orderId}`);
    const resData = res.data
    setOrder(resData.orderItemLines);
    setTotalOrder(resData.total);
    setItemsNum(resData.orderItemLines.length);
    setState(resData.state);
    setTotal(resData.total);
    setCreatedDate(resData.createdDate);
    setTotalDiscount(resData.totalDiscount);
  };
  const orderCancel = async () => {
    try {
      if (state === "PENDING")
        await postRequest(`/api/user/orders/${orderId}/cancel` ,"",t('message'));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, [orderCancel]);
  useEffect(() => {


    if (state === "PENDING") {
      setActiveStep(1);
      setOrderStepPath(6);
    } else if (state === "PROCESSING") {
      setActiveStep(2);
      setOrderStepPath(19);
    } else if (state === "SHIPPED") {
      setActiveStep(3);
      setOrderStepPath(23);
    } else if (state === "DELIVERED") {
      setActiveStep(4);
      setOrderStepPath(30);
    } else {
      setActiveStep(0);
      setOrderStepPath(1);
    }
  }, [state]);
  const date = new Date(createdDate);
  const dateOnly = date.toLocaleDateString("en-US");
  return (
    <div className="w-full h-full p-10">
      <div className="relative flex items-center h-16 px-4 my-5">
        <div
        className="absolute top-1/2 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(${
            lang === "en" ? "to right" : "to left"
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
      <div className="flex md:flex-row xs:flex-col gap-7 ">
        <div className=" rounded-xl w-full h-[400px]  border overflow-hidden overflow-x-auto md:overflow-x-hidden overflow-y-scroll ">
          <table className="  xs:w-[200%] lg:w-full  ">
            <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
              <tr className=" text-gray-500 h-12">
                <th className="w-[30%] px-5">{t("product")} </th>
                <th className="w-[25%]">{t("price")} </th>
                <th className="w-[15%] ">{t("discount")} </th>
                <th className="w-[20%] px-7 ">{t("quantity")} </th>
                <th className="w-[15%] ">{t("total")} </th>
              </tr>
            </thead>
            <tbody className="bg-white text-md w-full  ">
              {/* {order.length != 0 ? ( */}
              {order.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className=" text-red-950 border h-14 w-full cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedProductId(product.item.itemId);
                      navigate.push(
                        `/user/pages/productdetails/${product.item.itemId}`,
                      );
                    }}
                  >
                    <td className="px-5">
                      <div className="flex orderss-center gap-3">
                        <Image
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${getThumbnailUrl(product.item.mainImageURL)}`}
                          width={100}
                          height={100}
                          className="rounded-full border w-[45px] h-[45px]  "
                        />

                        <div>
                          <h1 className="font-semibold text-sm">
                            {localStorage.lang === "ar"
                              ? product.item.nameAr
                              : product.item.nameEn}
                          </h1>
                          <h1 className="text-xs  text-gray-500">
                            {product.item.code}
                          </h1>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-red-500">
                      <div>
                        <span>
                          {product.unitPrice.toLocaleString("en-US")} {t("currency")}
                        </span>

                        {product.oldUnitPrice ? (
                          <span className="text-gray-400 line-through text-sm mx-2 opacity-90">
                            {product.oldUnitPrice.toLocaleString("en-US")} {t("currency")}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                    <td className="">
                      <div className="flex gap-5">
                        {product.oldUnitPrice ? (
                          <span className="bg-red-600 text-sm px-2 text-white rounded-md">
                            {(
                              ((product.oldUnitPrice - product.unitPrice) /
                                product.oldUnitPrice) *
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
                      <div className="  gap-3 rounded-lg h-full text-center w-[100px] border text-gray-600 bg-white">
                        <span className="font-medium  text-sm w-16 text-center">
                          {product.quantity}
                        </span>
                      </div>
                    </td>
                    <td className="text-sm font-semibold">
                      {product.totalPrice.toLocaleString("en-US")} {t("currency")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className=" md:w-[40%]  xs:w-full">
          <div className=" p-7  w-full bg-white rounded-lg border">
            <div className="flex justify-between items-center mb-10">
              <h1 className=" text-2xl font-bold">{t("orderSummary")} </h1>
            {state === "CANCELLED" ?<h1 className="flex items-center gap-2 text-lg font-bold text-red-600">
                <MdCancel />
                { t("CANCELLED") }
              </h1>:''}  
            </div>

            <div className="flex justify-between orderss-center mb-5">
              <span className="text-gray-600"> {t("createdDate")}</span>
              <span className="font-semibold">{dateOnly}</span>
            </div>

            <div className="flex justify-between orderss-center mb-5">
              <span className="text-gray-600">
                {t("totalProducts") + " " + itemsNum}
              </span>

              <span className="font-semibold">
                {totalOrder.toLocaleString("en-US") + " " + t("currency")}
              </span>
            </div>
            <div className="flex justify-between items-center mb-5">
              <span className="text-gray-600">{t("totalDiscount")} </span>
              <span className="font-semibold">
                {totalDiscount.toLocaleString("en-US")+ " " + t("currency")}{" "}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t("shippingCost")} </span>
              <span className="font-semibold">
                {shappingCost + " " + t("currency")}
              </span>
            </div>

            <hr className="my-6" />
            <div className="flex justify-between orderss-center text-2xl font-semibold">
              <span>{t("grandTotal")} </span>
              <span className="">
                { total.toLocaleString("en-US") + " " + t("currency")}
              </span>
            </div>
            <button
              className={`w-full h-7  my-10 rounded-md text-white ${
                state === "PENDING"
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
