import CustomerReviewUpload from '../../data/customer-review-upload';
import DataValidation from '../../validation/data-validation';
import MessageElement from '../../web-components/message-element';

class _CustomerReviewFormView {
  constructor() {
    if (_CustomerReviewFormView.instance == null) {
      _CustomerReviewFormView.instance = this;
    }
    return _CustomerReviewFormView.instance;
  }
  _getFormElement() {
    return `
        <form id = 'form-container'>
            <input type = 'text' id = 'review-name' placeholder = 'Name'>
            <textarea id = 'review' placeholder = 'Review'></textarea>
            <div id = 'message-container'></div>
            <button type = 'button' id = 'submit-review' class = 'stylized-button'>Submit Review</button>
        </form>
    `;
  }
  _setFormInputElementListener({nameInputElement, reviewInputElement, messageContainerElement}) {
    nameInputElement.addEventListener('input', () => {
      messageContainerElement.innerHTML = '';
    });
    reviewInputElement.addEventListener('input', () => {
      messageContainerElement.innerHTML = '';
    });
  }
  _setSubmitButtonListener({restaurantID,
    restaurantDataFetcher,
    formContainer,
    onSuccess,
    onFailed}) {
    const messageContainerElement = formContainer.querySelector('#message-container');
    const nameInputElement = formContainer.querySelector('#review-name');
    const reviewInputElement = formContainer.querySelector('#review');
    const submitButtonElement = formContainer.querySelector('#submit-review');
    submitButtonElement.addEventListener('click', async () => {
      messageContainerElement.innerHTML = '';
      const name = nameInputElement.value;
      const review = reviewInputElement.value;
      const customerReviewUploadData = new CustomerReviewUpload(
          restaurantID,
          name,
          review,
      );
      const {status: isSuccess, message: statusMessage, id: elementId} =
        DataValidation.validateCustomerReview(name, review);
      if (isSuccess) {
        submitButtonElement.disabled = true;
        try {
          const apiResponse = await restaurantDataFetcher.addNewReview(
              customerReviewUploadData,
          );
          const message = apiResponse.message;
          const statusElement = this._getStatusElement({
            message: message,
            color: 'success',
            icon: 'check',
          });
          messageContainerElement.appendChild(statusElement);
          onSuccess(statusElement, message);
        } catch (exception) {
          console.trace(exception);
          const errorMessage = `
            Unable to send the review.<br>
            Please recheck your internet connection and try again!
          `;
          const statusElement = this._getStatusElement({
            message: errorMessage,
            containerElement: messageContainerElement,
            color: 'error',
            icon: 'error',
          });
          messageContainerElement.appendChild(statusElement);
          submitButtonElement.disabled = false;
          onFailed(statusElement, errorMessage);
        }
      } else {
        const statusElement = this._getStatusElement({
          message: statusMessage,
          containerElement: messageContainerElement,
          color: 'error',
          icon: 'error',
        });
        messageContainerElement.appendChild(statusElement);
        submitButtonElement.disabled = false;
        this._focusElement(formContainer, elementId);
        onFailed(statusElement, statusMessage);
      }
    });
  }
  _focusElement(formContainer, elementId) {
    formContainer.querySelector(`#${elementId}`).focus();
  }
  _getStatusElement({message, color, icon}) {
    const statusElement = new MessageElement({
      iconName: icon,
      color: color,
      message: message,
    });
    statusElement.render();
    return statusElement;
  }
  getRenderedResult({restaurantID, restaurantDataFetcher, onSuccess, onFailed}) {
    const formOuterContainer = document.createElement('div');
    formOuterContainer.id = 'form-outer-container';
    formOuterContainer.innerHTML = this._getFormElement();
    const nameInputElement = formOuterContainer.querySelector('#review-name');
    const reviewInputElement = formOuterContainer.querySelector('#review');
    const messageContainerElement = formOuterContainer.querySelector('#message-container');
    this._setFormInputElementListener({
      nameInputElement: nameInputElement,
      reviewInputElement: reviewInputElement,
      messageContainerElement: messageContainerElement,
    });
    this._setSubmitButtonListener({
      formContainer: formOuterContainer,
      restaurantDataFetcher: restaurantDataFetcher,
      restaurantID: restaurantID,
      onSuccess: onSuccess,
      onFailed: onFailed,
    });
    return formOuterContainer;
  }
}
const CustomerReviewFormView = new _CustomerReviewFormView();
Object.freeze(CustomerReviewFormView);
export default CustomerReviewFormView;
