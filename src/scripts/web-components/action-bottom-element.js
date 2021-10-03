import WindowController from '../controller/window-controller';
import AbstractElement from './abstract-element';

class ActionBottomElement extends AbstractElement {
  constructor(idName, hideElement) {
    super();
    this.bodyElement = document.createElement('div');
    this.bodyElement.id = idName;
    this.hideElement = hideElement;
    this.setBodyElement = (bodyElement) => {};
    this.setScrollFunction();
  }
  setScrollFunction() {
    this.scrollFunction = () => {
      if (WindowController.isOverlapElement(this.hideElement)) {
        this.classList.add('hide');
      } else {
        this.classList.remove('hide');
      }
    };
  }
  setBodyElementFunction(setBodyElement) {
    this.setBodyElement = setBodyElement;
  }
  render() {
    this.setBodyElement(this.bodyElement);
    this.setScrollEvents();
    this.appendChildren();
  }
  setScrollEvents() {
    document.addEventListener('scroll', this.scrollFunction);
  }
  appendChildren() {
    this.appendChild(this.bodyElement);
  }
  disconnectedCallback() {
    document.removeEventListener('scroll', this.scrollFunction);
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define('action_bottom-element', ActionBottomElement);
export default ActionBottomElement;
