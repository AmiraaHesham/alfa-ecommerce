"use client";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { deleteRequest, getRequest } from "../../../../utils/requestsUtils.js";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdUpdate } from "react-icons/md";
import { getThumbnailUrl } from "../../../../utils/functions";
import ProductsByCategoryPopup from "./ProductsByCategoryPopup";

export default function CategorysTable({ setIsFormOpen }) {
  const { t } = useLanguage();
  const { triggerRefresh } = useRefresh();
  const { setSelectedCategoryId } = useIdContext();
  const { refreshKey } = useRefresh();
  let [itemCategory, setItemCategory] = useState([]);
  let [categoryId, setCategoryId] = useState();
  const [loading, setLoading] = useState(true);
  const [popupShow, setPopupShow] = useState(false);

  const getAllCategories = async () => {
    try {
      const resData = await getRequest(
        "/api/admin/itemCategory/getCategoryWithItemCounts",
      );
      setItemCategory(resData.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const openForm = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsFormOpen(true);
  };

  const deleteCategory = async (categoryId) => {
    try {
      await deleteRequest(
        `/api/admin/itemCategory/${categoryId}`,
        t("message"),
      );
      triggerRefresh();
    } catch (error) {
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [refreshKey]);

  return (
    <div>
      <ProductsByCategoryPopup categoryId={categoryId} popupShow={popupShow} setPopupShow={setPopupShow} />
      <div className="bg-white h-[50px] border rounded-lg border-1  w-full mt-2 flex justify-end p-5 items-center">
        <button
          className="p-2  text-white xs:text-xs md:text-sm rounded-md bg-red-500 text-center flex items-center justify-center gap-2"
          onClick={() => {
            setIsFormOpen(true);
            setSelectedCategoryId(null);
          }}
        >
          <span>
            <FaPlus />
          </span>
          <h1>{t("add_category")}</h1>
        </button>
      </div>
      {/* <div className="bg-white rounded-xl w-full  "> */}
        {/* XS mobile card layout */}
      <div className="lg:hidden h-[520px] border mt-3 rounded-xl overflow-y-scroll">
        {loading
          ? // Skeleton cards
            [...Array(5)].map((_, index) => (
              <div
                key={`mobile-skeleton-${index}`}
                className="bg-white border-b rounded-xl p-3 my-3 mx-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-28"></div>
                    <div className="h-2 bg-gray-200 rounded animate-pulse w-16"></div>
                  </div>
                </div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-24 mt-3"></div>
              </div>
            ))
          : itemCategory.map((category, index) => (
              <div
                key={`mobile-${index}`}
                className="bg-white border-b rounded-xl p-3 my-3 mx-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setCategoryId(category.itemCategoryId);
                  setPopupShow(true);
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Image
                      alt=""
                      src={
                        process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                        getThumbnailUrl(category.imageURL)
                      }
                      width={40}
                      height={40}
                      className="rounded-xl w-10 h-10 border p-1 shrink-0"
                    />
                    <div className="min-w-0">
                      <h1 className="text-sm font-semibold truncate">
                        {localStorage.lang === "ar"
                          ? category.nameAr
                          : category.nameEn}
                      </h1>
                      <h1 className="text-xs text-gray-600">
                        {t("main_category")}
                      </h1>
                    </div>
                  </div>
                  <div className="bg-red-100 rounded-full text-red-600 px-3 py-1 font-semibold text-xs shrink-0 text-center">
                    <h1>{category.itemsCount}</h1>
                    <h2>{t("products_category")}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t">
                  <button
                    className="text-blue-800 text-sm flex items-center gap-1 bg-blue-300 px-3 py-1 font-semibold rounded-md hover:bg-blue-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      openForm(category.itemCategoryId);
                    }}
                  >
                    <MdEdit />
                    {t("edit")}
                  </button>
                  <button
                    className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-3 py-1 font-semibold rounded-md hover:bg-red-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCategory(category.itemCategoryId);
                    }}
                  >
                    <MdDelete />
                    {t("delete")}
                  </button>
                </div>
              </div>
            ))}
      </div>
      <table className=" hidden lg:table w-full table-fixed rounded-3xl  border mt-3  ">
          <thead className="w-full bg-[#f0eff0] h-12 rounded-lg text-justify sticky top-0  z-10">
            <tr className="  text-xs">
              <th className=" px-5">{t("image")}</th>
              <th className="">{t("category_name_capetal")}</th>
              <th className=" px-5">{t("products_count")}</th>
              <th className=""></th> 
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full cursor-pointer ">
            {loading
              ? // Skeleton rows
              [...Array(7)].map((_, index) => (
                <tr key={`skeleton-${index}`} className="border-t">
                  <td className="px-4 py-2">
                    <div className="h-14 bg-gray-200 rounded-lg animate-pulse w-14"></div>
                  </td>

                  {/* <td className="px-4 py-2 flex items-center gap-2">
                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse w-16"></div>
                    <div className="flex flex-col gap-2">
                    <div  className="h-4 bg-gray-200 rounded-lg animate-pulse w-28"></div>
                    <div  className="h-2 bg-gray-200 rounded-md animate-pulse w-20"></div>
                    </div>
                  </td> */}
                  <td className=" py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  </td>
                  <td className="py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                  <td className="py-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                  </td>
                </tr>
              ))
              : itemCategory.map((category, index) => (
                <tr
                  key={index}
                  className=" text-red-950 border-t w-full hover:bg-gray-100 "
                >
                  <td
                    className="px-4"
                    onClick={() => {
                      setCategoryId(category.itemCategoryId)
                      setPopupShow(true)
                    }}
                  >
                    <span className="w-[200px]">
                      <Image
                        alt=""
                        src={
                          process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL +
                          getThumbnailUrl(category.imageURL)}
                        width={40}
                        height={40}
                        className="rounded-xl xs:w-10 xs:h-10 md:w-20 md:h-20  border my-1 p-1"
                      // decoding="async"
                      />
                    </span>
                  </td>

                  <td
                    onClick={() => {
                      setCategoryId(category.itemCategoryId)
                      setPopupShow(true)
                    }}>
                    <div>
                      <h1 className="md:text-sm xs:text-xs font-semibold">
                        {localStorage.lang === "ar"
                          ? category.nameAr
                          : category.nameEn}
                      </h1>
                      <h1 className="md:text-xs xs:text-[10px]">
                        {t("main_category")}
                      </h1>
                    </div>
                  </td>
                  <td onClick={() => {
                    setCategoryId(category.itemCategoryId)
                    setPopupShow(true)
                  }}>
                    <div className="bg-red-100 md:w-[80px]  xs:w-[60px] text-center rounded-full text-red-600  px-2 font-semibold md:text-xs xs:text-[10px]">
                      <h1>{category.itemsCount}</h1>
                      <h2>{t("products_category")}</h2>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-5">
                      <button
                        className="text-blue-800 text-sm flex items-center gap-1 bg-blue-300 px-2 py-1 font-semibold rounded-md hover:bg-blue-400"
                        onClick={() => {
                          openForm(category.itemCategoryId);
                        }}
                      >
                        <MdEdit />
                        <h1 className="md:block xs:hidden">{t("edit")}</h1>
                      </button>
                      <button
                        className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400"
                        onClick={() =>
                          deleteCategory(category.itemCategoryId)
                        }
                      >
                        <MdDelete />
                        <h1 className="md:block xs:hidden">{t("delete")}</h1>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      {/* </div> */}
    </div>
  );
}
