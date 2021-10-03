import AbstractElement from './abstract-element.js';

class LoadingElement extends AbstractElement {
  constructor(message) {
    super();
    this.loadingElement = null;
    this.message = message;
  }
  renderLoadingElement() {
    this.loadingElement = document.createElement('div');
    this.loadingElement.innerHTML = `
      <div class='lds-hourglass'></div>
      <p id = 'loading-message'>${this.message}</p>
    `;
  }
  render() {
    this.renderLoadingElement();
    this.appendChildren();
  }
  appendChildren() {
    this.appendChild(this.loadingElement);
  }
  connectedCallback() {
    this.render();
  }
}

customElements.define('loading-element', LoadingElement);
export default LoadingElement;
