const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//попап редактирования профиля

const popupEditProfile = document.querySelector('.popup_edit-profile')
const popupFormEdit = popupEditProfile.querySelector('.popup__form-edit');
const nameInput = popupFormEdit.querySelector('.popup__form-item_type_name');
const jobInput = popupFormEdit.querySelector('.popup__form-item_type_job');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const openPopupEdit = document.querySelector('.profile__edit-button');
const closePopupEdit = document.querySelector('.popup__close-button_edit-profile');
const submitPopup = document.querySelector('.popup__save-button');

//попап создания новых карточек

const popupAddPlace = document.querySelector('.popup_add-place');
const popupFormAdd = popupAddPlace.querySelector('.popup__form-add');
const openPopupAdd = document.querySelector('.profile__add-button');
const closePopupAdd = document.querySelector('.popup__close-button_add-place');
const imageInput = popupFormAdd.querySelector('.popup__form-item_type_image');
const linkInput = popupFormAdd.querySelector('.popup__form-item_type_link');

//попап увеличения картинок

const popupBigImage = document.querySelector('.popup_big-image');
const popupContainerImage = document.querySelector('.popup__container-image');
const popupCaption = popupContainerImage.querySelector('.popup__caption');
const popupImage = popupContainerImage.querySelector('.popup__image');
const closePopupImage = popupContainerImage.querySelector('.popup__close-button_big-image');

//template
const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

function togglePopup (popup) {
  popup.classList.toggle('popup_opened');
}

//открытие и закрытие попапа редактирования профиля
openPopupEdit.addEventListener('click', function() {
  togglePopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
})

closePopupEdit.addEventListener('click', function() {
  togglePopup(popupEditProfile);
})

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;
  togglePopup(popupEditProfile);
}
popupFormEdit.addEventListener('submit', handleEditFormSubmit);

//открытие попапа добавления новых картинок
openPopupAdd.addEventListener('click', function() {
  togglePopup(popupAddPlace);
})

function addElement(name, link) {
  const elementItem = elementTemplate.cloneNode(true);
  const element = elementItem.querySelector('.element');

  const elementTitle = elementItem.querySelector('.element__title');
  const elementImage = elementItem.querySelector('.element__image');
  const elementBasket = elementItem.querySelector('.element__basket');
  const elementLike = elementItem.querySelector('.element__like');

  elementTitle.textContent = name;
  elementImage.alt = name;
  elementImage.src = link;

   //удаление карточек
   elementBasket.addEventListener('click', function() {
    element.remove()
   });

   //лайки
   elementLike.addEventListener('click', function(evt) {
     evt.target.classList.toggle('element__like_active')
   });

   //увеличение картинки
   elementImage.addEventListener('click', function() {
    togglePopup(popupBigImage);

    popupCaption.textContent = name;
    popupImage.alt = name;
    popupImage.src = link;
   });
   return elementItem;
  }

initialCards.forEach((element) => {
  elementsList.append(addElement(element.name, element.link));
});
  
//закрытие попапа увеличенного изображения
closePopupImage.addEventListener('click', function() {
  togglePopup(popupBigImage);
});

//закрытие попапа добавления новых картинок
closePopupAdd.addEventListener('click', function() {
  togglePopup(popupAddPlace);
});

//добавление новых элементов
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  elementsList.prepend(addElement(imageInput.value, linkInput.value));
  togglePopup(popupAddPlace);
  evt.target.reset();
};

popupFormAdd.addEventListener('submit', handleAddFormSubmit);