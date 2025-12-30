import { getRequest } from "../utils/requestsUtils";

export const getCategories = async () => {
    try {
      const res= await getRequest(
        "/api/admin/itemCategory/getCategoryWithItemCounts"
      );
     
  return await res



    } catch (error) {
      console.log(error);
    }
  };