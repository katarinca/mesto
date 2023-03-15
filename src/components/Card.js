export class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  /**получаем разметку карточек*/
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  /**добавление данных в карточку*/
  generateCard() {
    this._element = this._getTemplate();
    
    this._image = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
    this._basket = this._element.querySelector('.element__basket');
    this._like = this._element.querySelector('.element__like');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    
    this._setEventListeners();
    
    return this._element;
  }

  _setEventListeners() {
    this._basket.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._like.addEventListener('click', () => {
      this._handleLikeCard();
    })

    this._image.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link)
    })
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._like.classList.toggle('element__like_active');
  }

}