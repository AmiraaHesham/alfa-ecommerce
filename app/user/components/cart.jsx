"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "../../../utils/requestsUtils";
import { LuLoader } from "react-icons/lu";

import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { getThumbnailUrl } from "../../../utils/functions";
import Select from "react-select";
export default function Cart() {
  const { t } = useLanguage();
  const [items, setItems] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [itemNum, setItemNum] = useState(0);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const { locale } = useLanguage();

  const shappingCost = 50;
  const [isFirstAction, setIsFirstAction] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  const [paymentMethod, setPaymentMethod] = useState();
  const paymentMethodOptions = [
    { value: "INSTAPAY", label: t("INSTAPAY") },
    { value: "CASH_ON_DELIVERY", label: t("CASH_ON_DELIVERY") },
  ];
 const synced = useRef(false);

useEffect(() => {
  const syncCart = async () => {
    try {

      if (!userId) return;
      if (synced.current) return;

      const cart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      if (!cart.length) return;

      await Promise.all(
        cart.map((item) =>
          postRequest(
            `/api/shopCarts/${userId}/addLine`,
            {
              itemId: item.id,
              quantity: item.quantity,
            },
            ""
          )
        )
      );
getProductInCart()
      localStorage.removeItem("cart");

      synced.current = true; // 👈 بعد النجاح

    } catch (error) {
      console.log(error);
    }
  };

  syncCart();

}, [userId]);
  const getProductInCart = async () => {
    try {
      if (userId) {
        setLoading(true);

        const res = await getRequest(`/api/shopCarts/${userId}`);
        const rseData = res.data;
        console.log(rseData);
        setItems(rseData.itemLines);
        setTotalOrder(rseData.total);
        setItemNum(rseData.itemLines.length);
        setTotalDiscount(rseData.totalDiscount);
      } else {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const items = await Promise.all(
          cart.map(async (item) => {
            const res = await getRequest(`/api/public/items/${item.id}`);

            return {
              ...res.data, // 👈 مهم جدًا
              quantity: item.quantity,
            };
          }),
        );
        console.log(items);
        setItems(items); // 👈 مهم
        setItemNum(items.length);
        const total = items.reduce((acc, item) => {
          console.log(typeof item.price);
          const totalPrice = Number(item.price) * Number(item.quantity || 0);

          return acc + totalPrice;
        }, 0);
        const totalDiscount = items.reduce((acc, item) => {
          return acc + Number(item.oldPrice || 0);
        }, 0);
        setTotalOrder(total);
        setTotalDiscount(totalDiscount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const changeQuantity = async (itemLineId, itemId, newQuantity) => {
    if (userId) {
      await postRequest(
        `/api/shopCarts/${userId}/changeQuantity`,
        {
          itemLineId: itemLineId,
          quantity: newQuantity,
        },
        "",
      );
      getProductInCart();
    } else {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");

      cart = cart.map((item) =>
        Number(item.id) === Number(itemId)
          ? { ...item, quantity: newQuantity }
          : item,
      );

      localStorage.setItem("cart", JSON.stringify(cart));
      getProductInCart();
    }
  };

  const deleteItemFormCart = async (itemLineId, productID) => {
    if (userId) {
      await deleteRequest(
        `/api/shopCarts/${userId}/deleteLine/${itemLineId}`,
        t("message"),
      );
      getProductInCart();
    } else {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");

      cart = cart.filter((item) => Number(item.id) !== Number(productID));

      localStorage.setItem("cart", JSON.stringify(cart));
      getProductInCart();
    }
  };

  const placeOrder = async () => {
    try {
      if (userId) {
        if (items.length != 0) {
          if (isFirstAction) {
            await getProductInCart();
          } else {
            setLoading(true);

            const res = await postRequest(
              `/api/users/orders/place-order`,
              {
                paymentMethod: paymentMethod.value,
              },
              "",
            );
            navigate.push("/user/ordershistory");
            console.log(res);
          }
          setIsFirstAction(!isFirstAction);
        } else {
          toast.error(t("noProductsInCart"));
        }
      } else {
        navigate.push("/signin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductInCart();
  }, []);
  return (
    <div className="xl:p-10 xs:p-7  ">
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Image
            src="/Images/logo.png"
            alt=""
            className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
            width={100}
            height={100}
            priority
          />
        </div>
      )}
      <div className="flex justify-between py-5">
        <div className="">
          <h1 className="text-4xl font-bold mb-2"> {t("shoppingCart")} </h1>
          <span className="text-sm text-gray-500 font-semibold">
            {t("inYourCart") + " " + itemNum + " " + t("products")}
          </span>
        </div>
        <Link
          href="/user/home"
          className="md:text-sm xs:text-xs font-semibold text-red-600 flex items-center gap-2"
        >
          <h1>{t("continueShopping")} </h1>
          <span className="mt-2">
            {locale === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
          </span>
        </Link>
      </div>
      <div className="flex lg:flex-row xs:flex-col gap-5 ">
        <div className=" rounded-xl w-full  border overflow-hidden overflow-x-auto  overflow-y-auto ">
          <table className="  xs:w-[200%] lg:w-full   ">
            <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
              <tr className=" text-gray-500 h-12">
                <th className="w-[30%] px-5">{t("product")} </th>
                <th className="w-[20%]">{t("price")} </th>
                <th className="w-[12%] ">{t("discount")} </th>
                <th className="w-[16%] px-7 ">{t("quantity")} </th>
                <th className="w-[14%] ">{t("total")} </th>
                <th className="w-[15%] px-3"> </th>
              </tr>
            </thead>
            <tbody className="bg-white text-md w-full  ">
              {loading ? (
                // Skeleton rows
                [...Array(5)].map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b">
                    <td className="px-4 py-2 flex items-center gap-2">
                      <div className="h-14 bg-gray-200 rounded-full animate-pulse w-14"></div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                        <div className="h-2 bg-gray-200 rounded-md animate-pulse w-20"></div>
                      </div>
                    </td>
                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                    <td className=" py-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                  </tr>
                ))
              ) : items.length != 0 ? (
                items.map((item, index) => {
                  const product = userId ? item.item : item;
                  return (
                    <tr key={index} className=" text-red-950 border w-full">
                      <td className="px-5">
                        <div className="flex items-center gap-3">
                          <Image
                            alt=""
                            src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${getThumbnailUrl(product.mainImageURL)}`}
                            width={45}
                            height={45}
                            className="rounded-full border my-1 p-1"
                          />

                          <div>
                            <h1 className="font-semibold text-sm">
                              {locale === "ar"
                                ? product.nameAr
                                : product.nameEn}
                            </h1>
                            <h1 className="text-xs  text-gray-500">
                              {product.code}
                            </h1>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold text-red-500">
                        <div>
                          <span>
                            {" "}
                            {product.unitPrice
                              ? product.unitPrice.toLocaleString("en-US")
                              : product.price}{" "}
                            {t("currency")}{" "}
                          </span>

                          {product.oldUnitPrice ? (
                            <span className="text-gray-400 line-through text-sm mx-2 opacity-90">
                              {product.oldUnitPrice.toLocaleString("en-US")}{" "}
                              {t("currency")}
                            </span>
                          ) : product.oldPrice ? (
                            <span className="text-gray-400 line-through text-sm mx-2 opacity-90">
                              {product.oldPrice.toLocaleString("en-US")}{" "}
                              {t("currency")}
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
                          ) : product.oldPrice ? (
                            <span className="bg-red-600 text-sm px-2 text-white rounded-md">
                              {(
                                ((product.oldPrice - product.price) /
                                  product.oldPrice) *
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
                        <div className="flex items-center gap-3 rounded-lg px-1 h-full w-[100px] border text-gray-600 bg-white">
                          {/* زر النقصان */}
                          <button
                            onClick={() => {
                              changeQuantity(
                                item.itemLineId,
                                product.itemId,
                                item.quantity + 1,
                              );
                            }}
                            className="text-xl font-bold text-gray-600  hover:text-red-600"
                          >
                            +
                          </button>

                          {/* الرقم */}
                          <span className="font-medium text-sm w-16 text-center">
                            {item.quantity}
                          </span>

                          {/* زر الزيادة */}
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                changeQuantity(
                                  item.itemLineId,
                                  product.itemId,
                                  item.quantity - 1,
                                );
                              }
                            }}
                            className="text-xl font-bold text-gray-600 hover:text-red-600"
                          >
                            −
                          </button>
                        </div>
                      </td>
                      <td className="text-sm font-semibold">
                        {item.totalPrice
                          ? item.totalPrice.toLocaleString("en-US")
                          : item.price
                            ? item.price * item.quantity
                            : ""}{" "}
                        {t("currency")}
                      </td>
                      <td className=" font-semibold text-lg text-gray-600 px-5 cursor-pointer">
                        <button
                          className=""
                          onClick={() => {
                            deleteItemFormCart(item.itemLineId, product.itemId);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    {t("noProductsInCart")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="md:w-[40%]  xs:w-full">
          {loading ? (
            // Skeleton rows
            <div className=" h-[500px] p-7  w-full bg-white rounded-lg border">
              <h1 className="mb-10 text-2xl font-bold">{t("orderSummary")} </h1>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600"> {t("totalProducts")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("totalDiscount")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t("shippingCost")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>
              <hr className="my-6" />
              <div className="flex justify-between items-center text-2xl font-semibold">
                <span>{t("grandTotal")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20"></span>
              </div>
              <button
                className={`flex justify-center items-center w-full  py-2 rounded-md mt-10 text-white text-lg  ${
                  items.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {t("proceedToCheckout")}
              </button>
              <div className="flex gap-4 p-2 w-full bg-red-50 mt-5 rounded-md">
                <span className="text-2xl text-red-600 mt-1">
                  <AiFillSafetyCertificate />
                </span>
                <div>
                  <h1 className="text-red-600  font-semibold">
                    {t("secureShopping")}
                  </h1>
                  <h2 className="text-gray-600 text-xs">
                    {t("protectedData")}
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            <div className="  p-7  w-full bg-white rounded-lg border">
              <h1 className="mb-10 text-2xl font-bold">{t("orderSummary")} </h1>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">
                  {" "}
                  {t("totalProducts") + " " + itemNum}
                </span>
                <span className="font-semibold">
                  {totalOrder.toLocaleString("en-US") +
                    " " +
                    t("currency")}{" "}
                </span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("totalDiscount")} </span>
                <span className="font-semibold">
                  {totalDiscount.toLocaleString("en-US") +
                    " " +
                    t("currency")}{" "}
                </span>
              </div>

              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("shippingCost")} </span>
                <span className="font-semibold">
                  {shappingCost + " " + t("currency")}
                </span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("payment_method")}</span>

                <Select
                  options={paymentMethodOptions}
                  value={paymentMethod}
                  onChange={(selectedOption) => {
                    setPaymentMethod(selectedOption);
                  }}
                  required
                  placeholder={t("select")}
                  className="h-full "
                  //  onMenuOpen={() => {}}
                  isSearchable={false}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                      boxShadow: "none",
                      background: "transparent",
                      fontWeight: "600",
                      height: "100%",
                      width: "100%",
                    }),
                    option: (provided) => ({
                      ...provided,
                      // backgroundColor: '#b91c1c',
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "600",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#374151",
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
                      padding: "10px",
                      "&:hover": {
                        backgroundColor: state.isSelected
                          ? "#dc2626"
                          : "#fee2e2",
                      },
                    }),
                  }}
                />
              </div>
              <hr className="my-6" />
              <div className="flex justify-between items-center text-2xl font-semibold">
                <span>{t("grandTotal")} </span>
                <span className="text-red-500">
                  {totalOrder === 0
                    ? 0
                    : (totalOrder + shappingCost).toLocaleString("en-US") +
                      " " +
                      t("currency")}
                </span>
              </div>
              <button
                className={`flex justify-center items-center w-full  py-2 rounded-md mt-10 text-white text-lg  ${
                  items.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={placeOrder}
              >
                {isFirstAction ? (
                  t("proceedToCheckout")
                ) : loading ? (
                  <LuLoader className="animate-spin" />
                ) : (
                  t("confirmOrder")
                )}
              </button>
              <div className="flex gap-4 p-2 w-full bg-red-50 mt-5 rounded-md">
                <span className="text-2xl text-red-600 mt-1">
                  <AiFillSafetyCertificate />
                </span>
                <div>
                  <h1 className="text-red-600  font-semibold">
                    {t("secureShopping")}
                  </h1>
                  <h2 className="text-gray-600 text-xs">
                    {t("protectedData")}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
