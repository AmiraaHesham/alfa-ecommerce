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
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div
      className={`flex justify-center items-center w-full ${popupShow ? "block" : "hidden"}`}
    >
      <div
        className={`fixed inset-0 bg-black/40 flex items-center  justify-center z-50 `}
      >
        <div className="w-[90%]">
          <div className="w-full bg-white p-1"> 
            <button
            onClick={() => {
              setPopupShow(false);
            }}
            
          >
            <MdCancel className="text-3xl text-red-700 " />
          </button>
          </div>
          

          <div className=" bg-white  ">
            <FormProduct
              isFormOpen={isFormOpen}
              isEditMode={isEditMode}
              setIsFormOpen={setIsFormOpen}
            />
            <ProductsByCategory
              category={categoryId}
              setIsEditMode={setIsEditMode}
              setIsFormOpen={setIsFormOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
