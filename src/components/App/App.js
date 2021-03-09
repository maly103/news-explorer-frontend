import { React, useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import About from "../About/About";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { data, validateForm, itemsCard } from "../../utils/config";
import { CurrentUserContext } from "../../context/currentUserContext";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import Notfounded from "../Notfounded/Notfounded";
import SavedNews from "../SavedNews/SavedNews";

function App() {
  const [isLoginPopupFormOpen, setLoginPopupFormOpenState] = useState(false);
  const [isRegisterPopupFormOpen, setRegisterPopupFormOpenState] = useState(
    false
  );
  const [infoTooltip, setInfoTooltipState] = useState({
    isInfoTooltipPopupOpen: false,
    textReg: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [searchText, setSearchText] = useState("");
  const [isUserExist, setUserExist] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLightHeader, setIsLightHeader] = useState(false);
  const [savedCards, setsavedCards] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const handleClickMobile = (mobile) => {
    setIsMobile(mobile);
  };
  const handleLogin = (email, password) => {
    let login;
    userData.userName ? (login = userData.userName) : (login = "Грета");
    setCurrentUser({
      email: email,
      password: password,
      userName: login,
    });
    setLoggedIn(true);
    closeAllPopups();
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleRegister = (email, password, userName) => {
    if (email === "test@test.ru") {
      setUserExist(true);
    } else {
      closeAllPopups();
      setInfoTooltipState({
        isInfoTooltipPopupOpen: true,
        textReg: "Пользователь успешно зарегистрирован!",
      });
      setUserData({
        email: email,
        password: password,
        userName: userName,
      });
    }
  };

  const handleClickLogin = () => {
    closeAllPopups();
    setLoginPopupFormOpenState(true);
    const blockFormLogin = document.querySelector(".popup__container_login");
    validateForm(data, blockFormLogin);
  };

  const handleClickRegister = () => {
    setLoginPopupFormOpenState(false);
    setRegisterPopupFormOpenState(true);
    const blockFormRegister = document.querySelector(
      ".popup__container_register"
    );
    validateForm(data, blockFormRegister);
  };

  const closeAllPopups = () => {
    setLoginPopupFormOpenState(false);
    setRegisterPopupFormOpenState(false);
    setInfoTooltipState(false);
  };

  const handleUpdateSearch = (searchKeyword) => {
    setIsLoading(true);
    setSearchText(searchKeyword);
  };

  const handleClickCardMark = (cardMarked) => {
    savedCards.push(cardMarked);
    setsavedCards(savedCards);
  };

  const handleClickHeader = (theme) => {
    setIsLightHeader(theme);
  };

  const handleClickDelete = (card) => {
    const newCards = savedCards.filter((elem) => card.id !== elem.id);
    setsavedCards(newCards);
  };

  const defineContent = () => {
    if (cards.length > 0) {
      return (
        <NewsCardList
          cards={cards}
          isLogged={loggedIn}
          handleClickCardMark={handleClickCardMark}
        />
      );
    } else if (cards.length === 0 && searchText) {
      return <Notfounded />;
    }
  };

  useEffect(() => {
    if (isLoading) {
      const arrCards = [];
      itemsCard.forEach((item) => {
        if (item.keyword.toLowerCase() === searchText.toLowerCase()) {
          arrCards.push(item);
        }
      });
      setIsLoading(false);
      setCards(arrCards);
    }
  }, [isLoading, searchText]);

  return (
    <div className="app-wrap">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          handleClickLogin={handleClickLogin}
          handleLogout={handleLogout}
          isLogged={loggedIn}
          title={"Авторизация"}
          theme={isLightHeader}
          handleClickHeader={handleClickHeader}
          handleClickMobile={handleClickMobile}
          mobile={isMobile}
        />

        <Switch>
          <Route exact path="/">
            <Main
              handleUpdateSearch={handleUpdateSearch}
              mobile={isMobile}
              themeHeader={handleClickHeader}
            />
            {isLoading ? <Preloader /> : defineContent()}
            <About />
            <Login
              isOpen={isLoginPopupFormOpen}
              onClose={closeAllPopups}
              handleLogin={handleLogin}
              handleClickRegister={handleClickRegister}
            />
            <Register
              isOpen={isRegisterPopupFormOpen}
              isUserExist={isUserExist}
              onClose={closeAllPopups}
              handleRegister={handleRegister}
              handleClickLogin={handleClickLogin}
            />
            <InfoTooltip
              isOpen={infoTooltip.isInfoTooltipPopupOpen}
              onClose={closeAllPopups}
              textReg={infoTooltip.textReg}
              handleClickLogin={handleClickLogin}
            />
          </Route>

          <Route path="/news">
           {!loggedIn ? (
              <Redirect exact to="/" />
            ) : (
              <SavedNews
                savedCards={savedCards}
                handleClickDelete={handleClickDelete}
                themeHeader={handleClickHeader}
              />
            )}
          </Route>
        </Switch>

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
