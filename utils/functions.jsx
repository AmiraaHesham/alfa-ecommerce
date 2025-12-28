import { getRequest } from "../utils/requestsUtils";

export const getCategories = async () => {
    try {
      const response = await getRequest(
        "/api/admin/itemCategory/getCategoryWithItemCounts"
      );
     
    return await response.data;



    } catch (error) {
      console.log(error);
    }
  };