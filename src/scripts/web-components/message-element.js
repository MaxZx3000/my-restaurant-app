import AbstractElement from './abstract-element';

class MessageElement extends AbstractElement {
  constructor({iconName, message, color}) {
    super();
    this.iconName = iconName;
    this.message = message;
    this.color = color;
    this.messageElement = document.createElement('div');
  }
  render() {
    this.messageElement.className = `grid ${this.color}`;
    this.messageElement.innerHTML = `
      <div class = 'message-column'>
          <i class = 'material-icons'>${this.iconName}</i>
      </div>
      <div class = 'message-column'>
          <p tabindex='0' class = 'message-text'>${this.message}</p>
      </div>
    `;
    this.appendChildren();
  }
  appendChildren() {
    this.appendChild(this.messageElement);
  }
}
customElements.define('message-element', MessageElement);
export default MessageElement;
