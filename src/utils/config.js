import FormValidator from "./FormValidator";
import imgPath1 from "../images/cards/image_08.jpg";
import imgPath2 from "../images/cards/image_04.jpg";
import imgPath3 from "../images/cards/image_07.jpg";
import imgPath4 from "../images/cards/image_01.jpg";
import imgPath5 from "../images/cards/image_05.jpg";
import imgPath6 from "../images/cards/image_06.jpg";

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

export const itemsCard = [
  {
    id: "1",
    keyword: "природа",
    srcImg: imgPath1,
    dateNews: "2 августа, 2019",
    titleNews: "Национальное достояние – парки",
    textNews:
      "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
    sourceNews: "Лента.ру",
  },
  {
    id: "2",
    keyword: "природа",
    srcImg: imgPath2,
    dateNews: "2 августа, 2019",
    titleNews: "Лесные огоньки: история одной фотографии",
    textNews:
      "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
    sourceNews: "Медуза",
  },
  {
    id: "3",
    keyword: "природа",
    srcImg: imgPath3,
    dateNews: "2 августа, 2019",
    titleNews: "«Первозданная тайга»: новый фотопроект Игоря Шпиленка",
    textNews:
      "Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...",
    sourceNews: "Риа",
  },
  {
    id: "4",
    keyword: "Фотография",
    srcImg: imgPath4,
    dateNews: "2 августа, 2019",
    titleNews: "Лесные огоньки: история одной фотографии",
    textNews:
      "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
    sourceNews: "Афиша",
  },
  {
    id: "5",
    keyword: "Тайга",
    srcImg: imgPath5,
    dateNews: "2 августа, 2019",
    titleNews: "«Первозданная тайга»: новый фотопроект Игоря Шпиленка",
    textNews:
      "Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...",
    sourceNews: "Медиазона",
  },
  {
    id: "6",
    keyword: "Парки",
    srcImg: imgPath6,
    dateNews: "2 августа, 2019",
    titleNews: "Национальное достояние – парки",
    textNews:
      "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
    sourceNews: "Дзен",
  },
  {
    id: "7",
    keyword: "природа",
    srcImg: imgPath1,
    dateNews: "2 августа, 2019",
    titleNews: "Национальное достояние – парки",
    textNews:
      "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
    sourceNews: "Лента.ру",
  },
  {
    id: "8",
    keyword: "природа",
    srcImg: imgPath2,
    dateNews: "2 августа, 2019",
    titleNews: "Лесные огоньки: история одной фотографии",
    textNews:
      "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
    sourceNews: "Медуза",
  },
  {
    id: "9",
    keyword: "природа",
    srcImg: imgPath3,
    dateNews: "2 августа, 2019",
    titleNews: "«Первозданная тайга»: новый фотопроект Игоря Шпиленка",
    textNews:
      "Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...",
    sourceNews: "Риа",
  },
  {
    id: "10",
    keyword: "природа",
    srcImg: imgPath1,
    dateNews: "2 августа, 2019",
    titleNews: "Национальное достояние – парки",
    textNews:
      "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
    sourceNews: "Лента.ру",
  },
  {
    id: "11",
    keyword: "природа",
    srcImg: imgPath2,
    dateNews: "2 августа, 2019",
    titleNews: "Лесные огоньки: история одной фотографии",
    textNews:
      "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
    sourceNews: "Медуза",
  },
];

const infoData={data, validateForm, itemsCard };

export default infoData;
