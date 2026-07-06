"use client";
import Table from "./components/Table";
import ShippingCostForm from "./components/ShippingCost_Form";
import { useState } from "react";
export default function ShippingCost() {
    const [governorate , setGovernorate] = useState();
    const [governorateId , setGovernorateId] = useState();
    const [showForm , setShowForm] = useState(false);
 
  return (
<div className=" bg-[#F9FAFB]">
         
<div className=" w-full bg-[#F9FAFB]">
 <div className=" pt-5 mx-5 relative ">    
      {showForm && (
          <ShippingCostForm govName={governorate} govId={governorateId} setShowForm={setShowForm} />
        )}
      <Table setGovernorate={setGovernorate} setGovernorateId={setGovernorateId} setShowForm={setShowForm} />
    </div>
    </div>
    </div>
  );
}
