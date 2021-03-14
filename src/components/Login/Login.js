import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import "./Login.css";

const Login = ({ isOpen, onClose, handleLogin, handleClickRegister }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { pochta:email, pass:password } = data;
    handleLogin(email, password);
  };

  return (
    <PopupWithForm
      name={"login"}
      children={
        <>
          <h2 className="popup__title popup__title_login">Вход</h2>
          <p className="popup__subtitle popup__subtitle_email">Email</p>
          <input
            className="popup__text popup__text_input"
            type="email"
            name="pochta"
            required
            autoComplete="off"
            onChange={handleChange}
          />
          <span
            className="popup__text-error popup__text-error_active"
            id="pochta-error"
          >
            Неправильный формат email
          </span>
          <p className="popup__subtitle popup__subtitle_password">Пароль</p>
          <input
            className="popup__text popup__text_input"
            type="password"
            minLength="2"
            name="pass"
            required
            autoComplete="off"
            onChange={handleChange}
          />
          <span
            className="popup__text-error popup__text-error_active"
            id="pass-error"
          >
            Поле не может быть пустым
          </span>
          <button className="popup__send popup__send-login" type="submit">
            Войти
          </button>
          <p className="popup__text popup__text_abz">
            или{" "}
            <span className="popup__text_reg" onClick={handleClickRegister}>
              Зарегистрироваться
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

export default Login;
