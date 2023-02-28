export class FormValidator {
  constructor(data, popupForm ) {
  this._formSelector = data.formSelector;
  this._inputSelector = data.inputSelector;
  this._submitButtonSelector = data.submitButtonSelector;
  this._inactiveButtonClass = data.inactiveButtonClass;
  this._inputErrorClass = data.inputErrorClass;
  this._popupForm = popupForm;
  this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
  this._buttonElement = this._popupForm.querySelector(this._submitButtonSelector);
  }

  _getErrorElement(inputElement) {
    return this._errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
  }

  _showInputError(inputElement) {
    inputElement.classList.add(`${this._inputErrorClass}`);
    this._getErrorElement(inputElement).textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(`${this._inputErrorClass}`);
    this._getErrorElement(inputElement).textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _isInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._isInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }
}