import CustomerReviewElement from '../../web-components/data/customer-review-element';
import GridElement from '../../web-components/grid-element';

class _CustomerReviewPresenter {
  constructor() {
    if (_CustomerReviewPresenter.instance == null) {
      _CustomerReviewPresenter.instance = this;
    }
    return _CustomerReviewPresenter.instance;
  }
  getCustomerReviewElements(reviews) {
    const reviewElements = [];
    reviews.forEach((review) => {
      const customerReviewElement = new CustomerReviewElement(
          review,
      );
      customerReviewElement.render();
      reviewElements.push(customerReviewElement);
    });
    const gridElement = new GridElement(
        reviewElements,
        'grid-customer-review',
    );
    gridElement.render();
    return gridElement;
  }
}
const CustomerReviewPresenter = new _CustomerReviewPresenter();
Object.freeze(CustomerReviewPresenter);
export default CustomerReviewPresenter;
