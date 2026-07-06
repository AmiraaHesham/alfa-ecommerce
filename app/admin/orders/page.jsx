import Orders_Details from "./components/Orders_Details";
import Orders_Table from "./components/Orders_Table";
import Image from "next/image";

export default function Orders() {

  return (
    <div className="bg-[#F9FAFB]">
      <div className="flex w-full  flex-col justify-center items-center  relative">
        <div className="px-5 w-full mt-3 ">
          <Orders_Details />
          <Orders_Table />
        </div>
      </div>
    </div>
  );
  
}