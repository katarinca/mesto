import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector,handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputList = Array.from(
      this._popupForm.querySelectorAll('.popup__form-item')
    );
    this._valueInputs = {};
    inputList.forEach((input) => {
      this._valueInputs[input.name] = input.value;
    });
    return this._valueInputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}