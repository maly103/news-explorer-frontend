import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import "../Login/Login";
import "./Register.css";

const Register = ({
  isOpen,
  isUserExist,
  onClose,
  handleRegister,
  handleClickLogin,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password, userName } = data;
    handleRegister(email, password, userName);
  };

  return (
    <PopupWithForm
      name={"register"}
      children={
        <>
          <h2 className="popup__title popup__title_login">Регистрация</h2>
          <p className="popup__subtitle popup__subtitle_email">Email</p>
          <input
            className="popup__text popup__text_input"
            type="email"
            name="email"
            required
            autoComplete="off"
            onChange={handleChange}
          />
          <span
            className="popup__text-error popup__text-error_active"
            id="email-error"
          >
            Неправильный формат email
          </span>
          <p className="popup__subtitle popup__subtitle_password">Пароль</p>
          <input
            className="popup__text popup__text_input"
            type="password"
            minLength="2"
            name="password"
            required
            autoComplete="off"
            onChange={handleChange}
          />
          <span
            className="popup__text-error popup__text-error_active"
            id="password-error"
          >
            Поле не может быть пустым
          </span>
          <p className="popup__subtitle popup__subtitle_name">Имя</p>
          <input
            className="popup__text popup__text_input"
            type="text"
            minLength="2"
            name="userName"
            required
            autoComplete="off"
            onChange={handleChange}
          />
          <span
            className="popup__text-error popup__text-error_active"
            id="userName-error"
          >
            Поле не может быть пустым
          </span>
          <span className={isUserExist ? `er__text` : `er__hidden`}>
            Такой пользователь уже есть
          </span>
          <button className="popup__send popup__send-register" type="submit">
            Зарегистрироваться
          </button>
          <p className="popup__text popup__text_abz">
            или{" "}
            <span className="popup__text_reg" onClick={handleClickLogin}>
              Войти
            </span>
          </p>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
