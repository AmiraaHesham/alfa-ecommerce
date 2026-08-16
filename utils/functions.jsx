import { getRequest, postRequest } from "../utils/requestsUtils";

export const getCategories = async () => {
  const response = await postRequest(
    "/api/public/itemCategory/search",
    {
      page: 0,
      size: 100,
    },
    ""
  );
  return await response;
};
export const getSliderImage = async () => {
  const response = await getRequest("/api/public/sliderImages");
  return await response.data;
};
export const getFeatuerProducts = async () => {
  const response = await postRequest(
    "/api/public/items/search",
    {
      page: 0,
      size: 50,
      isFavorite: true,
    },
    ""
  );
  return await response;
};

export const getProductDetails = async (productId) => {
  const response = await getRequest(`/api/public/items/${productId}`);
  return await response;
};
export const getThumbnailUrl = (imageUrl) => {
  if (!imageUrl) return null;

  const lastSlashIndex = imageUrl.lastIndexOf("/");
  const path = imageUrl.substring(0, lastSlashIndex + 1);
  const fileName = imageUrl.substring(lastSlashIndex + 1);
  return `${path}thumb_${fileName}`;
};

