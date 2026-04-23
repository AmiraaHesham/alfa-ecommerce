"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import {useEffect,  useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { postRequest, putRequest } from "../../../../utils/requestsUtils.js";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { useIdContext } from "../../../../context/idContext";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import { getThumbnailUrl } from "../../../../utils/functions.jsx";

export default function CategoryForm({ isFormOpen, setIsFormOpen }) {
  const [photo, setPhoto] = useState({
    imageFile: "",
    image: "",
  });

  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const { t } = useLanguage();
  const { triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState();

  const { selectedCategoryId, setSelectedCategoryId } = useIdContext();
  const isEditMode = selectedCategoryId !== null;

  const handelupload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return; // مهم جدًا

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto((prev) => ({
        ...prev,
        image: reader.result,
        imageFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const addCategory = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nameEn", nameEn);
      formData.append("nameAr", nameAr);
      formData.append("imageFile", photo.imageFile);
      await postRequest("/api/admin/itemCategory", formData, t("message"));
      triggerRefresh();
      
      setSelectedCategoryId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const CategoryData = async () => {
    try {  setLoading(true);
      if (selectedCategoryId !== null) {
      

        const res = await getRequest(
          `/api/admin/itemCategory/${selectedCategoryId}`,
        );
        const resData = res.data
        setNameAr(resData.nameAr)
         setNameEn(resData.nameEn);
        setPhoto((prev) => ({
          ...prev,
          image: process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL + getThumbnailUrl(resData.imageURL),
        }));
      } else {
        (setNameAr(""), setNameEn(""));
        setPhoto((prev) => ({
          ...prev,
          image: "",
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nameEn", nameEn);
      formData.append("nameAr", nameAr);
      if (photo.imageFile) {
        formData.append("imageFile", photo.imageFile);
      }
      await putRequest(
        `/api/admin/itemCategory/${selectedCategoryId}`,
        formData,
        t("message"),
      );
      triggerRefresh();
      setSelectedCategoryId(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    CategoryData();
  }, [selectedCategoryId]);
  return (
    <div
      id="add-category-form"
      className={`justify-center items-center w-full  mt-5  ${isFormOpen ? "flex" : "hidden"}`}
    >
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Image
            src="/Images/logo.png"
            alt=""
            className="w-[100px] h-[100px]  border-t-transparent rounded-full animate-pulse"
            width={100}
            height={100}
            priority
          />
        </div>
      )}
      <div className="bg-white shadow-md shadow-slate-400 h-[530px] xs:w-full lg:w-[600px] flex flex-col border rounded-md">
        <div className="m-4 flex justify-between items-center">
          <h1 id="nameFormCategory" className="text-lg font-semibold">
            {" "}
            {isEditMode ? t("edit_category") : t("add_category")}
          </h1>
          <button
            className="text-3xl text-red-950  hover:text-red-800"
            onClick={() => {
              setIsFormOpen(false);
              setSelectedCategoryId(null);
            }}
          >
            <MdCancel />
          </button>
        </div>
        <hr className="h-1 mb-3"></hr>
        <div className="flex   justify-center items-center ">
          <form
            className=" md:w-[60%] xs:w-[80%] "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mb-4">
              <div className="flex flex-col gap-2 ">
                <label className="text-md text-gray-500">
                  {t("category_name")}* [en]
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  required
                  className="w-full bg-[#F9FAFB] outline-none text-gray-900 text-lg  p-1 border rounded-md"
                />
                <label className="text-md text-gray-500">
                  {t("category_name")}* [ar]
                </label>
                <input
                  type="text"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  className="w-full bg-[#F9FAFB] outline-none text-gray-900 text-lg  p-1 border rounded-md"
                />
              </div>
            </div>

            <label htmlFor="fileInput">
              <div className="flex flex-col items-center h-[150px] justify-center p-3 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50">
                {!photo.image ? (
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-4xl text-red-600">
                      <IoCloudUploadSharp />
                    </span>
                    <span className="text-sm text-gray-500">
                      {t("add-photo")}
                    </span>
                  </div>
                ) : (
                  // 🖼️ Image Preview
                  <div className="w-[100px] h-[100px]">
                    <Image
                      alt=""
                      src={photo.image}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handelupload}
              className="hidden"
              id="fileInput"
            />

            <div className="flex justify-center items-center">
              <button
                type="submit"
                id="btn-saveCategory"
                className={`"bg-red-600 py-2 px-3 text-white mt-7  hover:bg-red-800 rounded-lg ${isEditMode ? "hidden" : ""}`}
                onClick={addCategory}
              >
                {t("save")}
              </button>
              <button
                type="submit"
                id="btn-editCategory"
                className={`bg-red-600 py-2 px-3 text-white mt-7  hover:bg-red-800 rounded-lg  ${isEditMode ? "" : "hidden"}`}
                onClick={updateCategory}
              >
                {t("save-changes")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
