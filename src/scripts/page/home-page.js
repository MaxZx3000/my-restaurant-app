import AbstractElement from '../web-components/abstract-element.js';
import NavigationController from '../controller/navigation-controller.js';
import DataFetcher from '../fetch-request/restaurant-data-fetcher.js';
import SearchElement from '../web-components/search-element.js';
import RestaurantResultPresenter from './presenter/restaurant-result-presenter.js';
import LoadingElement from '../web-components/loading-element.js';

class HomePage extends AbstractElement {
  constructor() {
    super();
    this.jumbotronElement = document.createElement('article');
    this.exploreRestaurantElement = document.createElement('article');
    this.restaurantResultElement = document.createElement('article');
  }
  renderJumbotronElement() {
    this.jumbotronElement.className = 'jumbotron';
    this.jumbotronElement.innerHTML = `
        <picture>
          <source alt = 'Hero Image' media = '(max-width: 600px)' loading = 'lazy' srcset = './images/hero-image_2-small.webp'>
          <img loading = 'lazy' alt = 'Hero Image' src = './images/hero-image_2-large.webp' width = '100%' height = '100%'>
        </picture>
        <i tabindex='0' class = 'material-icons tab-trigger' id = 'jumbotron-icon' aria-label='Utensils Icon'>local_dining</i>
        <h1 tabindex='0'>Welcome to our Restaurant App!</h1>
        <h2 tabindex='0'>The right place for finding all of your favorite restaurants!</h2>
    `;
  }
  async renderExploreRestaurantElement() {
    this.exploreRestaurantElement.id = 'explore-restaurant';
    this.exploreRestaurantElement.innerHTML = `
        <i tabindex='0' aria-label='Store Icon' class = 'material-icons embossed-icon article-icon'>store</i>
        <h2 tabindex='0' class = 'section-title'>Explore All Restaurants Below</h2>
    `;
    const searchElement = new SearchElement(
        'Search',
        'search-restaurant',
    );
    searchElement.setOnClickSearchFunction(async (value) => {
      const restaurantFetcher = async () => {
        const restaurantData = await DataFetcher.getRestaurantByName(value);
        return restaurantData;
      };
      this.renderRestaurantResults(restaurantFetcher);
    });
    const restaurantFetcher = async () => {
      const restaurantData = await DataFetcher.getAllRestaurants();
      return restaurantData;
    };
    this.exploreRestaurantElement.appendChild(searchElement);
    this.exploreRestaurantElement.appendChild(this.restaurantResultElement);
    this.renderRestaurantResults(restaurantFetcher);
  }
  async renderRestaurantResults(restaurantDataFetcher) {
    this.restaurantResultElement.id = 'restaurant-results';
    this.restaurantResultElement.innerHTML = '';
    const detailRestaurantURL = (id) => {
      return `detail?id=${id}&saved=false`;
    };
    const loadingElement = new LoadingElement('Loading...');
    this.restaurantResultElement.appendChild(loadingElement);
    await RestaurantResultPresenter.renderResult({
      restaurantResultElement: this.restaurantResultElement,
      restaurantDataFetcher: restaurantDataFetcher,
      noDataMessage: `
        Uh oh...Looks like we cannot find the restaurant you specified.<br>
        Please try searching with a different keyword.
      `,
      noDataTitle: 'No Data',
      detailURL: detailRestaurantURL,
    });
    this.restaurantResultElement.removeChild(loadingElement);
  }
  appendChildren() {
    this.appendChild(this.jumbotronElement);
    this.appendChild(this.exploreRestaurantElement);
  }
  async render() {
    this.renderJumbotronElement();
    this.renderExploreRestaurantElement();
    this.appendChildren();
  }
  disconnectedCallback() {
    this.innerHTML = ``;
    this.jumbotronElement.innerHTML = '';
    this.exploreRestaurantElement.innerHTML = '';
    this.restaurantResultElement.innerHTML = '';
  }
  async connectedCallback() {
    await this.render();
    NavigationController.setNavigationElements();
  }
}
customElements.define('home-page', HomePage);
export default HomePage;
