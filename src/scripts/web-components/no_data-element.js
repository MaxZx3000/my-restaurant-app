import AbstractElement from './abstract-element';

class NoDataElement extends AbstractElement {
  constructor(title, message) {
    super();
    this.noDataElement = document.createElement('div');
    this.title = title;
    this.message = message;
  }
  render() {
    this.noDataElement.innerHTML = `
      <i class = 'material-icons embossed-icon' tabindex = '0'>sentiment_very_dissatisfied</i>
      <h3 tabindex = '0' id = 'no-data-title'>${this.title}</h3>
      <p tabindex = '0' id = 'no-data-message'>${this.message}</p>
    `;
    this.appendChildren();
  }
  appendChildren() {
    this.appendChild(this.noDataElement);
  }
}
customElements.define('no_data-element', NoDataElement);
export default NoDataElement;
