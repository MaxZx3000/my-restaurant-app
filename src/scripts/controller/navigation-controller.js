import KeyboardValidation from '../validation/keyboard-validation.js';
import NavigationValidation from '../validation/navigation-validation.js';
import WindowValidation from '../validation/window-validation.js';

class _NavigationController {
  constructor() {
    if (_NavigationController.instance == null) {
      this.isToggleInit = false;
      this.ENABLE_TAB_INDEX = 0;
      this.DISABLE_TAB_INDEX = -1;
      _NavigationController.instance = this;
    }
    return _NavigationController.instance;
  }
  setNavigationElements() {
    if (this.isToggleInit === false) {
      const headerElement = document.querySelector('header');
      this.mainElement = document.querySelector('main');
      this.hamburgerElement = headerElement.querySelector('#link-hamburger');
      this.navigationDrawerElement = headerElement.querySelector('navigation_drawer-element nav');
      this.closeElement = this.navigationDrawerElement.querySelector('#close-button');
      const linkDrawerElements = this.navigationDrawerElement.querySelectorAll('a');

      const additionalIndexedElements = [...linkDrawerElements];
      this.additionalIndexedElements = additionalIndexedElements;
      this.initToggle();
      this.initForceClose();
      this.initIndexOnScreenSize();
      this.isToggleInit = true;
    }
    const additionalTriggerIndexElements = document.querySelectorAll('.tab-trigger');
    this.additionalTriggerIndexElements = additionalTriggerIndexElements;
    this.initAdditionalTrigger();
  }
  initToggle() {
    this.hamburgerElement.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleNavigation();
    });
    this.hamburgerElement.addEventListener('keyup', (event) => {
      if (KeyboardValidation.isEnter(event)) {
        event.preventDefault();
        this.toggleNavigation();
      }
    });
    this.closeElement.addEventListener('keyup', (event) => {
      if (KeyboardValidation.isEnter(event)) {
        event.preventDefault();
        this.toggleNavigation();
      }
    });
  }
  initForceClose() {
    this.closeElement.addEventListener('click', (event) => {
      event.stopPropagation();
      this.forceCloseNavigation();
    });
    this.mainElement.addEventListener('click', (event) => {
      event.stopPropagation();
      if (WindowValidation.isWidescreen() === false) {
        this.forceCloseNavigation();
      }
    });
  }
  initAdditionalTrigger() {
    const triggerKeyUp = (event) => {
      event.preventDefault();
      if (KeyboardValidation.isTab(event) &&
                WindowValidation.isWidescreen() === false) {
        this.forceCloseNavigation();
      } else {
        this.setContentDrawerContentTabIndex(this.ENABLE_TAB_INDEX);
      }
    };
    this.additionalTriggerIndexElements.forEach((element) => {
      element.removeEventListener('keyup', (event) => triggerKeyUp(event));
      element.addEventListener('keyup', (event) => triggerKeyUp(event));
    });
  }
  initIndexOnScreenSize() {
    window.addEventListener('resize', () => {
      if (WindowValidation.isWidescreen()) {
        this.setContentDrawerContentTabIndex(this.ENABLE_TAB_INDEX);
        return;
      } else if (NavigationValidation.isDrawerClosed(this.navigationDrawerElement)) {
        this.setContentDrawerContentTabIndex(this.DISABLE_TAB_INDEX);
        return;
      }
    });
  }
  toggleNavigation() {
    const isOpen = this.navigationDrawerElement.classList.toggle('open');
    if (isOpen || WindowValidation.isWidescreen()) {
      this.setContentDrawerContentTabIndex(this.ENABLE_TAB_INDEX);
      return;
    }
    this.setContentDrawerContentTabIndex(this.DISABLE_TAB_INDEX);
  }
  forceCloseNavigation() {
    this.navigationDrawerElement.classList.remove('open');
    this.setContentDrawerContentTabIndex(this.DISABLE_TAB_INDEX);
  }
  setContentDrawerContentTabIndex(index) {
    this.additionalIndexedElements.forEach((element) => {
      element.tabIndex = index;
    });
  }
}

const NavigationController = new _NavigationController();
export default NavigationController;
