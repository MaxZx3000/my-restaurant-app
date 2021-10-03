import WindowController from './window-controller.js';

class _PageController {
  constructor() {
    if (_PageController.instance == null) {
      _PageController.instance = this;
    }
    return _PageController.instance;
  }
  async getRestaurantDetailDatasource(restaurantDataSource, fetcher) {
    const params = WindowController.getURLKeyPairParams();
    if (params['saved'] === 'true') {
      const dbManager = restaurantDataSource;
      const restaurantDB = await dbManager.getRestaurantById(params['id']);
      return restaurantDB;
    }
    const restaurantOnline = await fetcher.getRestaurantById(params['id']);
    return restaurantOnline.restaurant;
  }
}
const PageController = new _PageController();
Object.freeze(PageController);
export default PageController;
