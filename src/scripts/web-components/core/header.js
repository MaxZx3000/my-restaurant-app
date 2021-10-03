import AbstractElement from '../abstract-element.js';
import NavigationDrawerElement from './navigation-element.js';

class HeaderElement extends AbstractElement {
  constructor() {
    super();
    this.headerElement = null;
  }
  appendChildren() {
    this.appendChild(this.headerElement);
  }
  render() {
    this.headerElement = document.createElement('header');
    this.headerElement.innerHTML = `
      <div id = 'logo-container'>
        <img loading = 'lazy' tabindex='0' src='./images/icons/Logo_192x192.png' class = 'logo-image-header' alt = 'app-logo'>
        <p tabindex='0' class = 'logo-name tab-trigger'>Eateria</p>
      </div>
      <a id = 'link-hamburger' tabindex='0'><i class = 'material-icons' aria-label='menu'>menu</i></a>
    `;
    const navigationDrawerElement = new NavigationDrawerElement();
    navigationDrawerElement.render();
    this.headerElement.appendChild(navigationDrawerElement);
  }
  connectedCallback() {
    this.render();
    this.appendChildren();
  }
}
customElements.define('header-element', HeaderElement);
