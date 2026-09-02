"use client";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../../../../context/LanguageContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import {
  getRequest,
  postRequest,
} from "../../../../utils/requestsUtils";
import { LuLoader } from "react-icons/lu";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import Link from "next/link";
import CartTable from "./CartTable";
import Select from "react-select";
export default function Cart({ setShowSignUp }) {
  const { t } = useLanguage();
  const [items, setItems] = useState([]);
  const [Checkout, setCheckout] = useState(false);
  const [summery, setSummery] = useState({
    totalOrder: "",
    totalDiscount: "",
    shappingCost: "",
    netTotal: "",
    address:""
  });

  const [itemNum, setItemNum] = useState(0);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  // const { locale } = useLanguage();

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

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        if (!cart.length) return;

        await Promise.all(
          cart.map((item) =>
            postRequest(
              `/api/shopCarts/addLine`,
              {
                itemId: item.id,
                quantity: item.quantity,
              },
              "",
            ),
          ),
        );
        getProductInCart();
        localStorage.removeItem("cart");

        synced.current = true; // 👈 بعد النجاح
      } catch (error) {
      }
    };

    syncCart();
  }, [userId]);
  const getProductInCart = async () => {
    try {
      if (userId) {
        setLoading(true);

        const res = await getRequest("/api/shopCarts");
        const rseData = res.data;
        setItems(rseData.itemLines);
        setItemNum(rseData.itemLines.length);
        setSummery((prev) => ({
          ...prev,
          totalOrder: rseData.total,
          totalDiscount: rseData.totalDiscount,
          shappingCost: rseData.shippingCost,
          netTotal: rseData.netTotal,
          address :rseData.user.governorate.nameAr +" "+ rseData.user.address
        }));
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
        setItems(items); // 👈 مهم
        setItemNum(items.length);
        const total = items.reduce((acc, item) => {
          const totalPrice = Number(item.oldPrice) * Number(item.quantity || 0);

          return acc + totalPrice;
        }, 0);
        const totalDiscount = items.reduce((acc, item) => {
          return acc + Number(item.oldPrice - item.price || 0);
        }, 0);
        setSummery((prev) => ({
          ...prev,
          totalOrder: total,
          totalDiscount: totalDiscount,
          netTotal: total - totalDiscount,
        }));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };




  const placeOrder = async () => {
    try {
      if (userId) {
        if (items.length != 0) {
          if(!paymentMethod){
            toast.error(t("selectPaymentMethod"));
            return;
          }
          if (isFirstAction) {
            await getProductInCart();
            setCheckout(true)
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
          }
          setIsFirstAction(!isFirstAction);
        } else {
          toast.error(t("noProductsInCart"));
        }
      } else {
        setShowSignUp(true);
      }
    } catch (error) {
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
      {/* <div className="flex justify-between py-5">
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
          <span className="">
            {locale === "ar" ? <FaArrowLeft /> : <FaArrowRight />}
          </span>
        </Link>
      </div> */}
      <div className="flex lg:flex-row xs:flex-col gap-5 ">
   <CartTable items={items} loading={loading}/>
        <div className="md:w-[40%]  xs:w-full">
          {loading ? (
            // Skeleton rows
            <div className=" p-7  w-full bg-white rounded-3xl ">
              <h1 className="mb-10 text-2xl font-bold">{t("cartTotals")} </h1>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600"> {t("Subtotal")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>
              <hr className="my-5"></hr>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("ShippingTo")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>

              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("shippingCost")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>
                 <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600">{t("payment_method")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20">
                  {" "}
                </span>
              </div>
              <hr className="my-6" />
              <div className="flex justify-between items-center text-2xl font-semibold">
                <span>{t("Total")} </span>
                <span className="h-4 bg-gray-200 rounded animate-pulse w-20"></span>
              </div>
              <button
                className={`flex justify-center items-center w-full  py-2 rounded-full mt-10 text-white   ${
                  items.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {t("proceedToCheckout")}
              </button>
            
            </div>
          ) : (
            <div className="  p-7  w-full bg-white rounded-3xl ">
              <h1 className="mb-10 text-xl font-bold">{t("cartTotals")} </h1>
              <div className="flex justify-between items-center mb-5">
                <span className="">
                  {" "}
                  {t("Subtotal") + " " + ` [${itemNum}]`}
                </span>
                <span className="font-semibold text-gray-600">
                  {(summery.totalOrder - summery.totalDiscount).toLocaleString("en-US") +
                    " " +
                    t("currency")}{" "}
                </span>
              </div>
              <hr className="my-5"/>
              
              {
                userId?
                (<div>
                  <div className="flex justify-between items-center mb-5">
                <span className="">{t("ShippingTo")} </span>
                <span className="font-semibold text-gray-600">{summery.address} </span>
              </div>
              <div className="flex justify-between items-center mb-5">
                <span className="">{t("shippingCost")} </span>
                <span className="font-semibold text-gray-600">
                  {  items.length === 0 ? 0 : summery.shappingCost + " " + t("currency")}
                </span>
              </div>
                </div>
                  
                ):(
                  ""
                )
              }
              
              <div className="flex justify-between items-center mb-5">
                <span className="">{t("payment_method")}</span>

                <Select
                  options={paymentMethodOptions}
                  value={paymentMethod}
                  onChange={(selectedOption) => {
                    setPaymentMethod(selectedOption);
                  }}
                  required
                  placeholder={t("select")}
                  className="h-full w-[170px] rounded-2xl border"
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
              <div className="flex justify-between items-center text-xl font-semibold">
                <span>{t("Total")} </span>
                <span className="text-[#da643b]">
                  {  items.length === 0 ? 0 :summery.netTotal + " " + t("currency")}
                </span>
              </div>
              <button
                className={`flex justify-center items-center w-full  py-2 rounded-full mt-10 text-white   ${
                  items.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : Checkout?  "bg-green-600 hover:bg-green-700" :"bg-[#E76E7D] hover:bg-[#CD4354]"
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
            
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
