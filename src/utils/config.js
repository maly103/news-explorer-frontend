import FormValidator from "./FormValidator";
import NewsCardList from "../components/NewsCardList/NewsCardList";
import Preloader from "../components/Preloader/Preloader";
import Notfounded from "../components/Notfounded/Notfounded";

export const data = {
  inputSelector: ".popup__text_input",
  submitButtonSelector: ".popup__send",
  inactiveButtonClass: "popup__send_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__text-error_active",
};

export function validateForm(data, block) {
  const blockValidator = new FormValidator(data, block);
  blockValidator.hideErrorsValidation();
  blockValidator.enableValidation();
}

export const defineContent = (
  cards,
  isLoading,
  loggedIn,
  handleClickCardMark,
  handleClickRegister
) => {
  if (isLoading) return <Preloader />;
  if (cards === null) return null;
  if (cards.length === 0) return <Notfounded />;

  return (
    <NewsCardList
      cards={cards}
      isLogged={loggedIn}
      handleClickCardMark={handleClickCardMark}
      hadleClickReg={handleClickRegister}
    />
  );
};

const infoData = { data, validateForm, defineContent };

export default infoData;
