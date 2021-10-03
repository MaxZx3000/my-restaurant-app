class _KeyboardValidation {
  constructor() {
    if (_KeyboardValidation.instance == null) {
      _KeyboardValidation.instance = this;
    }
    return _KeyboardValidation.instance;
  }
  isTab(event) {
    const TAB_KEY = 9;
    return event.keyCode == TAB_KEY;
  }
  isEnter(event) {
    const ENTER_KEY = 13;
    return event.keyCode == ENTER_KEY;
  }
}

const KeyboardValidation = new _KeyboardValidation();
Object.freeze(KeyboardValidation);
export default KeyboardValidation;
