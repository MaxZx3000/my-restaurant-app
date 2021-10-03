class _NavigationValidation {
  constructor() {
    if (_NavigationValidation.instance == null) {
      _NavigationValidation.instance = this;
    }
    return _NavigationValidation.instance;
  }
  isDrawerClosed(navigationDrawerElement) {
    const currentToggleStatus = navigationDrawerElement.classList[0];
    return (
      currentToggleStatus === 'closed' ||
      currentToggleStatus === undefined ||
      currentToggleStatus === ''
    );
  }
}
const NavigationValidation = new _NavigationValidation();
Object.freeze(NavigationValidation);
export default NavigationValidation;
