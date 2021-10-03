import AbstractElement from '../abstract-element.js';

class NavigationDrawerElement extends AbstractElement {
  constructor() {
    super();
    this.navigationDrawerElement = null;
  }
  render() {
    this.navigationDrawerElement = document.createElement('nav');
    const ulElement = document.createElement('ul');
    ulElement.innerHTML = `
      <li id = 'list-item-logo-container'>
        <div id = 'logo-drawer'>
          <img loading = 'lazy' src = './images/icons/Logo_192x192.png' class = 'logo-image' alt = 'app-logo'>
          <p class = 'logo-name'>Eateria</p>
        </div>
      </li>
      <li><a tabindex='0' id = 'home-link' href='#/home' class = 'navigation-link'><i class = 'material-icons' aria-label='home'>home</i>Home</a></li>
      <li><a tabindex='0' id = 'favorite-link' href='#/favorite' class = 'navigation-link'><i class = 'material-icons' aria-label='favorite'>favorite</i>Favorite</a></li>
      <li><a tabindex='0' id = 'about-me-link' href='https://biodata-pwa-remake.web.app/' class = 'navigation-link'><i class = 'material-icons' aria-label='about'>face</i>About Us</a></li>
      <li><a tabindex='0' id = 'close-button'><i class = 'material-icons' aria-label='close'>close</i>Close</a></li>
    `;
    this.navigationDrawerElement.appendChild(ulElement);
    this.appendChildren();
  }
  appendChildren() {
    this.appendChild(this.navigationDrawerElement);
  }
}
customElements.define('navigation_drawer-element', NavigationDrawerElement);
export default NavigationDrawerElement;
