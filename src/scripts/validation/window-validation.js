class _WindowValidation {
  constructor() {
    if (_WindowValidation.instance == null) {
      _WindowValidation.instance = this;
    }
    return _WindowValidation.instance;
  }
  isHomeURL(url) {
    return url === '' || url === '/' || url === '/home' || url === undefined;
  }
  isDetailURL(url) {
    return url === '/detail';
  }
  isFavoriteURL(url) {
    return url === '/favorite';
  }
  isWidescreen() {
    const MIN_SCREEN_SIZE = 800;
    return window.innerWidth >= MIN_SCREEN_SIZE;
  }
}
const WindowValidation = new _WindowValidation();
Object.freeze(WindowValidation);
export default WindowValidation;
