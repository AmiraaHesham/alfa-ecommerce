'use client'
import { BsStars } from "react-icons/bs";
import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../../../utils/requestsUtils";

export default function FeaturedProducts() {
const [featuersProducts,setFeatuersProduct] = useState([])

const getFeatuersProducts=async()=>{
  const response = await postRequest("/api/public/items/search", {
        page: 0,
        size: 100,
        isFavorite: true
      });
      setFeatuersProduct(response.data)
}
useEffect(()=>{
  getFeatuersProducts()
},[])
  return (
    <div className="w-full  mx-5">
        <div className=" flex justify-between items-center">
      <div className="flex  items-center gap-5">
        <span className="text-2xl text-yellow-400">
          <BsStars />
        </span>
        <h1 className="font-semibold md:text-xl xs:text-lg"> Featured Products</h1>
      </div>
      <Link href='/admin/Products' className="md:text-4xl xs:text-3xl mx-10 text-blue-700 hover:text-blue-800"><FaCirclePlus/></Link>
      </div>
      <div className="my-5 grid lg:grid-cols-5 md:grid-cols-3 xs:grid-cols-2 gap-5 w-full">
        {featuersProducts.map((product ,index)=>{
          return(
  <div key={index} className="bg-white  border py-3 rounded-lg ">
          <div className="flex  justify-center items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL+product.mainImageURL||''}`}
              alt=""
              width={100}
              height={100}
              className=" rounded-md"
            />
          </div>
          <div className="mx-3 my-2 font-semibold">
            <h1 className="">{localStorage.lang === "ar"
                          ? product.nameAr
                          : product.nameEn}
                          </h1>

            <h1 className="text-blue-700 ">{product.price} Eg</h1>
          </div>
        </div>
          )
        })}
      

      </div>
    </div>
  );
}
