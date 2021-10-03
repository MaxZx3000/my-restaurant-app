class _WindowController {
  constructor() {
    if (_WindowController.instance == null) {
      this.lastOffset = 0;
      _WindowController.instance = this;
    }
    return _WindowController.instance;
  }
  getWindowHashParts() {
    const windowHash = window.location.hash.slice(1);
    return windowHash;
  }
  setWindowURL(newLocation) {
    const baseURL = window.location.href.split('#')[0];
    window.location.href = `${baseURL}#/${newLocation}`;
  }
  getWindowURL(newLocation) {
    const baseURL = window.location.href.split('#')[0];
    return `${baseURL}#/${newLocation}`;
  }
  getWindowURLBeforeQuery() {
    const currentURL = window.location.href;
    const querySplittedURL = currentURL.split('?')[0];
    const slashSplittedURL = querySplittedURL.split('#')[1];
    return slashSplittedURL;
  }
  getURLKeyPairParams() {
    const keyPairValue = {};
    const currentURL = window.location.hash;
    const urlSearchParams = currentURL.split('?')[1];
    const splittedURLParams = urlSearchParams.split('&');
    for (let i = 0; i < splittedURLParams.length; i++) {
      const splittedKeyPair = splittedURLParams[i].split('=');
      const key = splittedKeyPair[0];
      const value = splittedKeyPair[1];
      keyPairValue[key] = value;
    }
    return keyPairValue;
  }
  isOverlapElement(element) {
    const rect = element.getBoundingClientRect();
    return window.innerHeight >= rect.top;
  }
  reloadPage() {
    window.location.reload();
  }
}
const WindowController = new _WindowController();
export default WindowController;
