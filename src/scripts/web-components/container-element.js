import AbstractElement from './abstract-element.js';

class ContainerElement extends AbstractElement {
  constructor(customElementTagName, containerClassName) {
    super();
    this.elementFunction = (element) => {};
    this.customElementTagName = customElementTagName;
    this.containerClassName = containerClassName;
    this.customElement = null;
  }
  setElementFunction(elementFunction) {
    this.elementFunction = elementFunction;
  }
  appendChildren() {
    this.appendChild(this.customElement);
  }
  render() {
    this.customElement = document.createElement(this.customElementTagName);
    this.customElement.className = this.containerClassName;
    this.elementFunction(this.customElement);
    this.appendChildren();
  }
}
customElements.define('container-element', ContainerElement);
export default ContainerElement;
