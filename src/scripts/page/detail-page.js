import AbstractElement from '../web-components/abstract-element.js';
import CardElement from '../web-components/card/card.js';
import ContainerElement from '../web-components/container-element.js';
import GridElement from '../web-components/grid-element.js';
import ApiEndpoint from '../globals/api-endpoint.js';
import LoadingElement from '../web-components/loading-element.js';
import PageController from '../controller/page-controller.js';
import DataFetcher from '../fetch-request/restaurant-data-fetcher.js';
import LikeRestaurantElement from '../web-components/data/like-restaurant-element.js';
import DataValidation from '../validation/data-validation.js';
import NavigationController from '../controller/navigation-controller.js';
import NoDataElement from '../web-components/no_data-element.js';
import WindowController from '../controller/window-controller.js';
import RestaurantDBManager from '../database/restaurant-idb-manager.js';
import CustomerReviewFormView from './presenter/customer-review-form-template.js';
import CustomerReviewPresenter from './presenter/customer-review-presenter.js';
import RestaurantDataFetcher from '../fetch-request/restaurant-data-fetcher.js';

class DetailPage extends AbstractElement {
  constructor() {
    super();
    this.loadingElement = new LoadingElement(`Retrieving restaurant data...`);
    this.headingElement = document.createElement('article');
    this.descriptionElement = document.createElement('article');
    this.categoriesElement = document.createElement('article');
    this.menusElement = document.createElement('article');
    this.customerReviewsElement = document.createElement('article');
    this.errorElement = document.createElement('article');
    this.restaurant = null;
  }
  renderFailedLoadElement(message) {
    const title = 'Error';
    const noDataElement = new NoDataElement(title, message);
    noDataElement.render();
    this.errorElement.appendChild(noDataElement);
  }
  async renderHeadingElement() {
    this.headingElement.id = 'heading';
    const containerImageElement = new ContainerElement('div', 'image-element');
    containerImageElement.setElementFunction((containerElement) => {
      const pictureId = this.restaurant.pictureId;
      containerElement.innerHTML = `
        <link rel = "preload" as = "image" href = "${ApiEndpoint.restaurantImageLarge(pictureId)}"/>
        <picture>
          <source alt = '${this.restaurant.name}' loading = 'lazy' media = '(max-width: 600px)' srcset = '${ApiEndpoint.restaurantImageSmall(pictureId)}'>
          <img alt = '${this.restaurant.name}' tabindex='0' loading = 'lazy' id = 'jumbo-image' class = 'tab-trigger' alt = '${this.restaurant.name}'
          src = '${ApiEndpoint.restaurantImageLarge(pictureId)}' width = '100%'>
        </picture>
      `;
      const imgElement = containerElement.querySelector('img');
      const sourceElement = containerElement.querySelector('source');
      imgElement.addEventListener('error', () => {
        imgElement.src = ApiEndpoint.NO_RESRAURANT_DATA_IMAGE;
        imgElement.classList.add('error-image');
      });
      sourceElement.addEventListener('error', () => {
        sourceElement.srcset = ApiEndpoint.NO_RESRAURANT_DATA_IMAGE;
        imgElement.classList.add('error-image');
      });
    });
    const containerTextElement = new ContainerElement('div', 'text-element');
    containerTextElement.setElementFunction((containerElement) => {
      const rating = this.restaurant.rating;
      const city = this.restaurant.city;
      const address = this.restaurant.address;
      containerElement.innerHTML = `
        <h1 tabindex='0'>${this.restaurant.name}</h1>
        <div class = 'restaurant-icon'>
          <i tabindex='0' class = 'material-icons embossed-icon'>star</i>
          <p tabindex='0' class = 'right-subtitle'>${rating}</p>
        </div>
        <div class = 'restaurant-icon'>
          <i tabindex='0' class = 'material-icons embossed-icon'>home</i>
          <p tabindex='0' class = 'right-subtitle'>${city}</p>
        </div>
        <div class = 'restaurant-icon'>
          <i tabindex='0' class = 'material-icons embossed-icon'>place</i>
          <p tabindex='0' class = 'right-subtitle'>${address}</p>
        </div>
      `;
    });
    const gridElement = new GridElement(
        [containerImageElement, containerTextElement],
        'grid-heading',
    );
    gridElement.render();
    this.headingElement.appendChild(gridElement);
  }
  async renderDescriptionElement() {
    this.descriptionElement.className = 'card-description-template';
    this.descriptionElement.id = 'description';
    const cardElement = new CardElement();
    cardElement.setContentFunction((dataElement) => {
      dataElement.innerHTML = `
        <h2 tabindex='0'>Description</h2>
        <p tabindex='0' id = 'restaurant-description'>${this.restaurant.description}</p>
      `;
    });
    cardElement.render();
    this.descriptionElement.appendChild(cardElement);
  }
  async renderCategoriesElement() {
    this.categoriesElement.className = 'card-description-template';
    this.categoriesElement.id = 'categories';
    const cardElement = new CardElement();
    cardElement.setContentFunction((dataElement) => {
      dataElement.innerHTML = `
        <h2 tabindex='0'>Categories</h2>
      `;
      const cardElements = [];
      this.restaurant.categories.forEach((category) => {
        const cardElement = new CardElement();
        cardElement.setContentFunction((dataElement) => {
          dataElement.innerHTML = `
            <h3 tabindex='0'>${category.name}</h3>
          `;
        });
        cardElements.push(cardElement);
      });
      const gridElement = new GridElement(cardElements, 'grid-text-only');
      gridElement.render();
      dataElement.appendChild(gridElement);
    });
    cardElement.render();
    this.categoriesElement.appendChild(cardElement);
  }
  async renderMenusElement() {
    this.menusElement.className = 'card-description-template';
    this.menusElement.id = 'menus';
    const cardElement = new CardElement();
    cardElement.setContentFunction((dataElement) => {
      dataElement.innerHTML = `
        <h2 tabindex='0'>Menus</h2>
      `;
      const cardElements = [];
      this.restaurant.menus.drinks.forEach((drink) => {
        const cardElement = new CardElement();
        cardElement.setContentFunction((dataElement) => {
          dataElement.innerHTML = `
            <h3 tabindex='0'>${drink.name}</h3>
          `;
        });
        cardElements.push(cardElement);
      });
      this.restaurant.menus.foods.forEach((food) => {
        const cardElement = new CardElement();
        cardElement.setContentFunction((dataElement) => {
          dataElement.innerHTML = `
            <h3 tabindex='0'>${food.name}</h3>
          `;
        });
        cardElements.push(cardElement);
      });
      const gridElement = new GridElement(cardElements, 'grid-text-only');
      gridElement.render();
      dataElement.appendChild(gridElement);
    });
    cardElement.render();
    this.menusElement.appendChild(cardElement);
  }
  async renderCustomerReviewsElement() {
    this.customerReviewsElement.id = 'customer-reviews';
    this.customerReviewsElement.className = 'card-description-template';
    const cardElement = new CardElement();
    const onSuccessSubmit = () => {
      const url = `detail?id=${this.restaurant.id}&saved=false`;
      WindowController.setWindowURL(url);
      WindowController.reloadPage();
    };
    cardElement.setContentFunction(async (dataElement) => {
      dataElement.innerHTML = `
        <h2 tabindex='0'>Customer Reviews</h2>
      `;
      const formElement = await CustomerReviewFormView.getRenderedResult({
        restaurantID: this.restaurant.id,
        restaurantDataFetcher: RestaurantDataFetcher,
        onSuccess: onSuccessSubmit,
        onFailed: () => {},
      });
      dataElement.appendChild(formElement);
      const customerReviewElement = await CustomerReviewPresenter.getCustomerReviewElements(
          this.restaurant.customerReviews,
      );
      dataElement.appendChild(customerReviewElement);
    });
    cardElement.render();
    this.customerReviewsElement.appendChild(cardElement);
  }
  async renderBottomActionElement() {
    this.bottomActionElement = new LikeRestaurantElement({
      idName: 'like-button-element',
      restaurant: this.restaurant,
      saveSource: RestaurantDBManager,
      hideElement: document.querySelector('footer'),
    });
  }
  async beforeRender() {
    this.appendChild(this.loadingElement);
    try {
      this.restaurant = await PageController.getRestaurantDetailDatasource(
          RestaurantDBManager,
          DataFetcher,
      );
      this.removeChild(this.loadingElement);
      return true;
    } catch (exception) {
      this.removeChild(this.loadingElement);
      return false;
    }
  }
  async render() {
    const isSuccess = await this.beforeRender();
    if (DataValidation.isObjectInitialized(this.restaurant) === false) {
      const message = `
        Looks like we cannot find the restaurant's detail that you specified.<br>
        Please go back to the home page and pick an available restaurant! <br>
      `;
      this.renderFailedLoadElement(message);
      this.appendErrorChildren();
      return;
    }
    if (isSuccess) {
      this.renderHeadingElement();
      this.renderDescriptionElement();
      this.renderCategoriesElement();
      this.renderMenusElement();
      this.renderCustomerReviewsElement();
      this.renderBottomActionElement();
      this.appendChildren();
      return;
    }
    const message = `
      Looks like you're offline...<br>
      Please check your internet connection and try again!
    `;
    this.renderFailedLoadElement(message);
    this.appendErrorChildren();
  }
  appendChildren() {
    this.appendChild(this.headingElement);
    this.appendChild(this.descriptionElement);
    this.appendChild(this.categoriesElement);
    this.appendChild(this.menusElement);
    this.appendChild(this.customerReviewsElement);
    this.appendChild(this.bottomActionElement);
  }
  appendErrorChildren() {
    this.appendChild(this.errorElement);
  }
  focusCustomerReviewElement(elementId) {
    const inputElement = this.customerReviewsElement.querySelector(`#${elementId}`);
    inputElement.focus();
  }
  refreshPage() {
    const newURL = `detail?id=${this.restaurant.id}&saved=false`;
    WindowController.setWindowURL(newURL);
    WindowController.reloadPage();
  }
  disconnectedCallback() {
    this.innerHTML = ``;
    this.loadingElement = new LoadingElement(`Retrieving restaurant data...`);
    this.headingElement.innerHTML = '';
    this.descriptionElement.innerHTML = '';
    this.categoriesElement.innerHTML = '';
    this.menusElement.innerHTML = '';
    this.customerReviewsElement.innerHTML = '';
    this.errorElement.innerHTML = '';
  }
  async connectedCallback() {
    await this.render();
    NavigationController.setNavigationElements();
  }
}
customElements.define('detail-page', DetailPage);
export default DetailPage;
