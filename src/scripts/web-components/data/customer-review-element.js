import CardElement from '../card/card.js';

class CustomerReviewElement extends CardElement {
  constructor(customer) {
    super();
    this.customer = customer;
    this.setContentFunction((dataElement) => {
      const name = this.customer.name;
      const date = this.customer.date;
      const review = this.customer.review;
      dataElement.innerHTML = `
        <h2 tabindex='0' class = 'customer-reviewer'>${name}</h2>
        <p>
            <i aria-label='rating'
            tabindex='0'
            class = 'material-icons embossed-icon'>
                today
            </i>
            <span tabindex='0' class = 'right-subtitle'>${date}</span>
        </p>
        <p tabindex='0' class = 'customer-review'>${review}</p>
      `;
    });
  }
}
customElements.define('customer_review_card-element', CustomerReviewElement);
export default CustomerReviewElement;
