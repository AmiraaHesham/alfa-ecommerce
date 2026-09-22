"use client";
import FormProduct from "./components/ProductForm";
import ProductsTable from "./components/ProductsTable";
import { useState } from "react";

export default function Products() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode , setIsEditMode ] = useState(false)
  return (
    <div className="w-full ">
      <FormProduct isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      <ProductsTable setIsFormOpen={setIsFormOpen} setIsEditMode={setIsEditMode} />
    </div>
  );
}
