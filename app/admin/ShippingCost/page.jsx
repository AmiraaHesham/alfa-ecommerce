"use client";
import Table from "./components/Table";
import ShippingCostForm from "./components/ShippingCost_Form";
import { useState } from "react";
export default function ShippingCost() {
    const [governorate , setGovernorate] = useState();
    const [governorateId , setGovernorateId] = useState();
    const [governoratePrice , setGovernoratePrice] = useState();
    const [showForm , setShowForm] = useState(false);
 
  return (
<div className=" ">
         
<div className=" w-full ">
 <div className=" pt-5 mx-5 relative ">    
      {showForm && (
          <ShippingCostForm govName={governorate} govId={governorateId} govPrice={governoratePrice} setShowForm={setShowForm} />
        )}
      <Table setGovernorate={setGovernorate} setGovernorateId={setGovernorateId} setGovernoratePrice={setGovernoratePrice} setShowForm={setShowForm} />
    </div>
    </div>
    </div>
  );
}
