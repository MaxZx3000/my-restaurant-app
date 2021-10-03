import AbstractElement from '../web-components/abstract-element.js';
import NavigationController from '../controller/navigation-controller.js';
import RestaurantDBManager from '../database/restaurant-idb-manager.js';
import RestaurantResultPresenter from './presenter/restaurant-result-presenter.js';
import LoadingElement from '../web-components/loading-element.js';
import SearchElement from '../web-components/search-element.js';

class FavoritePage extends AbstractElement {
  constructor() {
    super();
    this.headingElement = document.createElement('article');
    this.searchElement = document.createElement('article');
    this.favoriteResultElement = document.createElement('article');
  }
  async renderHeadingElement() {
    this.headingElement.innerHTML = `
      <i tabindex='0' aria-label='Store Icon' class = 'material-icons embossed-icon article-icon tab-trigger'>star</i>
      <h2 tabindex='0' class = 'section-title'>Your Favorite Restaurants</h2>
    `;
  }
  async renderSearchElement() {
    const searchElement = new SearchElement('Search...', 'search-restaurant');
    searchElement.setOnClickSearchFunction((value) => {
      this.renderFavoriteElement(value);
    });
    this.searchElement.appendChild(searchElement);
  }
  async renderFavoriteElement(value='') {
    this.favoriteResultElement.id = 'favorite-restaurant-results';
    this.favoriteResultElement.innerHTML = '';
    const detailRestaurantURL = (id) => {
      return `detail?id=${id}&saved=true`;
    };
    const restaurantDataFetcher = async () => {
      return await RestaurantDBManager.getRestaurantByName(value);
    };
    const loadingElement = new LoadingElement('Loading...');
    this.favoriteResultElement.appendChild(loadingElement);
    RestaurantResultPresenter.renderResult({
      restaurantResultElement: this.favoriteResultElement,
      restaurantDataFetcher: restaurantDataFetcher,
      detailURL: detailRestaurantURL,
      noDataTitle: 'No Data',
      noDataMessage: `
        You haven't had any favorites yet!<br>
        Try adding your favorite restaurants, then come back here!
      `,
    });
    this.favoriteResultElement.removeChild(loadingElement);
  }
  async render() {
    this.renderHeadingElement();
    this.renderSearchElement();
    this.renderFavoriteElement();
    this.appendChildren();
  }
  appendChildren() {
    this.appendChild(this.headingElement);
    this.appendChild(this.searchElement);
    this.appendChild(this.favoriteResultElement);
  }
  disconnectedCallback() {
    this.innerHTML = '';
    this.searchElement.innerHTML = '';
    this.headingElement.innerHTML = '';
    this.favoriteResultElement.innerHTML = '';
  }
  async connectedCallback() {
    await this.render();
    NavigationController.setNavigationElements();
  }
}
customElements.define('favorite-page', FavoritePage);
export default FavoritePage;
