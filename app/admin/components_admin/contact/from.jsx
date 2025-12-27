import { MdContactPage , MdEmail } from "react-icons/md";
import { FaSquarePhone, FaSquareWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagramSquare, FaShareAlt, FaTelegram } from "react-icons/fa";
import { IoMdSave, IoMdShare } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";



export default function  form_contact() {
    return (
        <form>
    <div className="flex justify-between items-center ">
       < div className="flex items-center gap-3 p-4">
        <span className="text-2xl text-blue-700"><MdContactPage /></span>
    <h1 className="text-xl font-semibold ">Contact Details</h1>
    
    </div>
     <div className="flex justify-end h-10 mx-10">
    <button className="bg-blue-600 text-white px-4 py-1 rounded-md flex items-center justify-end    gap-2"><IoMdSave /> Save Changes</button>

    </div>
    </div>
  
   
    <hr className="h-1"></hr>
    <div className="mx-20 flex flex-col gap-2 my-3">
        <div className="flex items-center gap-5 px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
            <label className="font-semibold w-[30%]   flex gap-3 items-center">
               <span className="text-xl text-gray-700"> <MdEmail /> </span>
               <h1 className=" text-gray-500"> Official Email Address</h1>
                </label>
            <input  type="text" className=" border w-[70%] border-gray-300 rounded-md px-3 py-1 "/>
                        <button className=" text-gray-500 text-xl"><RiDeleteBin6Line  /></button>

        </div>
          <div className="flex items-center gap-5 px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
            <label className="font-semibold w-[30%]  flex gap-3 items-center">
               <span className="text-xl text-gray-700"><FaSquarePhone /> </span>
               <h1 className=" text-gray-500"> Support Phone Number</h1>
                </label>
            <input  type="text" className=" border w-[70%] border-gray-300 rounded-md px-3 py-1 "/>
                        <button className=" text-gray-500 text-xl"><RiDeleteBin6Line  /></button>

        </div>
       



    </div>       
<div className="flex items-center gap-3 mt-14 p-4">
        <span className="text-2xl text-blue-700"><IoMdShare   /></span>
    <h1 className="text-xl font-semibold ">Social Media Links</h1>
    </div>
    <hr className="h-1"></hr>
    <div className="mx-20 flex flex-col gap-2 my-5">
        <div className="flex items-center gap-5 px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
            <label className="font-semibold w-[30%]   flex gap-3 items-center">
               <span className="text-xl text-blue-700"> <FaFacebookSquare  /> </span>
               <h1 className=" text-gray-500"> Facebock</h1>
                </label>
            <input  type="text" className=" border w-[70%] border-gray-300 rounded-md px-3 py-1 "/>
                        <button className=" text-gray-500 text-xl"><RiDeleteBin6Line  /></button>

        </div>
        <div className="flex items-center gap-5 px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
            <label className="font-semibold  w-[30%] flex gap-3 items-center">
               <span className="text-2xl text-green-600"> <FaSquareWhatsapp  /> </span>
               <h1 className=" text-gray-500 "> WhatsApp</h1>
                </label>
            <input  type="text" className=" border w-[70%] border-gray-300 rounded-md px-3 py-1 "/>
            <button className=" text-gray-500 text-xl"><RiDeleteBin6Line  /></button>
        </div>
        <div className="flex items-center gap-5 px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
            <label className="font-semibold  w-[30%] flex gap-3 items-center">
               <span className="text-2xl text-blue-600"> <FaTelegram   /> </span>
               <h1 className=" text-gray-500 "> Telegram</h1>
                </label>
            <input  type="text" className=" border w-[70%] border-gray-300 rounded-md px-3 py-1 "/>
                        <button className=" text-gray-500 text-xl"><RiDeleteBin6Line  /></button>

        </div>
       
          <div className="flex items-center gap-5 px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
            <label className="font-semibold w-[30%]  flex gap-3 items-center">
               <span className="text-xl text-pink-600"><FaInstagramSquare  /> </span>
               <h1 className=" text-gray-500">Instagram</h1>
                </label>
            <input  type="text" className=" border w-[70%] border-gray-300 rounded-md px-3 py-1 "/>
                        <button className=" text-gray-500 text-xl"><RiDeleteBin6Line  /></button>

        </div>
         
          <div className="flex items-center gap-5 px-10 rounded-md py-2 bg-[#f3f4f6a1] ">
            <label className="font-semibold  w-[30%] flex gap-3 items-center">
               <span className="text-2xl text-black"> <FaXTwitter   /> </span>
               <h1 className=" text-gray-500 "> XTwitter</h1>
                </label>
            <input  type="text" className=" border w-[70%] border-gray-300 rounded-md px-3 py-1 "/>
                        <button className=" text-gray-500 text-xl"><RiDeleteBin6Line  /></button>

        </div>
          
    </div>  
    
    </form>

    )}