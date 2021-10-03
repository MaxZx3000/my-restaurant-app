class _DataValidation {
  constructor() {
    if (_DataValidation.instance == null) {
      _DataValidation.instance = this;
    }
    return _DataValidation.instance;
  }
  validateCustomerReview(name, review) {
    if (this.isStringEmpty(name)) {
      return {status: false, message: 'Name is still empty!', id: 'review-name'};
    }
    if (this.isStringEmpty(review)) {
      return {status: false, message: 'Review is still empty!', id: 'review'};
    }
    return {status: true};
  }
  isObjectInitialized(currentObject) {
    return currentObject !== null &&
    currentObject !== undefined;
  }
  isStringEmpty(currentString) {
    return currentString.trim() === '';
  }
  isCollectionEmpty(currentObject) {
    return currentObject.length === 0;
  }
}

const DataValidation = new _DataValidation();
Object.freeze(DataValidation);
export default DataValidation;
