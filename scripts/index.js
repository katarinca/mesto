const popups = document.querySelectorAll('.popup');
//попап редактирования профиля

const popupEditProfile = document.querySelector('.popup_edit-profile')
const popupFormEdit = popupEditProfile.querySelector('.popup__form-edit');
const nameInput = popupFormEdit.querySelector('.popup__form-item_type_name');
const jobInput = popupFormEdit.querySelector('.popup__form-item_type_job');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseEditButton = document.querySelector('.popup__close-button_edit-profile');
const popupSaveButton = document.querySelector('.popup__save-button');

//попап создания новых карточек

const popupAddPlace = document.querySelector('.popup_add-place');
const popupFormAdd = popupAddPlace.querySelector('.popup__form-add');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseAddButton = document.querySelector('.popup__close-button_add-place');
const imageInput = popupFormAdd.querySelector('.popup__form-item_type_image');
const linkInput = popupFormAdd.querySelector('.popup__form-item_type_link');

//попап увеличения картинок

const popupBigImage = document.querySelector('.popup_big-image');
const popupContainerImage = document.querySelector('.popup__container-image');
const popupCaption = popupContainerImage.querySelector('.popup__caption');
const popupImage = popupContainerImage.querySelector('.popup__image');
const popupCloseButtonImage = popupContainerImage.querySelector('.popup__close-button_big-image');

//template
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;

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
}

function closePopupEditProfile() {
  closePopup(popupEditProfile);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
//открытие и закрытие попапа добавления карточек

function openPopupAddPlace() {
  openPopup(popupAddPlace);
}

function closePopupAddPlace() {
  closePopup(popupAddPlace);
}

//добавление новых элементов

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(imageInput.value, linkInput.value));
  closePopup(popupAddPlace);
  evt.target.reset();
};

function createCard(name,link) {
  const cards = cardTemplate.cloneNode(true);
  const card = cards.querySelector('.element');

  const cardTitle = cards.querySelector('.element__title');
  const cardImage = cards.querySelector('.element__image');
  const buttonBasket = cards.querySelector('.element__basket');
  const buttonLike = cards.querySelector('.element__like');

  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

   //удаление карточек
   buttonBasket.addEventListener('click', function() {
    card.remove()
   });

   //лайки
    buttonLike.addEventListener('click', function() {
    buttonLike.classList.toggle('element__like_active');
   });

   //увеличение картинки
   cardImage.addEventListener('click', function() {
    openPopup(popupBigImage);

    popupCaption.textContent = name;
    popupImage.alt = name;
    popupImage.src = link;
   });
   return cards;
  }

initialCards.forEach((element) => {
  cardsContainer.append(createCard(element.name, element.link));
});

//закрытие попапа увеличенного изображения
function closeBigImage() {
  closePopup(popupBigImage);
}

popupEditButton.addEventListener('click', openPopupEditProfile);
popupCloseEditButton.addEventListener('click', closePopupEditProfile);
popupFormEdit.addEventListener('submit', handleEditFormSubmit);

popupAddButton.addEventListener('click', openPopupAddPlace);
popupCloseAddButton.addEventListener('click', closePopupAddPlace);
popupFormAdd.addEventListener('submit', handleAddFormSubmit);

popupCloseButtonImage.addEventListener('click', closeBigImage);
popups.forEach(popup => {
  popup.addEventListener('click', function (evt){
    closePopupOverlay(evt, popup);
  });
})