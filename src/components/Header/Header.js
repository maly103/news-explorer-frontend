import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../context/currentUserContext";

const Header = ({
  handleClickLogin,
  handleLogout,
  isLogged,
  title,
  theme,
  handleClickHeader,
  handleClickMobile,
  mobile,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const classToggleOpen = `menu__toggle ${
    theme ? "menu__toggle_light" : "menu__toggle_dark"
  }`;
  const classToggleClose = `menu__toggle ${
    theme ? "menu__toggle_close-light" : "menu__toggle_close-dark"
  }`;
  const classToggle = mobile ? classToggleClose : classToggleOpen;
  const headerMobile = mobile ? " header__mobile" : "";
  const headerLogoMobile = mobile ? " header__logo_mobile" : "";
  const headerButtonMobile = mobile ? " header__button_mobile" : "";
  const headerLineClass = `header__line ${mobile ? "header__line_mobile" : ""}`;
  const headerNavMobile = mobile ? " header__nav_mobile" : "";
  const headerClass =
    `header  ${theme ? "header_light" : "header_dark"}` + headerMobile;
  const headerLogoClass =
    `header__logo  ${theme ? "header__logo_light" : "header__logo_dark"}` +
    headerLogoMobile;
  const headerButtonClass =
    `header__button  ${
      theme ? "header__button_light" : "header__button_dark"
    }` + headerButtonMobile;
  const headerNavClass = "header__nav" + headerNavMobile;
  const imgButton = `header__button_out ${
    theme ? "header__button_out-light" : "header__button_out-dark"
  }`;

  const handleClickToggle = () => {
    handleClickMobile(!mobile);
  };

  return (
    <header className={headerClass}>
      <section className={headerLineClass}>
        <Link className={headerLogoClass} exact to="/">
          NewsExplorer
        </Link>

        <div className={classToggle} onClick={handleClickToggle} />
      </section>
      <div className={headerNavClass}>
        <Navigation
          isLogged={isLogged}
          onClickLink={handleClickHeader}
          item={theme}
          mobile={mobile}
        />
        <p
          className={
            isLogged
              ? `${headerButtonClass} ${imgButton}`
              : `${headerButtonClass}`
          }
          onClick={isLogged ? handleLogout : handleClickLogin}
        >
          {isLogged ? currentUser.userName : title}
        </p>
      </div>
    </header>
  );
};

export default Header;
