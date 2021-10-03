class _BodyController {
  constructor() {
    if (_BodyController.instance == null) {
      this.bodyElement = null;
      _BodyController.instance = this;
    }
    return _BodyController.instance;
  }
  setBodyElement(bodyElement) {
    this.bodyElement = bodyElement;
  }
  async changeBodyContentByNewNode(newNode) {
    if (this.bodyElement.hasChildNodes()) {
      this.bodyElement.removeChild(this.bodyElement.firstChild);
    }
    this.bodyElement.appendChild(newNode);
  }
}
const BodyController = new _BodyController();
export default BodyController;
