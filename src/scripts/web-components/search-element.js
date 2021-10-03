import AbstractElement from './abstract-element.js';

class SearchElement extends AbstractElement {
  constructor(placeholder, searchId) {
    super();
    this.searchId = searchId;
    this.placeholder = placeholder;
    this.searchElement = null;
    this.onTypeEventFunction = () => {};
    this.onClickSearchFunction = () => {};
  }
  setOnTypeEventFunction(onTypeEventFunction) {
    this.onTypeEventFunction = onTypeEventFunction;
  }
  setOnClickSearchFunction(onClickSearchFunction) {
    this.onClickSearchFunction = onClickSearchFunction;
  }
  render() {
    this.searchElement = document.createElement('div');
    this.searchElement.id = 'search-input-container';
    this.searchElement.innerHTML = `
      <input type = 'text' placeholder='${this.placeholder}' id = '${this.searchId}'>
      <button type = 'button' id = 'search'><i class = 'material-icons'>search</i></button>
    `;
    const textPlaceholderElement = this.searchElement.querySelector(`#${this.searchId}`);
    textPlaceholderElement.addEventListener('onchange', () => {
      this.onTypeEventFunction(textPlaceholderElement.value);
    });
    const searchButtonElement = this.searchElement.querySelector('button');
    searchButtonElement.addEventListener('click', () => {
      this.onClickSearchFunction(textPlaceholderElement.value);
    });
    this.appendChildren();
  }
  appendChildren() {
    this.appendChild(this.searchElement);
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define('search-element', SearchElement);
export default SearchElement;
