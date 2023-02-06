const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__form-item_type_error',
};

function disableSubmit(evt) {
  evt.preventDefault();
}

function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
      toggleButtonState(form, config);
    });
    addInputListeners(form, config);
    toggleButtonState(form, config);
  });
};

function handleFormInput(evt, config) {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`.${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

function toggleButtonState(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle('popup__save-button_disabled', !isFormValid);
}

function addInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config);
    });
  });
}

enableValidation(formValidationConfig);