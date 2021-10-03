import AbstractElement from '../abstract-element.js';
import GridElement from '../grid-element.js';
import ContainerElement from '../container-element.js';

class FooterElement extends AbstractElement {
  constructor() {
    super();
    this.footerElement = null;
  }
  render() {
    this.footerElement = document.createElement('footer');
    const containerElementLeft = new ContainerElement('div', 'left-footer-container');
    containerElementLeft.setElementFunction((element) => {
      element.innerHTML = `
        <img loading = 'lazy' tabindex='0' src = './images/icons/Logo_192x192.png' alt='app-logo' class = 'logo-image'>
        <p tabindex='0' class = 'logo-name'>Eateria knows your best!</p>
      `;
    });
    const containerRightElement = new ContainerElement('div', 'right-footer-container');
    containerRightElement.setElementFunction((element) => {
      element.innerHTML = `
                <p tabindex='0'>Copyright © 2021 - Cyberia Hunger Apps Corporation</p>
                <p tabindex='0'>Made by Anthony Kevin Oktavius</p>
        `;
    });
    const gridElement = new GridElement([containerElementLeft, containerRightElement], 'grid-footer');
    gridElement.render();
    this.footerElement.appendChild(gridElement);
  }
  appendChildren() {
    this.appendChild(this.footerElement);
  }
  connectedCallback() {
    this.render();
    this.appendChildren();
  }
}
customElements.define('footer-element', FooterElement);
