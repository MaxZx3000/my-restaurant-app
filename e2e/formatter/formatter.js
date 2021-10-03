class _Formatter {
  constructor() {
    if (_Formatter.instance == null) {
      _Formatter.instance = this;
    }
    return _Formatter.instance;
  }
  getRandomText({min, max, randomLetterLength}) {
    let randomText = '';
    for (let i = 0; i < randomLetterLength; i++) {
      const randomNumber = Math.floor(min + (Math.random() * max));
      randomText += randomNumber.toString();
    }
    return randomText;
  }
}
const Formatter = new _Formatter();
Object.freeze(Formatter);
module.exports = {
  Formatter,
};
