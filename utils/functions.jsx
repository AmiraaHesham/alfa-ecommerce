import { getRequest, postRequest } from "../utils/requestsUtils";

export const getCategories = async () => {
  const res = await getRequest("/api/admin/itemCategory/getCategoryWithItemCounts");
  return await res;
};
export const getSliderImage = async () => {
  const res = await getRequest("/api/admin/sliderImages");
  return await res;
};
//  export const getAllUsers = async () => {
//       try {
//         // console.log(searchInputRef.current.value);
//         const response = await postRequest("/api/users/search", {
//           page: 0,
//           size: 10,
//           searchText: searchInput.current.value,
//         });
//         const resUsers = response.data || [];
//         setUsers(resUsers);
//         // pagination()
//         //       console.log("Categories after set:", resProducts);
//       } catch (error) {
//         console.log(error);
//       }
//     };
