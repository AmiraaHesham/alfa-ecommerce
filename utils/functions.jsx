import { getRequest, postRequest } from "../utils/requestsUtils";

export const getCategories = async () => {
  const response = await postRequest(
    "/api/public/itemCategory/search",
    {
      page: 0,
      size: 10,
    },
    ""
  );
  return await response;
};
export const getSliderImage = async () => {
  const response = await getRequest("/api/public/sliderImages");
  return await response.data;
};
export const getFeatuerProducts = async (size) => {
  const response = await postRequest(
    "/api/public/items/search",
    {
      page: 0,
      size: size,
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

export const submitItemRating = async (itemId, rating, comment = "") => {
  const response = await postRequest(
    `/api/itemRatings/item/${itemId}`,
    { rating, comment },
    ""
  );
  return await response;
};

export const getItemRatingStarDistribution = async (itemId) => {
  const response = await getRequest(
    `/api/public/items/${itemId}/ratings/starDistribution`
  );
  return await response;
};

export const getItemRatings = async (itemId) => {
  const response = await getRequest(`/api/itemRatings/item/${itemId}`);
  return await response;
};
export const getThumbnailUrl = (imageUrl) => {
  if (!imageUrl) return null;

  const lastSlashIndex = imageUrl.lastIndexOf("/");
  const path = imageUrl.substring(0, lastSlashIndex + 1);
  const fileName = imageUrl.substring(lastSlashIndex + 1);
  return `${path}thumb_${fileName}`;
};

