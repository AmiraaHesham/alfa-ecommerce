"use client";
import Table from "../../components_admin/shippingCost/Table";
import ShippingCostForm from "../../components_admin/shippingCost/ShippingCost_Form";
import { useState } from "react";
export default function ShippingCost() {
    const [governorate , setGovernorate] = useState();
    const [governorateId , setGovernorateId] = useState();
    const [showForm , setShowForm] = useState(false);
 
  return (
    <div className="bg-[#F9FAFB] flex justify-center items-center w-full h-full">
        {showForm && (
          <ShippingCostForm govName={governorate} govId={governorateId} setShowForm={setShowForm} />
        )}
      <Table setGovernorate={setGovernorate} setGovernorateId={setGovernorateId} setShowForm={setShowForm} />
    </div>
  );
}
