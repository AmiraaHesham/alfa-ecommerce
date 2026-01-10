"use client";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { MdEditNote } from "react-icons/md";
import Image from "next/image";

export default function Orders_Details() {
  const { t } = useLanguage();

  return (
    <div className="w-full ">
      <div className="h-16 flex border-t  border-l border-r rounded-t-lg items-center justify-between  px-6 bg-white">
        <h1 className="text-lg">{t("order_items")} (3)</h1>
        <h2 className="text-gray-500"> {t("Total")}: 1,179 EG</h2>
      </div>
      <div className=" rounded-b-lg  w-full h-[435px]  border overflow-hidden overflow-y-scroll ">
        <table className=" w-full  rounded-lg  ">
          <thead className="bg-[#F9FAFB] text-xs text-gray-500  text-justify">
            <tr className=" text-gray-500 h-12  ">
              <th className="w-[2%] "></th>
              <th className="w-[20%]">{t("product")}</th>
              <th className="w-[10%] text-center    ">{t("price")}</th>
              <th className="w-[25%] text-center">{t("quantity")}</th>
              <th className="w-[15%] text-center ">{t("total")}</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full ">
            {/* (
                  {
                    (allCateg.map = (category, index) => {
                      <tr
                        key={index}
                        className="text-center text-blue-950 border  hover:bg-gray-50 "
                      >
                        <td className="py-5">{index}</td>
                        <td>{category.imageURL}</td>
                        <td>{category.name}</td>
                        <td>{category.product_count}</td>
                        <td className="text-2xl">
                          <span className="text-blue-800"><FiEdit /></span> 
                        <span className="text-red-800"><MdDelete/></span>
                        </td>
                      </tr>;
                    })
                  }
                  ) */}

            <tr
              className=" text-blue-950 border-b w-full hover:bg-gray-50"
            
             
            >
              <td></td>
              <td>
                <div className="flex items-center gap-3">
                  <td>
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={55}
                      height={55}
                      className="rounded-xl  my-1 p-1"
                    />
                  </td>
                  <div>
                    <h1 className="font-semibold text-sm">Jane Cooper</h1>
                    <h1 className="text-xs  text-gray-500">Jane@example.com</h1>
                  </div>
                </div>
              </td>
              <td className="text-sm font-semibold text-center text-gray-500">
                EG 1,200.00
              </td>
              <td className="text-sm text-center text-gray-500">1</td>

              <td className="text-sm font-semibold text-center">EG 1,200.00</td>
            </tr>
            <tr
              className=" text-blue-950 border w-full hover:bg-gray-50"
              onClick={() =>
                navigate.push("/admin/orders_page/OrderDetailsPage")
              }
            >
              <td></td>
              <td>
                <div className="flex items-center gap-3">
                  <td>
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={55}
                      height={55}
                      className="rounded-xl  my-1 p-1"
                    />
                  </td>
                  <div>
                    <h1 className="font-semibold text-sm">Jane Cooper</h1>
                    <h1 className="text-xs  text-gray-500">Jane@example.com</h1>
                  </div>
                </div>
              </td>
              <td className="text-sm font-semibold text-center text-gray-500">
                EG 1,200.00
              </td>
              <td className="text-sm text-center text-gray-500">1</td>

              <td className="text-sm font-semibold text-center">EG 1,200.00</td>
            </tr>
            <tr
              className=" text-blue-950 border w-full hover:bg-gray-50"
              onClick={() =>
                navigate.push("/admin/orders_page/OrderDetailsPage")
              }
            >
              <td></td>
              <td>
                <div className="flex items-center gap-3">
                  <td>
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={55}
                      height={55}
                      className="rounded-xl  my-1 p-1"
                    />
                  </td>
                  <div>
                    <h1 className="font-semibold text-sm">Jane Cooper</h1>
                    <h1 className="text-xs  text-gray-500">Jane@example.com</h1>
                  </div>
                </div>
              </td>
              <td className="text-sm font-semibold text-center text-gray-500">
                EG 1,200.00
              </td>
              <td className="text-sm text-center text-gray-500">1</td>

              <td className="text-sm font-semibold text-center">EG 1,200.00</td>
            </tr>
            <tr
              className=" text-blue-950 border w-full hover:bg-gray-50"
              onClick={() =>
                navigate.push("/admin/orders_page/OrderDetailsPage")
              }
            >
              <td></td>
              <td>
                <div className="flex items-center gap-3">
                  <td>
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={55}
                      height={55}
                      className="rounded-xl  my-1 p-1"
                    />
                  </td>
                  <div>
                    <h1 className="font-semibold text-sm">Jane Cooper</h1>
                    <h1 className="text-xs  text-gray-500">Jane@example.com</h1>
                  </div>
                </div>
              </td>
              <td className="text-sm font-semibold text-center text-gray-500">
                EG 1,200.00
              </td>
              <td className="text-sm text-center text-gray-500">1</td>

              <td className="text-sm font-semibold text-center">EG 1,200.00</td>
            </tr>
            <tr
              className=" text-blue-950 border w-full hover:bg-gray-50"
              onClick={() =>
                navigate.push("/admin/orders_page/OrderDetailsPage")
              }
            >
              <td></td>
              <td>
                <div className="flex items-center gap-3">
                  <td>
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={55}
                      height={55}
                      className="rounded-xl  my-1 p-1"
                    />
                  </td>
                  <div>
                    <h1 className="font-semibold text-sm">Jane Cooper</h1>
                    <h1 className="text-xs  text-gray-500">Jane@example.com</h1>
                  </div>
                </div>
              </td>
              <td className="text-sm font-semibold text-center text-gray-500">
                EG 1,200.00
              </td>
              <td className="text-sm text-center text-gray-500">1</td>

              <td className="text-sm font-semibold text-center">EG 1,200.00</td>
            </tr>
            <tr
              className=" text-blue-950 border w-full hover:bg-gray-50"
              onClick={() =>
                navigate.push("/admin/orders_page/OrderDetailsPage")
              }
            >
              <td></td>
              <td>
                <div className="flex items-center gap-3">
                  <td>
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={55}
                      height={55}
                      className="rounded-xl  my-1 p-1"
                    />
                  </td>
                  <div>
                    <h1 className="font-semibold text-sm">Jane Cooper</h1>
                    <h1 className="text-xs  text-gray-500">Jane@example.com</h1>
                  </div>
                </div>
              </td>
              <td className="text-sm font-semibold text-center text-gray-500">
                EG 1,200.00
              </td>
              <td className="text-sm text-center text-gray-500">1</td>

              <td className="text-sm font-semibold text-center">EG 1,200.00</td>
            </tr>
            <tr
              className=" text-blue-950 border w-full hover:bg-gray-50"
              onClick={() =>
                navigate.push("/admin/orders_page/OrderDetailsPage")
              }
            >
              <td></td>
              <td>
                <div className="flex items-center gap-3">
                  <td>
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={55}
                      height={55}
                      className="rounded-xl  my-1 p-1"
                    />
                  </td>
                  <div>
                    <h1 className="font-semibold text-sm">Jane Cooper</h1>
                    <h1 className="text-xs  text-gray-500">Jane@example.com</h1>
                  </div>
                </div>
              </td>
              <td className="text-sm font-semibold text-center text-gray-500">
                EG 1,200.00
              </td>
              <td className="text-sm text-center text-gray-500">1</td>

              <td className="text-sm font-semibold text-center">EG 1,200.00</td>
            </tr>
            <tr
              className=" text-blue-950 border w-full hover:bg-gray-50"
              onClick={() =>
                navigate.push("/admin/orders_page/OrderDetailsPage")
              }
            >
              <td></td>
              <td>
                <div className="flex items-center gap-3">
                  <td>
                    <Image
                      alt=""
                      src="/img.jpg"
                      width={55}
                      height={55}
                      className="rounded-xl  my-1 p-1"
                    />
                  </td>
                  <div>
                    <h1 className="font-semibold text-sm">Jane Cooper</h1>
                    <h1 className="text-xs  text-gray-500">Jane@example.com</h1>
                  </div>
                </div>
              </td>
              <td className="text-sm font-semibold text-center text-gray-500">
                EG 1,200.00
              </td>
              <td className="text-sm text-center text-gray-500">1</td>

              <td className="text-sm font-semibold text-center">EG 1,200.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
