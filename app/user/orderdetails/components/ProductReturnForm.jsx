"use client"
import { useState } from "react";
import Select from "react-select";
import { useLanguage } from "../../../../context/LanguageContext";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { postRequest } from "../../../../utils/requestsUtils";

export default function ProductReturnForm({ productdata, isOpenPopup , setOpenPopup} ) {
    const [reasonMessage, setReasonMessage] = useState();
      const [quantity, setQuantity] = useState();
      const [reason, setReason] = useState();
        const { t } = useLanguage();
      
       const quantityOptions = Array.from(
    { length: productdata.quantity },
    (_, i) => ({ value: i + 1, label: i + 1 }),
  );
  const reasons = [
    "DAMAGED",
    "DEFECTIVE",
    "WRONG_ITEM",
    "MISSING_ACCESSORIES",
    "NOT_AS_DESCRIBED",
    "PERFORMANCE_ISSUES",
    "CONNECTIVITY_ISSUES",
    "COMPATIBILITY_ISSUES",
    "SOFTWARE_ISSUES",
    "CHANGED_MIND",
    "FOUND_BETTER_PRICE",
    "ORDERED_BY_MISTAKE",
    "ARRIVED_LATE",
    "WARRANTY_CLAIM",
    "OTHER",
  ];

  const ReasonOptions = reasons.map((reason) => ({
    value: reason,
    label: t(reason),
  }));
   const returnOrder = async () => {
        try {
          await postRequest("/api/users/return-orders", {
            orderItemLineId: productdata.id,
            quantity: quantity.value,
            reason: reason.value,
            reasonMessage: reasonMessage,
          },t("message"));
          setOpenPopup(false)
        } catch (error) {
            console.log(error)
        }
      };
    
    return (
        <div
            className={`fixed  inset-0 bg-black/40 ${isOpenPopup ? "flex" : "hidden"} items-center justify-center z-50`}
        >
            <div className=" w-[450px] p-5 rounded-lg bg-white">
                <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-600">
                        {t("return_order")}
                    </span>
                    <button
                        className="text-xl text-red-600"
                        onClick={() => {
                            setOpenPopup(false);
                            setQuantity("");
                            setReason("");
                            setReasonMessage("");
                        }}
                    >
                        <MdCancel />
                    </button>
                </div>
                <hr />
                <div className="flex flex-col justify-center items-center gap-7  p-7">
                    <div className="flex flex-col justify-center items-center gap-5">
                        <Image
                            src={productdata.image}
                            width={200}
                            height={200}
                            alt=""
                            className="w-[120px] h-[120px] border-2 rounded-md "
                        />
                        <span className="">{productdata.name} </span>
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <label className="text-sm font-semibold">{t("Select_quantity")} </label>
                        <Select
                            options={quantityOptions}
                            isSearchable={false}
                            value={quantity}
                            onChange={(selectedOption) => {
                                setQuantity(selectedOption);
                            }}
                            placeholder={t("select")}
                            className="h-full w-[60%] border rounded-full"
                            //  onMenuOpen={() => {}}
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
                    <div className="w-full flex justify-between items-center">
                        <label className="text-sm  font-semibold"> {t("Reason_for_return")}</label>
                        <Select
                            isSearchable={false}
                            options={ReasonOptions}
                            value={reason}
                            onChange={(selectedOption) => {
                                setReason(selectedOption);
                            }}
                            placeholder={t("select")}
                            className="h-full w-[60%] border rounded-full"
                            //  onMenuOpen={() => {}}
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
                                    fontSize: "10px",
                                    fontWeight: "400",
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
                    <div className="w-full">
                        <label className="text-sm font-semibold ">
                            {t("message_reason")}
                        </label>
                        <textarea
                            className="w-full border p-1 rounded-md mt-2 "
                            onChange={(e) => setReasonMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        className="w-full rounded-lg py-1 text-white bg-red-500"
                        onClick={returnOrder}
                    >
                        {t("return")}
                    </button>
                </div>
            </div>
        </div>
    )
} 