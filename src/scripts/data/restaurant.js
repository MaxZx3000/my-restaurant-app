import TextFormatter from '../formatter/text-formatter.js';
import JSONInterface from './json-interface.js';

class Restaurant extends JSONInterface {
  setFromJSON(json) {
    this.id = json.id;
    this.pictureId = json.pictureId;
    this.name = json.name;
    this.description = json.description;
    this.pictureId = json.pictureId;
    this.city = json.city;
    this.rating = json.rating;
    this.address = json.address;
    this.categories = json.categories;
    this.menus = json.menus;
    this.customerReviews = json.customerReviews;
  }
  getDescriptionEllipsis() {
    return TextFormatter.getEllipsisText(this.description, 400);
  }
}
export default Restaurant;
