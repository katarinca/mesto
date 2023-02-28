import {Card} from './Card.js';
import {initialCards, validationConfig} from './constants.js';
import {FormValidator} from './FormValidator.js';

const popups = document.querySelectorAll('.popup');

//попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_edit-profile')
const popupFormEdit = popupEditProfile.querySelector('.popup__form-edit');
const nameInput = popupFormEdit.querySelector('.popup__form-item_type_name');
const jobInput = popupFormEdit.querySelector('.popup__form-item_type_job');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const popupEditButton = document.querySelector('.profile__edit-button');

//попап создания новых карточек
const popupAddPlace = document.querySelector('.popup_add-place');
const popupFormAdd = popupAddPlace.querySelector('.popup__form-add');
const popupAddButton = document.querySelector('.profile__add-button');
const imageInput = popupFormAdd.querySelector('.popup__form-item_type_image');
const linkInput = popupFormAdd.querySelector('.popup__form-item_type_link');

//попап увеличения картинок
const popupBigImage = document.querySelector('.popup_big-image');
const popupContainerImage = document.querySelector('.popup__container-image');
const popupCaption = popupContainerImage.querySelector('.popup__caption');
const popupImage = popupContainerImage.querySelector('.popup__image');

const cardsContainer = document.querySelector('.elements');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
popupCloseButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup))
});

const profileEditValidation = new FormValidator (validationConfig, popupEditProfile);
const profileAddValidation = new FormValidator (validationConfig, popupAddPlace);

function handleKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function closePopupOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyEsc);
}

//открытие и закрытие попапа редактирования профиля
function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
  profileEditValidation.resetValidation();
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//открытие попапа добавления карточек
function openPopupAddPlace() {
  openPopup(popupAddPlace);
  profileAddValidation.resetValidation();
}

//открытие попапа увеличенного изображения
function openPopupBigImage(name, link) {
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;

  openPopup(popupBigImage)
}

//добавление новых элементов
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  cardsContainer.prepend(createCard ({
    name: imageInput.value, 
    link: linkInput.value}));
    
  closePopup(popupAddPlace);
  evt.target.reset();
};

function createCard (data) {
  const card = new Card (data, '.element-template', openPopupBigImage);
  return card.generateCard(); 
}

initialCards.forEach((element) => {
  cardsContainer.append(createCard(element));
});

popupEditButton.addEventListener('click', openPopupEditProfile);

popupFormEdit.addEventListener('submit', handleEditFormSubmit);

popupAddButton.addEventListener('click', openPopupAddPlace);

popupFormAdd.addEventListener('submit', handleAddFormSubmit);

popups.forEach(popup => {
  popup.addEventListener('mousedown', function (evt){
    closePopupOverlay(evt, popup);
  });
})

profileEditValidation.enableValidation();
profileAddValidation.enableValidation();