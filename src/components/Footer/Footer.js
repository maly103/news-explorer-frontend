import React from "react";
import { Link } from "react-router-dom";
import IconGit from "../../images/Git.svg";
import IconFacebook from "../../images/Facebook.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">&copy; 2020 Supersite, Powered by News API</p>

      <div className="list">
        <Link className="list__item" to="/">
          Главная
        </Link>
        <a
          className="list__item"
          href="https://praktikum.yandex.ru/"
          target="_blank"
          rel="noreferrer"
        >
          Яндекс.Практикум
        </a>
      </div>
      <div className="icon">
        <a
          className="icon__item"
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={IconGit} alt="git" />
        </a>
        <a
          className="icon__item"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={IconFacebook} alt="facebook" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
