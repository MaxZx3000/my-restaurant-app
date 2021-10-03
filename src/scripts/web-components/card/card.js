import AbstractElement from '../abstract-element.js';

class CardElement extends AbstractElement {
  constructor() {
    super();
    this._cardElement = document.createElement('div');
    this.setContentElement = (_cardElement) => {};
  }
  setContentFunction(contentFunction) {
    this.setContentElement = contentFunction;
  }
  renderCardElement() {
    this._cardElement.className = 'card';
    this.setContentElement(this._cardElement);
  }
  render() {
    this.renderCardElement();
    this.appendChildren();
  }
  appendChildren() {
    this.appendChild(this._cardElement);
  }
}
customElements.define('card-element', CardElement);
export default CardElement;
