import NavigationController from '../controller/navigation-controller';
import AbstractElement from '../web-components/abstract-element';

class NotFoundPage extends AbstractElement {
  constructor() {
    super();
    this.messageElement = document.createElement('article');
  }
  render() {
    this.messageElement.innerHTML = `
      <div id = 'image-container'>
        <span tabindex = '0' class='material-icons tab-trigger' id = 'image-404'>restaurant</span>
      </div>
      <h1 tabindex = '0'>404 Not Found</h1>
      <h2 tabindex = '0'>We know that you're hungry. However, you're in the wrong direction</h2>
      <p tabindex = '0'>Please be patient and select your restaurant either from home or favorite page!</p>    
    `;
    this.appendChildren();
  }
  appendChildren() {
    this.appendChild(this.messageElement);
  }
  disconnectedCallback() {
    this.innerHTML = '';
    this.messageElement.innerHTML = '';
  }
  connectedCallback() {
    this.render();
    NavigationController.setNavigationElements();
  }
}
customElements.define('invalid_page-element', NotFoundPage);
export default NotFoundPage;
