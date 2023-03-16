import { Card } from '../components/Card.js';
import { initialCards, 
  validationConfig,
  nameInput,
  jobInput,
  popupEditProfile,
  popupAddPlace
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';

const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');



const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__about-me'});

const popupImage = new PopupWithImage('.popup_big-image');

function createCard (data) {
  const card = new Card (data, 
    '.element-template', 
    () => {
      popupImage.open(data);
    });
  return card.generateCard(); 
}

const cardSection = new Section({
  renderer: (items) => {
    cardSection.addItem(createCard(items))
      },
    },
    '.elements'
  );

const popupProfile = new PopupWithForm(
  '.popup_edit-profile',
  ({name, job}) => {
    userInfo.setUserInfo({name, job})
  }
)

const popupAddCard = new PopupWithForm(
  '.popup_add-place',
  ({image, image_link}) => {
    cardSection.addItem(createCard({
      name: image,
      link: image_link,
      alt: image
    }));
  }
)

const profileEditValidation = new FormValidator (validationConfig, popupEditProfile);
const profileAddValidation = new FormValidator (validationConfig, popupAddPlace);

popupEditButton.addEventListener('click', () => {
  const userInfoValues = userInfo.getUserInfo();
  nameInput.value = userInfoValues.name;
  jobInput.value = userInfoValues.job;
  profileEditValidation.resetValidation();
  popupProfile.open();
})

popupAddButton.addEventListener('click', () => {
  profileAddValidation.resetValidation();
  popupAddCard.open();
})

cardSection.rendererItems(initialCards);

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

profileEditValidation.enableValidation();
profileAddValidation.enableValidation();