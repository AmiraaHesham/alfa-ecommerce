"use client";
import FormProduct from "../../components_admin/products/ProductForm";
import ProductsTable from "../../components_admin/products/ProductsTable";
import { useState } from "react";

export default function Products() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="w-full bg-[#F9FAFB]">
      <FormProduct isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      <ProductsTable setIsFormOpen={setIsFormOpen} />
    </div>
  );
}
