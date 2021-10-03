import AbstractElement from './abstract-element.js';

class GridElement extends AbstractElement {
  constructor(elements, gridClassName) {
    super();
    this.elements = elements;
    this.gridClassName = gridClassName;
    this.gridElement = null;
  }
  renderGridElement() {
    this.gridElement = document.createElement('div');
    this.gridElement.className = `grid ${this.gridClassName}`;
    this.elements.forEach((element) => {
      element.render();
      this.gridElement.appendChild(element);
    });
  }
  appendChildren() {
    this.appendChild(this.gridElement);
  }
  render() {
    this.renderGridElement();
    this.appendChildren();
  }
}
customElements.define('grid-element', GridElement);
export default GridElement;
