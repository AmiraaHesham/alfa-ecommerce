"use client";
import { useState } from "react";
import ProductsByCategory from "../../Products/components/ProductsTable";
import FormProduct from "../../Products/components/ProductForm";
import { MdCancel } from "react-icons/md";

export default function ProductsByCategoryPopup({
  categoryId,
  popupShow,
  setPopupShow,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div
      className={`flex justify-center items-center w-full ${popupShow ? "block" : "hidden"}`}
    >
      <div
        className={`fixed inset-0 bg-black/40 flex items-center  justify-center z-50 `}
      >
        <div className="w-[90%]">
          <button
            onClick={() => {
              setPopupShow(false);
            }}
          >
            <MdCancel className="text-2xl text-red-700 bg-white rounded-md" />
          </button>

          <div className=" bg-white rounded-md ">
            <FormProduct
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
            />
            <ProductsByCategory
              category={categoryId}
              setIsFormOpen={setIsFormOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
