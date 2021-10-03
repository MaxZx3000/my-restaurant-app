const assert = require('assert');

class _ScenarioTemplate {
  constructor() {
    if (_ScenarioTemplate.instance == null) {
      _ScenarioTemplate.instance = this;
    }
    return _ScenarioTemplate.instance;
  }
  checkNoDataElement(I, message) {
    I.see('No Data', '#no-data-title');
    I.see(message, '#no-data-message');
  }
  goToHomePage(I) {
    I.click(locate('#home-link'));
  }
  goToFavoritePage(I) {
    I.click(locate('#favorite-link'));
  };
  async getRestaurantNameAt(I, position=1) {
    const expectedRestaurantName = await I.grabTextFrom(
        locate('restaurant_card-element .restaurant-title').at(position));
    I.click(locate('restaurant_card-element').at(position));
    const actualRestaurantName = await I.grabTextFrom('#heading h1');
    assert.strictEqual(expectedRestaurantName, actualRestaurantName);
    return actualRestaurantName;
  }
  saveToFavorites(I) {
    const waitTime = 3;
    I.scrollPageToBottom();
    I.scrollPageToTop();
    I.waitForElement('#like-button-element span', waitTime);
    I.see('Save to favorites!', locate('#like-button-element span'));
    I.forceClick(locate('#like-button-element button'));
    I.scrollPageToBottom();
    I.scrollPageToTop();
    I.waitForElement('#like-button-element span', waitTime);
    I.see('Remove from favorite!', locate('#like-button-element span'));
  }
  removeFromFavorites(I) {
    const waitTime = 3;
    I.scrollPageToBottom();
    I.scrollPageToTop();
    I.waitForElement('#like-button-element span', waitTime);
    I.see('Remove from favorite!', locate('#like-button-element span'));
    I.forceClick(locate('#like-button-element button'));
    I.scrollPageToBottom();
    I.scrollPageToTop();
    I.waitForElement('#like-button-element span', waitTime);
    I.see('Save to favorites!', locate('#like-button-element span'));
  }
  performSearch(I, keyword) {
    I.seeElement('search-element #search-restaurant');
    I.seeElement('search-element #search');
    I.scrollTo('search-element #search');
    I.fillField('search-element #search-restaurant', keyword);
    I.scrollTo('search-element #search');
    I.click(locate('search-element #search'));
  }
  performReview(I, reviewerName, review) {
    I.scrollTo('#form-outer-container #review-name');
    I.fillField('#review-name', reviewerName);
    I.scrollTo('#form-outer-container #review');
    I.fillField('#review', review);
    I.scrollTo('#form-outer-container #submit-review');
    I.click(locate('#form-outer-container #submit-review'));
  }
  checkForErrorMessage(I, errorMessage) {
    I.scrollTo('message-element .message-text');
    I.see(errorMessage, 'message-element .message-text');
  }
  async loopRestaurantElements(I, compare, limit=0) {
    I.scrollTo('restaurant_card-element');
    const numberOfRestaurantElements = await I.grabNumberOfVisibleElements('restaurant_card-element');

    for (let index = 0; index < numberOfRestaurantElements-limit; index++) {
      await compare(I, index+1);
    }
  }
  async checkCustomerReviewElements({I, expectedReviewerName, expectedReview}) {
    I.scrollTo('customer_review_card-element');
    const reviewerNames = await I.grabTextFromAll('.customer-reviewer');
    const reviews = await I.grabTextFromAll('.customer-review');
    const matchedReviewerNames = reviewerNames.filter((reviewerName) => {
      return expectedReviewerName === reviewerName;
    });
    const matchedReviews = reviews.filter((review) => {
      return expectedReview === review;
    });
    assert.strictEqual(matchedReviewerNames.length, 1);
    assert.strictEqual(matchedReviews.length, 1);
  }
}
const ScenarioTemplate = new _ScenarioTemplate();
Object.freeze(ScenarioTemplate);
module.exports = {ScenarioTemplate};
