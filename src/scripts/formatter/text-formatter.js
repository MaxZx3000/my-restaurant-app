class _TextFormatter {
  constructor() {
    if (_TextFormatter.instance == null) {
      _TextFormatter.instance = this;
    }
    return _TextFormatter.instance;
  }
  getEllipsisText(text, maxLength) {
    let formattedText = text;
    if (formattedText.length > maxLength) {
      formattedText = formattedText.substr(0, maxLength);
      formattedText += '...';
    }
    return formattedText;
  }
}
const TextFormatter = new _TextFormatter();
Object.freeze(TextFormatter);
export default TextFormatter;
