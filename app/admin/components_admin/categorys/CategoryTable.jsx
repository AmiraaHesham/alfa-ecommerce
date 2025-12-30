"use client";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { deleteRequest } from "../../../../utils/requestsUtils.js";
import { useEffect, useState, useCallback } from "react";
import { getCategories } from "../../../../utils/functions";

export default function CategorysTable() {
  const { t } = useLanguage();
  const { triggerRefresh } = useRefresh();

  const { setSelectedId } = useIdContext();
  const { setSelectedNameEn } = useIdContext();
  const { setSelectedNameAr } = useIdContext();
  const { setSelectedPhoto } = useIdContext();
  const { refreshKey } = useRefresh();

  let [itemCategory, setItemCategory] = useState([]);

  const getAllCategories = async () => {
    const resData = await getCategories();
    setItemCategory(resData);
    console.log(process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL)
  };
  const itemCategoryId = (category) => {
    let form = document.querySelector("#add-category-form");
    let nameFormCatogery = document.querySelector("#nameFormCategory");
    let btn_saveCategory = document.querySelector("#btn-saveCategory");
    let btn_editCategory = document.querySelector("#btn-editCategory");
    btn_editCategory.classList.remove("hidden");
    btn_saveCategory.classList.add("hidden");
    nameFormCatogery.innerHTML = "Edit Category";
    form.classList.remove("hidden");
    form.classList.add("flex");
    setSelectedId(category.itemCategoryId);
    setSelectedNameEn(category.nameEn);
    setSelectedNameAr(category.nameAr);
    setSelectedPhoto(process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL+category.imageURL);
  };
  const deleteCategory = async (category) => {
    try {
      await deleteRequest(`/api/admin/itemCategory/${category.itemCategoryId}`);
      triggerRefresh()
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
          className="p-2 text-white xs:text-xs md:text-sm rounded-md bg-blue-500 text-center flex items-center justify-center gap-2"
          onClick={() => {
            let form = document.querySelector("#add-category-form");
            let btn_saveCategory = document.querySelector("#btn-saveCategory");
            let btn_editCategory = document.querySelector("#btn-editCategory");
            btn_editCategory.classList.add("hidden");
            btn_saveCategory.classList.remove("hidden");
            let nameFormCategory = document.querySelector("#nameFormCategory");
            nameFormCategory.innerHTML = "Add Category";
            form.classList.remove("hidden");
            form.classList.add("flex");
            // setSelectedId("");
            setSelectedNameEn("");
            setSelectedNameAr("");
            setSelectedPhoto("");
                let upload = document.querySelector("#label-uplod");
    let img = document.querySelector("#lable-img");
    img.classList.add("hidden");
    upload.classList.remove("hidden");
          }}
        >
          <span>
            <FaPlus />
          </span>
          <h1>{t("add_new_category")}</h1>
        </button>
      </div>
      <div className=" rounded-xl w-full h-screen border  mt-3 overflow-hidden overflow-y-scroll ">
        <table className=" w-full rounded-lg  ">
          <thead className="bg-[#F9FAFB]  text-justify">
            <tr className=" text-gray-500 h-12 md:text-xs  xs:text-[10px]">
              <th className="w-[5%]"></th>
              <th className="w-[20%]">{t("image")}</th>
              <th className="w-[35%]">{t("category_name_capetal")}</th>
              <th className="w-[25%] mx-5">{t("products_count")}</th>
            </tr>
          </thead>
          <tbody className="bg-white text-md w-full cursor-pointer ">
            {itemCategory && itemCategory.length > 0 ? (
              
              itemCategory.map((category, index) => (
                
                <tr
                  key={index}
                  className=" text-blue-950 border hover:bg-gray-100 "
                >
                  <td></td>
                  <td onClick={() => itemCategoryId(category)}>
                    <span className="w-[100px]">
                      <Image
                        alt=""
                        src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL+category.imageURL||''}`}
                        width={50}
                        height={50}
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
                    <div className="bg-blue-100 md:w-[80px]  xs:w-[60px] text-center rounded-full text-blue-600  px-2 font-semibold md:text-xs xs:text-[10px]">
                      <h1>{category.itemsCount}</h1>
                      <h2>{t("products_category")}</h2>
                    </div>
                  </td>
                  <td>
                    <button
                      className="text-red-800 text-sm flex items-center gap-1 bg-red-300 px-2 py-1 font-semibold rounded-md hover:bg-red-400"
                      onClick={() => deleteCategory(category)}
                    >
                      <MdDelete />
                      <h1 className="md:block xs:hidden">{t("delete")}</h1>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  لا توجد بيانات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
