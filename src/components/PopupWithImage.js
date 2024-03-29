import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__image');
    this._title = this._popupElement.querySelector('.popup__caption');
  }

  /**
  метод открытия попапа с данными
   */
  open(data) {
    super.open();
    this._title.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
  }
}