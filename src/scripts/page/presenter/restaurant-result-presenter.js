import Restaurant from '../../data/restaurant';
import RestaurantCardElement from '../../web-components/data/restaurant-card-element';
import NoDataElement from '../../web-components/no_data-element';
import GridElement from '../../web-components/grid-element';
import DataValidation from '../../validation/data-validation';
import WindowController from '../../controller/window-controller';

class _RestaurantResultPresenter {
  constructor() {
    if (_RestaurantResultPresenter.instance == null) {
      _RestaurantResultPresenter.instance = this;
    }
    return _RestaurantResultPresenter.instance;
  }
  async _renderError({restaurantResultElement, errorTitle, errorMessage}) {
    const noDataElement = new NoDataElement(errorTitle, errorMessage);
    noDataElement.render();
    restaurantResultElement.appendChild(noDataElement);
  }
  async _renderSuccess({restaurantResultElement, restaurantData, detailURL}) {
    const cardRestaurantElements = [];
    restaurantData.forEach((resData) => {
      const restaurantData = new Restaurant();
      restaurantData.setFromJSON(resData);
      const link = WindowController.getWindowURL(detailURL(restaurantData.id));
      const restaurantCardElement = new RestaurantCardElement(
          restaurantData,
          link,
      );
      cardRestaurantElements.push(restaurantCardElement);
    });
    const gridElement = new GridElement(
        cardRestaurantElements,
        'grid-restaurant',
    );
    gridElement.render();
    restaurantResultElement.appendChild(gridElement);
  }
  async renderResult({restaurantResultElement,
    restaurantDataFetcher,
    noDataTitle,
    noDataMessage,
    detailURL}) {
    try {
      const restaurantDataJSON = await restaurantDataFetcher();
      if (DataValidation.isCollectionEmpty(restaurantDataJSON)) {
        await this._renderError({
          restaurantResultElement: restaurantResultElement,
          errorTitle: noDataTitle,
          errorMessage: noDataMessage,
        });
      } else {
        await this._renderSuccess({
          restaurantResultElement: restaurantResultElement,
          restaurantData: restaurantDataJSON,
          detailURL: detailURL,
        });
      }
    } catch (exception) {
      console.trace(exception);
      const title = 'No Internet Connection';
      const message = `
        No internet connection.<br>
        Please check your internet connection and try again!
      `;
      await this._renderError({
        restaurantResultElement: restaurantResultElement,
        errorTitle: title,
        errorMessage: message,
      });
    }
  }
}
const RestaurantResultPresenter = new _RestaurantResultPresenter();
Object.freeze(RestaurantResultPresenter);
export default RestaurantResultPresenter;
