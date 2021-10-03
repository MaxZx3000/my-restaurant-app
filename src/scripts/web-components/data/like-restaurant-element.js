import DataValidation from '../../validation/data-validation.js';
import ActionBottomElement from '../action-bottom-element.js';

class LikeRestaurantElement extends ActionBottomElement {
  constructor({idName, restaurant, saveSource, hideElement}) {
    super(idName, hideElement);
    this.restaurant = restaurant;
    this.dbManager = saveSource;
  }
  async getIsRestaurantExist() {
    try {
      const restaurantDB = await this.dbManager.getRestaurantById(this.restaurant.id);
      return DataValidation.isObjectInitialized(restaurantDB);
    } catch (e) {
      return false;
    }
  }
  renderLike() {
    this.setBodyElementFunction((actionBodyElement) => {
      actionBodyElement.innerHTML = `
        <button type = 'button' aria-label='Like Button'>
            <i class = 'material-icons'>favorite_border</i>
            <span>Save to favorites!</span>
        </button>
      `;
      const likeButtonElement = actionBodyElement.querySelector('button');
      likeButtonElement.addEventListener('click', async () => {
        await this.dbManager.addRestaurant(this.restaurant);
        await this.render();
      });
    });
  }
  renderLiked() {
    this.setBodyElementFunction((bodyElement) => {
      bodyElement.innerHTML = `
        <button type = 'button' aria-label='Remove Like Button'>
            <i class = 'material-icons'>favorite</i>
            <span>Remove from favorite!</span>
        </button>
    `;
      const likeButtonElement = bodyElement.querySelector('button');
      likeButtonElement.addEventListener('click', async () => {
        await this.dbManager.deleteRestaurantById(this.restaurant.id);
        await this.render();
      });
      likeButtonElement.addEventListener('focus', (event) => {
        this.classList.remove('hide');
      });
    });
  }
  async render() {
    const isRestaurantExist = await this.getIsRestaurantExist();
    if (isRestaurantExist) {
      this.renderLiked();
      super.render();
      return;
    }
    this.renderLike();
    super.render();
  }
}
customElements.define('like_restaurant-element', LikeRestaurantElement);
export default LikeRestaurantElement;
