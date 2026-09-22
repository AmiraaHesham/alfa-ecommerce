"use client";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext.js";
import { getProductDetails, getThumbnailUrl } from "../../../../utils/functions.jsx";
import { postRequest, putRequest } from "../../../../utils/requestsUtils.js";
import { useRefresh } from "../../../../context/refreshContext.jsx";
import Select from "react-select";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL;

const resolveProductImage = (product) =>
  product?.mainImageURL || product?.images?.[0]?.imageUrl || "";

export default function ProductAdsForm({ isFormOpen, setIsFormOpen, editOffer, nextNumber }) {
  const { t, locale } = useLanguage();
  const { triggerRefresh } = useRefresh();
  const [title, setTitle] = useState("");
  const [itemId, setItemId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [photo, setPhoto] = useState({ imageFile: "", imageUrl: "" });
  const [loading, setLoading] = useState(false);
  const objectUrlRef = useRef(null);

  const isEditMode = !!editOffer;

  const clearNewImage = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPhoto({ imageFile: "", imageUrl: "" });
  }, []);

  const fetchProductOptions = useCallback(async (searchText = "") => {
    const res = await postRequest(
      "/api/public/items/search",
      { page: 0, size: 100, searchText },
      ""
    );
    const data = res.data?.content || res.data || [];
    setOptions(
      data.map((product) => ({
        value: product.itemId,
        label: locale === "ar" ? product.nameAr : product.nameEn,
        product,
      }))
    );
  }, [locale]);

  const loadEditData = useCallback(async () => {
    if (!editOffer) return;
    setTitle(editOffer.title || "");
    if (editOffer.itemId) {
      setItemId(editOffer.itemId);
      setSelectedProduct({
        value: editOffer.itemId,
        label: `#${editOffer.itemId}`,
        product: null,
      });
      try {
        const res = await getProductDetails(editOffer.itemId);
        const product = res.data;
        setSelectedProduct({
          value: editOffer.itemId,
          label: locale === "ar" ? product.nameAr : product.nameEn,
          product,
        });
      } catch (error) {}
    }
  }, [editOffer, locale]);

  useEffect(() => {
    if (!isFormOpen) return;
    clearNewImage();
    setTitle("");
    setItemId("");
    setSelectedProduct(null);
    setSearch("");
    fetchProductOptions();
    loadEditData();
  }, [isFormOpen, editOffer, clearNewImage, fetchProductOptions, loadEditData]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handelUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPhoto({ imageFile: file, imageUrl: objectUrl });
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    await fetchProductOptions(search);
  };

  const selectedProductImage = () => {
    const url = resolveProductImage(selectedProduct?.product);
    return url ? IMAGE_BASE_URL + getThumbnailUrl(url) : "";
  };

  const displayAdImage = () => {
    if (photo.imageUrl) return photo.imageUrl;
    if (editOffer?.imageUrl) return IMAGE_BASE_URL + editOffer.imageUrl;
    return "";
  };

  const formatOptionLabel = ({ label, product }) => {
    const url = resolveProductImage(product);
    return (
      <div className="flex items-center gap-3">
        {url ? (
          <Image
            src={IMAGE_BASE_URL + getThumbnailUrl(url)}
            alt=""
            width={30}
            height={30}
            className="rounded-md object-cover w-[30px] h-[30px]"
          />
        ) : (
          <div className="w-[30px] h-[30px] bg-gray-100 rounded-md" />
        )}
        <span>{label}</span>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (!itemId) return;
    const formData = new FormData();
    if (photo.imageFile) {
      formData.append("imageFile", photo.imageFile);
    }
    formData.append("itemId", itemId);
    formData.append("title", title);
    formData.append("titleAr", title);
    formData.append("number", isEditMode ? editOffer.number : nextNumber);

    try {
      setLoading(true);
      if (isEditMode) {
        await putRequest(`/api/admin/offers/${editOffer.offerId}`, formData, t("message"));
      } else {
        await postRequest("/api/admin/offers", formData, t("message"));
      }
      triggerRefresh();
    } catch (error) {
    } finally {
      setLoading(false);
      clearNewImage();
      setTitle("");
      setItemId("");
      setSelectedProduct(null);
      setSearch("");
      setIsFormOpen(false);
    }
  };

  return (
    <div
      id="add-product-ad-form"
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${isFormOpen ? "flex" : "hidden"}`}
    >
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Image
            src="/Images/logo.png"
            alt=""
            className="w-[100px] h-[100px] border-t-transparent rounded-full animate-pulse"
            width={100}
            height={100}
            priority
          />
        </div>
      )}
      <div className="bg-white p-5 xs:w-full lg:w-[500px] flex flex-col rounded-3xl">
        <div className="m-4 flex justify-between items-center">
          <h1 id="nameFormProductAd" className="text-lg font-semibold">
            {isEditMode ? t("edit_product_ad") : t("add_product_ad")}
          </h1>
          <button
            className="text-3xl text-red-950 hover:text-red-800"
            onClick={() => {
              setIsFormOpen(false);
              clearNewImage();
              setSelectedProduct(null);
              setSearch("");
            }}
          >
            <MdCancel />
          </button>
        </div>
        <hr className="h-1 mb-3"></hr>
        <div className="flex justify-center items-center">
          <form
            className="md:w-[60%] xs:w-[80%]"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {/* advert featured image upload */}
            <div className="flex flex-col items-center mt-2">
              {displayAdImage() ? (
                <div className="w-full h-[150px] relative border-2 border-dashed border-red-300 rounded-lg">
                  <div className="w-full h-full relative">
                    <Image
                      alt=""
                      src={displayAdImage()}
                      fill
                      sizes="(max-width: 768px) 80vw, 300px"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <label htmlFor="ProductAdFileInput" className="cursor-pointer w-full">
                  <div className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50">
                    <span className="text-4xl text-red-600">
                      <IoCloudUploadSharp />
                    </span>
                    <span className="text-sm text-center">{t("upload_ad_image")}</span>
                  </div>
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handelUpload}
                className="hidden"
                id="ProductAdFileInput"
              />
            </div>

            {/* selected product featured image */}
            {selectedProductImage() ? (
              <div className="flex items-center gap-3 mt-4 p-2 border rounded-lg bg-gray-50">
                <Image
                  alt=""
                  src={selectedProductImage()}
                  width={50}
                  height={50}
                  className="rounded-md object-cover w-[50px] h-[50px]"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">{t("product_featured_image")}</span>
                  <span className="text-sm font-semibold">{selectedProduct?.label}</span>
                </div>
              </div>
            ) : null}

            <div className="mt-4 flex flex-col gap-2">
              <label className="text-md text-gray-500">{t("title")}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("title_placeholder")}
                className="w-full outline-none text-gray-900 text-lg p-1 border rounded-md placeholder:text-sm"
              />
              <label className="text-md">{t("choose_product")}</label>
              <div className="border rounded-lg border-red-300 px-1">
                <Select
                  options={options}
                  value={selectedProduct}
                  inputValue={search}
                  isSearchable
                  formatOptionLabel={formatOptionLabel}
                  placeholder={t("search")}
                  onInputChange={(value, actionMeta) => {
                    if (actionMeta.action === "input-change") {
                      setSearch(value);
                    }
                    return value;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  onChange={(selected) => {
                    setItemId(selected.value);
                    setSelectedProduct(selected);
                    setSearch("");
                  }}
                  noOptionsMessage={() => t("no_products") || "لا توجد منتجات"}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                      boxShadow: "none",
                      fontWeight: "600",
                      height: "100%",
                      width: "100%",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#374151",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? "#dc2626"
                        : state.isFocused
                          ? "#fee2e2"
                          : "#ffffff",
                      color: state.isSelected ? "#ffffff" : "#374151",
                      cursor: "pointer",
                      padding: "10px",
                      "&:hover": {
                        backgroundColor: state.isSelected ? "#dc2626" : "#fee2e2",
                      },
                    }),
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                id="btn-saveProductAd"
                className="bg-red-600 py-2 px-3 text-white mt-7 hover:bg-red-800 rounded-lg"
                onClick={handleSubmit}
              >
                {isEditMode ? t("save-changes") : t("save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}