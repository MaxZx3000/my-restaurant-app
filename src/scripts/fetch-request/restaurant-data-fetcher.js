import RestaurantDataOperations from '../data/restaurant-data-operations';
import ApiEndpoint from '../globals/api-endpoint';
import CONFIG from '../globals/config';
import FetchHelpers from './fetch-helpers';

class _RestaurantDataFetcher extends RestaurantDataOperations {
  constructor() {
    super();
    if (_RestaurantDataFetcher.instance == null) {
      _RestaurantDataFetcher.instance = this;
    }
    return _RestaurantDataFetcher.instance;
  }
  async getRestaurantById(restaurantID) {
    const path = ApiEndpoint.restaurantDetail(restaurantID);
    const apiResponse = await FetchHelpers.getJSONResponse(path);
    return apiResponse;
  }
  async getAllRestaurants() {
    const path = ApiEndpoint.RESTAURANT_LIST;
    const apiResponse = await FetchHelpers.getJSONResponse(path);
    return apiResponse.restaurants;
  }
  async getRestaurantByName(name) {
    const trimmedName = name.trim();
    const path = ApiEndpoint.restaurantListSearch(trimmedName);
    const apiResponse = await FetchHelpers.getJSONResponse(path);
    return apiResponse.restaurants;
  }
  async deleteRestaurantById(id) {
    throw new Error('Delete Restaurant By id is not supported!');
  }
  async addNewReview(customerReviewUploadData) {
    const path = ApiEndpoint.ADD_REVIEW;
    const params = {
      method: 'POST',
      headers: {
        'X-Auth-Token': CONFIG.API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerReviewUploadData),
    };
    const apiResponse = await FetchHelpers.getJSONResponse(path, params);
    return apiResponse;
  }
}

const RestaurantDataFetcher = new _RestaurantDataFetcher();
Object.freeze(RestaurantDataFetcher);
export default RestaurantDataFetcher;
