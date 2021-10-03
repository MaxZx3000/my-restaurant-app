import CONFIG from './config.js';

const ApiEndpoint = {
  RESTAURANT_LIST: `${CONFIG.BASE_API_URL}/list`,
  restaurantDetail: (id) => `${CONFIG.BASE_API_URL}/detail/${id}`,
  restaurantListSearch: (query) => `${CONFIG.BASE_API_URL}/search?q=${query}`,
  ADD_REVIEW: `${CONFIG.BASE_API_URL}/review`,
  restaurantImageSmall: (restaurantId) =>
    `${CONFIG.BASE_API_URL}/images/small/${restaurantId}`,
  restaurantImageLarge: (restaurantId) =>
    `${CONFIG.BASE_API_URL}/images/large/${restaurantId}`,
  NO_RESRAURANT_DATA_IMAGE: `https://img.icons8.com/color/452/restaurant-.png`,
};
export default ApiEndpoint;
