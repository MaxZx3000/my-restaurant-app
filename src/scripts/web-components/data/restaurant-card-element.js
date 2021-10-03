import ApiEndpoint from '../../globals/api-endpoint.js';
import CardElement from '../card/card.js';

class RestaurantCardElement extends CardElement {
  constructor(restaurant, link) {
    super();
    this.link = link;
    this.restaurant = restaurant;
    this.imageElement = document.createElement('div');
    this.detailElement = document.createElement('div');
    this.linkElement = document.createElement('a');
  }
  renderCardElement() {
    super.renderCardElement();
    this.linkElement.href = this.link;
  }
  renderImageElement() {
    const pictureId = this.restaurant.pictureId;
    const name = this.restaurant.name;
    const imageURL = `${ApiEndpoint.restaurantImageSmall(pictureId)}`;
    this.imageElement.className = 'image-container';
    this.imageElement.innerHTML = `
        <img loading = "lazy" tabindex='0' src = '${imageURL}' alt = '${name}' width = '100%' height = '250px'>
        <h2 tabindex='0' class = 'text-image-caption restaurant-title'>${name}</h2>
    `;
    const imgElement = this.imageElement.querySelector('img');
    imgElement.addEventListener('error', () => {
      imgElement.src = ApiEndpoint.NO_RESRAURANT_DATA_IMAGE;
    });
  }
  renderMainInformationElement() {
    const description = this.restaurant.getDescriptionEllipsis();
    const city = this.restaurant.city;
    const rating = this.restaurant.rating;
    this.detailElement.className = 'data-container';
    this.detailElement.innerHTML += `
        <div class = 'restaurant-icon'>
            <i tabindex='0' aria-label='City' class = 'material-icons icon-colorized embossed-icon'>place</i>
            <p tabindex='0' class = 'right-subtitle restaurant-city'>${city}</p>
        </div>
        <div class = 'restaurant-icon'>
            <i tabindex='0' aria-label='Rating' class = 'material-icons icon-colorized embossed-icon'>star</i>
            <p tabindex='0' class = 'right-subtitle restaurant-rating'>${rating}</p>
        </div>
        <p tabindex='0' class = 'restaurant-description no-wrap-text'>${description}</p>
    `;
  }
  render() {
    super.render();
    this.renderImageElement();
    this.renderMainInformationElement();
    this.appendChildren();
  }
  appendChildren() {
    this.linkElement.appendChild(this.imageElement);
    this.linkElement.appendChild(this.detailElement);
    this._cardElement.appendChild(this.linkElement);
    this.appendChild(this._cardElement);
  }
}
customElements.define('restaurant_card-element', RestaurantCardElement);
export default RestaurantCardElement;
