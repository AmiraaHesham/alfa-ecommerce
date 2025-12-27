import { BsStars } from "react-icons/bs";
import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <div className="w-full  py-5  px-10">
        <div className=" flex justify-between items-center">
      <div className="flex  items-center gap-5">
        <span className="text-2xl text-blue-700">
          <BsStars />
        </span>
        <h1 className="text-xl font-semibold"> Featured Products</h1>
      </div>
      <Link href='/admin/Products' className="text-4xl mx-10 text-blue-700 hover:text-blue-800"><FaCirclePlus/></Link>
      </div>
      <div className="my-5 grid lg:grid-cols-5 md:grid-cols-3 xs:grid-cols-2 gap-5 w-full">
        <div className="bg-white  border py-3 rounded-lg ">
          <div className="flex  justify-center items-center">
            <Image
              src="/img.jpg"
              alt=""
              width={200}
              height={200}
              className="w-[200px] h-[200px]  rounded-md"
            />
          </div>
          <div className="mx-3 my-2 font-semibold">
            <h1 className="">Smart Phone</h1>
            <h1 className="text-blue-700 ">500 Eg</h1>
          </div>
        </div>
        <div className="bg-white  border py-3 rounded-lg ">
          <div className="flex  justify-center items-center">
            <Image
              src="/img.jpg"
              alt=""
              width={200}
              height={200}
              className="w-[200px] h-[200px]"
            />
          </div>
          <div className="mx-3 my-2 font-semibold">
            <h1 className="">Smart Phone</h1>
            <h1 className="text-blue-700 ">500 Eg</h1>
          </div>
        </div>
        <div className="bg-white  border py-3 rounded-lg ">
          <div className="flex  justify-center items-center">
            <Image
              src="/img.jpg"
              alt=""
              width={200}
              height={200}
              className="w-[200px] h-[200px]"
            />
          </div>
          <div className="mx-3 my-2 font-semibold">
            <h1 className="">Smart Phone</h1>
            <h1 className="text-blue-700 ">500 Eg</h1>
          </div>
        </div>
        <div className="bg-white  border py-3 rounded-lg ">
          <div className="flex  justify-center items-center">
            <Image
              src="/img.jpg"
              alt=""
              width={200}
              height={200}
              className="w-[200px] h-[200px]"
            />
          </div>
          <div className="mx-3 my-2 font-semibold">
            <h1 className="">Smart Phone</h1>
            <h1 className="text-blue-700 ">500 Eg</h1>
          </div>
        </div>
        <div className="bg-white  border py-3 rounded-lg ">
          <div className="flex  justify-center items-center">
            <Image
              src="/img.jpg"
              alt=""
              width={200}
              height={200}
              className="w-[200px] h-[200px]"
            />
          </div>
          <div className="mx-3 my-2 font-semibold">
            <h1 className="">Smart Phone</h1>
            <h1 className="text-blue-700 ">500 Eg</h1>
          </div>
        </div>
        <div className="bg-white  border py-3 rounded-lg ">
          <div className="flex  justify-center items-center">
            <Image
              src="/img.jpg"
              alt=""
              width={200}
              height={200}
              className="w-[200px] h-[200px]"
            />
          </div>
          <div className="mx-3 my-2 font-semibold">
            <h1 className="">Smart Phone</h1>
            <h1 className="text-blue-700 ">500 Eg</h1>
          </div>
        </div>

      </div>
    </div>
  );
}
