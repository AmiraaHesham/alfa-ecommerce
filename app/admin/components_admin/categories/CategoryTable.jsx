"use client";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { deleteRequest, getRequest } from "../../../../utils/requestsUtils.js";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { getThumbnailUrl } from "../../../../utils/functions";

export default function CategorysTable() {
  const { t } = useLanguage();
  const { triggerRefresh } = useRefresh();
  const { setSelectedCategoryId } = useIdContext();
  const { refreshKey } = useRefresh();
  let [itemCategory, setItemCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllCategories = async () => {
    try {
      const resData = await getRequest(
        "/api/admin/itemCategory/getCategoryWithItemCounts"
      );
      setItemCategory(resData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const itemCategoryId = (category) => {
    setSelectedCategoryId(category.itemCategoryId);
    let form = document.querySelector("#add-category-form");
    let nameFormCatogery = document.querySelector("#nameFormCategory");
    let btn_saveCategory = document.querySelector("#btn-saveCategory");
    let btn_editCategory = document.querySelector("#btn-editCategory");
    btn_editCategory.classList.remove("hidden");
    btn_saveCategory.classList.add("hidden");
    nameFormCatogery.innerHTML = t("edit_category");
    form.classList.toggle("hidden");
    form.classList.add("flex");
  };

  const deleteCategory = async (categoryId) => {
    try {
      await deleteRequest(
        `/api/admin/itemCategory/${categoryId}`,
        t("message_DeleteText")
      );
      triggerRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [refreshKey]);

  return (
    <div>
      <div className="bg-white h-[50px] border rounded-lg border-1  w-full mt-2 flex justify-end p-5 items-center">
        <button
          className="p-2  text-white xs:text-xs md:text-sm rounded-md bg-red-500 text-center flex items-center justify-center gap-2"
          onClick={() => {
            let form = document.querySelector("#add-category-form");
            let btn_saveCategory = document.querySelector("#btn-saveCategory");
            let btn_editCategory = document.querySelector("#btn-editCategory");
            btn_editCategory.classList.add("hidden");
            btn_saveCategory.classList.remove("hidden");
            let nameFormCategory = document.querySelector("#nameFormCategory");
            nameFormCategory.innerHTML = t("add_category");
            form.classList.remove("hidden");
            form.classList.add("flex");
            let upload = document.querySelector("#label-uplod");
            let img = document.querySelector("#lable-img");
            img.classList.add("hidden");
            upload.classList.remove("hidden");
            setSelectedCategoryId(null);
          }}
        >
          <span>
            <FaPlus />
          </span>
          <h1>{t("add_category")}</h1>
        </button>
      </div>
      <div className=" rounded-xl w-full h-[600px] border  mt-3 overflow-hidden overflow-y-scroll ">
        <table className=" w-full  rounded-lg  ">
          <thead className="bg-[#F9FAFB]  text-justify">
            <tr className=" text-gray-500 h-12 md:text-xs  xs:text-[10px]">
              <th className="w-[30%] px-5">{t("image")}</th>
              <th className="w-[25%]">{t("category_name_capetal")}</th>
              <th className="w-[25%] px-5">{t("products_count")}</th>
              <th className="w-[25%] "></th>
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full cursor-pointer ">
            {loading
              ? // Skeleton rows
                [...Array(7)].map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b">
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
                    className=" text-red-950 border hover:bg-gray-100 cursor-pointer "
                  >
                    <td
                      className="px-4"
                      onClick={() => itemCategoryId(category)}
                    >
                      <span className="w-[100px]">
                        <Image
                          alt=""
                          src={`${
                            process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL
                          }${getThumbnailUrl(category.imageURL)}`}
                          width={40}
                          height={40}
                          className="rounded-xl xs:w-10 xs:h-10 md:w-14 md:h-12  border my-1 p-1"
                          // decoding="async"
                        />
                      </span>
                    </td>

                    <td onClick={() => itemCategoryId(category)}>
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
                    <td onClick={() => itemCategoryId(category)}>
                      <div className="bg-red-100 md:w-[80px]  xs:w-[60px] text-center rounded-full text-red-600  px-2 font-semibold md:text-xs xs:text-[10px]">
                        <h1>{category.itemsCount}</h1>
                        <h2>{t("products_category")}</h2>
                      </div>
                    </td>
                    <td>
                      <button
                        className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400"
                        onClick={() => deleteCategory(category.itemCategoryId)}
                      >
                        <MdDelete />
                        <h1 className="md:block xs:hidden">{t("delete")}</h1>
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
