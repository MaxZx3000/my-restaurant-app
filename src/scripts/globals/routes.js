import DetailPage from '../page/detail-page.js';
import FavoritePage from '../page/favorite-page.js';
import HomePage from '../page/home-page.js';
import NotFoundPage from '../page/not-found-page.js';
import WindowValidation from '../validation/window-validation.js';

class Routes {
  constructor() {
    if (Routes.instance == null) {
      Routes.instance = this;
    }
    return Routes.instance;
  }
  getPage(url) {
    if (WindowValidation.isHomeURL(url)) {
      return new HomePage();
    }
    if (WindowValidation.isDetailURL(url)) {
      return new DetailPage();
    }
    if (WindowValidation.isFavoriteURL(url)) {
      return new FavoritePage();
    }
    return new NotFoundPage();
  }
}
const RouteManager = new Routes();
Object.freeze(RouteManager);
export default RouteManager;
