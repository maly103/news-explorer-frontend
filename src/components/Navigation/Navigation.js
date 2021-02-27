import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ isLogged, onClickLink, item, mobile }) => {
  const menuItemMobile = mobile ? " menu__item_mobile" : "";
  const itemClass =
    `menu__item  ${item ? "menu__item_light" : "menu__item_dark"}` +
    menuItemMobile;

  const activeClassTheme = item
    ? "menu__item_active-light"
    : "menu__item_active-dark";
  const activeClass = mobile ? "" : activeClassTheme;
  const handleClickDark = () => {
    onClickLink(false);
  };
  const handleClickLight = () => {
    onClickLink(true);
  };

  return (
    <>
      <NavLink
        exact
        to="/"
        activeClassName={activeClass}
        className={itemClass}
        onClick={handleClickDark}
      >
        Главная
      </NavLink>
      <NavLink
        to="/news"
        activeClassName={activeClass}
        className={isLogged ? `${itemClass}` : `${itemClass}  menu__item_hiden`}
        onClick={handleClickLight}
      >
        Сохранённые статьи
      </NavLink>
    </>
  );
};

export default Navigation;
