const popupWindow = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-item_name');
let jobInput = document.querySelector('.popup__form-item_job');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close-button');
const submitPopup = document.querySelector('.popup__save-button');

function openPopupWindow () {
  popupWindow.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
}

function closePopupWindow () {
  popupWindow.classList.remove('popup_opened');
}

function handlerSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;
  closePopupWindow();
}

openPopup.addEventListener('click', openPopupWindow);
closePopup.addEventListener('click', closePopupWindow);
popupForm.addEventListener('submit', handlerSubmit);