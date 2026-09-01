import Image from "next/image";
import { useLanguage } from "../../../../context/LanguageContext";
import { getThumbnailUrl } from "../../../../utils/functions";
import { MdCancel, MdCancelPresentation, MdDelete } from "react-icons/md";

export default function CartTable({ items , loading}) {
      const { t ,locale} = useLanguage();
    //   const [loading, setLoading] = useState(true);
    
      const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
      const deleteItemFormCart = async (itemLineId, productID) => {
        if (userId) {
          await deleteRequest(
            `/api/shopCarts/deleteLine/${itemLineId}`,
            t("message"),
          );
          getProductInCart();
        } else {
          let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
          cart = cart.filter((item) => Number(item.id) !== Number(productID));
    
          localStorage.setItem("cart", JSON.stringify(cart));
          getProductInCart();
        }
      };
        const changeQuantity = async (itemLineId, itemId, newQuantity) => {
          if (userId) {
            await postRequest(
              `/api/shopCarts/changeQuantity`,
              {
                itemLineId: itemLineId,
                quantity: newQuantity,
              },
              "",
            );
            getProductInCart();
          } else {
            let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      
            cart = cart.map((item) =>
              Number(item.id) === Number(itemId)
                ? { ...item, quantity: newQuantity }
                : item,
            );
      
            localStorage.setItem("cart", JSON.stringify(cart));
            getProductInCart();
          }
        };
    return(
             <div className="w-full overflow-x-auto overflow-hidden rounded-3xl bg-white ">
                  <table className="w-full min-w-[640px]">
                    <thead className="text-center uppercase tracking-wide ">
                      <tr className="h-20 border-b border-b-gray-200 border-gray-100 ">
                        <th className="w-12"></th>
                        <th className="px-5 text-start">{t("product")} </th>
                        <th className="px-5 text-start">{t("price")} </th>
                        <th className="px-5 text-start">{t("quantity")} </th>
                        <th className="px-5 text-end">{t("subtotal")} </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white text-md w-full  ">
                      {loading ? (
                        // Skeleton rows
                        [...Array(5)].map((_, index) => (
                          <tr key={`skeleton-${index}`}>
                            <td className="py-5 ps-5">
                              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                            <td className="py-5 px-5">
                              <div className="flex items-center gap-4">
                                <div className="h-20 w-20 shrink-0 bg-gray-100 rounded-xl animate-pulse"></div>
                                <div className="flex flex-col gap-2">
                                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-32"></div>
                                  <div className="h-2 bg-gray-200 rounded-md animate-pulse w-20"></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-5 px-5">
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                            </td>
                            <td className="py-5 px-5">
                              <div className="h-9 w-28 bg-gray-100 rounded-full animate-pulse"></div>
                            </td>
                            <td className="py-5 px-5">
                              <div className="h-4 bg-gray-200 rounded animate-pulse w-16 ms-auto"></div>
                            </td>
                          </tr>
                        ))
                      ) : items.length != 0 ? (
                        items.map((item, index) => {
                          const product = userId ? item.item : item;
                          return (
                            <tr
                              key={index}
                              className="transition-colors hover:bg-gray-50/60"
                            >
                              <td className="py-5 ps-5">
                                <button
                                  onClick={() => {
                                    deleteItemFormCart(item.itemLineId, product.itemId);
                                  }}
                                  className="text-xl text-gray-400 transition-colors hover:text-red-500"
                                >
                                  <MdCancel />
                                </button>
                              </td>
                              <td className="py-5 px-5">
                                <div className="flex items-center gap-4">
                                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                                    <Image
                                      alt=""
                                      src={`${process.env.NEXT_PUBLIC_API_IMAGE_BASE_URL}${getThumbnailUrl(product.mainImageURL)}`}
                                      width={80}
                                      height={80}
                                      className="h-full w-full object-contain"
                                    />
                                  </div>
        
                                  <div>
                                    <h1 className="font-semibold text-sm text-gray-900">
                                      {locale === "ar"
                                        ? product.nameAr
                                        : product.nameEn}
                                    </h1>
                                   
                                  </div>
                                </div>
                              </td>
                              <td className="py-5 px-5">
                                <div className="flex flex-col gap-1">
                                  <span className="font-semibold text-gray-900">
                                    {product.unitPrice
                                      ? product.unitPrice.toLocaleString("en-US")
                                      : product.price}{" "}
                                    {t("currency")}{" "}
                                  </span>
        
                                  {product.oldUnitPrice ? (
                                    <span className="text-xs text-gray-400 line-through">
                                      {product.oldUnitPrice.toLocaleString("en-US")}{" "}
                                      {t("currency")}
                                    </span>
                                  ) : product.oldPrice ? (
                                    <span className="text-xs text-gray-400 line-through">
                                      {product.oldPrice.toLocaleString("en-US")}{" "}
                                      {t("currency")}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </td>
                              <td className="">
                                <div className="inline-flex items-center  rounded-full border border-gray-200 bg-white px-3 py-2 text-gray-700">
                                  <button
                                    onClick={() => {
                                      if (item.quantity > 1) {
                                        changeQuantity(
                                          item.itemLineId,
                                          product.itemId,
                                          item.quantity - 1,
                                        );
                                      }
                                    }}
                                    className="flex h-6 w-6 items-center justify-center rounded-full text-lg leading-none font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
                                  >
                                    −
                                  </button>
        
                                  <span className="min-w-6 text-center text-sm font-medium">
                                    {item.quantity}
                                  </span>
        
                                  <button
                                    onClick={() => {
                                      changeQuantity(
                                        item.itemLineId,
                                        product.itemId,
                                        item.quantity + 1,
                                      );
                                    }}
                                    className="flex h-6 w-6 items-center justify-center rounded-full text-lg leading-none font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="py-5 px-5 text-end">
                                <span className="font-semibold text-[#da643b]">
                                  {item.totalPrice
                                    ? item.totalPrice.toLocaleString("en-US")
                                    : item.price
                                      ? item.price * item.quantity
                                      : ""}{" "}
                                  {t("currency")}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-gray-500">
                            {t("noProductsInCart")}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
    )
}