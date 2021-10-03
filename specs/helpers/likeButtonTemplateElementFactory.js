import LikeRestaurantElement from '../../src/scripts/web-components/data/like-restaurant-element';
class _LikeButtonTemplateElementFactory {
  constructor() {
    if (_LikeButtonTemplateElementFactory.instance == null) {
      _LikeButtonTemplateElementFactory.instance = this;
    }
    return _LikeButtonTemplateElementFactory.instance;
  }
  async getLikeButtonTemplateElement(saveSource, restaurantId) {
    const likeButtonElement = new LikeRestaurantElement({
      idName: 'like-button-element',
      restaurant: restaurantId,
      saveSource: saveSource,
    });
    await likeButtonElement.render();
    return likeButtonElement;
  }
  getLikeContainerTemplateElement() {
    const likeRestaurantContainerElement = document.createElement('div');
    likeRestaurantContainerElement.id = 'like-button-element';
    return likeRestaurantContainerElement;
  }
}
const LikeButtonTemplateElementFactory = new _LikeButtonTemplateElementFactory();
export default LikeButtonTemplateElementFactory;
