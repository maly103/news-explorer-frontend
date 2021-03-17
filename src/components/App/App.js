import { React, useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import About from "../About/About";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRouted from "../ProtectedRouted/ProtectedRouted";
import { data, validateForm, defineContent } from "../../utils/config";
import { CurrentUserContext } from "../../context/currentUserContext";
import SavedNews from "../SavedNews/SavedNews";
import newsApi from "../../utils/NewsApi";
import mainApi from "../../utils/MainApi";
import { formatDate } from "../../utils/utils";
import * as newsAuth from "../../utils/newsAuth";

function App() {
  let location = useLocation();

  const history = useHistory();
  const locationState = location.state;
  const wasRedirected = locationState && !locationState.Logged;

  const [isLoginPopupFormOpen, setLoginPopupFormOpenState] = useState(false);
  const [isRegisterPopupFormOpen, setRegisterPopupFormOpenState] = useState(
    false
  );
  const [infoTooltip, setInfoTooltipState] = useState({
    isInfoTooltipPopupOpen: false,
    textReg: "",
    login: true,
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const [isUserExist, setUserExist] = useState(false);
  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [isLightHeader, setIsLightHeader] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const handleClickMobile = (mobile) => {
    setIsMobile(mobile);
  };
  const handleLogin = (email, password) => {
    
    newsAuth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setUserData({
            email: email,
            password: password,
            userName: data.name,
          });
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setLoginPopupFormOpenState(false);
        setInfoTooltipState({
          isInfoTooltipPopupOpen: true,
          textReg: "Что-то пошло не так!",
        });
        console.error(err);
      })
      
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("articles");
    setUserData({
      email: "",
      password: "",
      userName: "",
    });
    setLoggedIn(false);
    setCards(null);
  };

  const handleRegister = (email, password, name) => {
    newsAuth
      .register(email, password, name)
      .then((data) => {
        if (data) {
          setInfoTooltipState({
            isInfoTooltipPopupOpen: true,
            textReg: "Вы успешно зарегистрировались!",
          });
        }
      })
      .catch((err) => {
        if (err === 409) {
          setUserExist(true);
        } else {
          setInfoTooltipState({
            isInfoTooltipPopupOpen: true,
            textReg: "Что-то пошло не так!",
            login: false,
          });
        }
      });
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
    setUserExist(false);
    validateForm(data, blockFormRegister);
  };

  const closeAllPopups = () => {
    setLoginPopupFormOpenState(false);
    setRegisterPopupFormOpenState(false);
    setInfoTooltipState(false);
  };

  const errMessage = (isErr) => {
    if (!isErr) return null;
    return (
      <h2>
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </h2>
    );
  };

  const handleUpdateSearch = (searchKeyword) => {
    if (searchKeyword) {
      setIsErr(false);
      setIsLoading(true);
      const dateFrom = formatDate(new Date(new Date() - 604800 * 1000));
      const dateTo = formatDate(new Date());
      newsApi
        .getArticles(searchKeyword, dateFrom, dateTo)
        .then((res) => {
          const articles = res.articles.map((item) => {
            return {
              _id: item.url,
              keyword: searchKeyword,
              image: item.urlToImage,
              date: item.publishedAt,
              title: item.title,
              text: item.description,
              source: item.source.name,
              content: item.content,
              isLiked: false,
            };
          });
          localStorage.setItem("articles", JSON.stringify(articles));

          setCards(articles);
        })
        .catch((err) => {
          setIsErr(err);
        })
        .finally((_) => {
          setIsLoading(false);
        });
    }
  };

  const handleClickCardMark = (cardMarked) => {
    if (!cardMarked.isLiked) {
      mainApi
        .addCard(cardMarked)
        .then((res) => {
          res.isLiked = true;
          const newCards = cards.map((elem) =>
            res.link === elem._id ? res : elem
          );
          setCards(newCards);
          localStorage.setItem("articles", JSON.stringify(newCards));
        })
        .catch((err) => {
          setInfoTooltipState({
            isInfoTooltipPopupOpen: true,
            textReg: "Что-то пошло не так!",
            login: false,
          });
          console.log(err);
        });
    } else {
      mainApi
        .deleteCard(`articles/${cardMarked._id}`)
        .then((res) => {
          const newCards = cards.map((elem) => {
            if (res.art._id === elem._id) {
              elem.isLiked = false;
              elem._id = res.art.link;
            }
            return elem;
          });

          setCards(newCards);
          localStorage.setItem("articles", JSON.stringify(newCards));
        })
        .catch((error) => {
          setInfoTooltipState({
            isInfoTooltipPopupOpen: true,
            textReg: "Что-то пошло не так!",
            login: false,
          });
          console.log(error);
        });
    }
  };

  const handleClickHeader = (theme) => {
    setIsLightHeader(theme);
  };
  const handleDeleteCard = (cardId) => {
    mainApi
      .deleteCard(`articles/${cardId}`)
      .then((res) => {
        const newCards = savedCards.filter((elem) => res.art._id !== elem._id);

        const newLikeCards = cards.map((elem) => {
          if (res.art._id === elem._id) {
            elem.isLiked = false;
            elem._id = res.art.link;
          }
          return elem;
        });
        setCards(newLikeCards);
        setSavedCards(newCards);
        localStorage.setItem("articles", JSON.stringify(newLikeCards));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      newsAuth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              email: res.email,
              password: res.password,
              userName: res.name,
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (wasRedirected) {
      handleClickLogin();
      history.replace("/");
    }
  }, [wasRedirected]);

  useEffect(() => {
    setCards(JSON.parse(localStorage.getItem("articles")));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getAllCards()
        .then((data) => {
          setSavedCards(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cards, loggedIn]);

  return (
    <div className="app-wrap">
      <CurrentUserContext.Provider value={userData}>
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
            {errMessage(isErr)}
            {defineContent(
              cards,
              isLoading,
              loggedIn,
              handleClickCardMark,
              handleClickRegister
            )}
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

          <ProtectedRouted
            path="/news"
            loggedIn={loggedIn}
            component={SavedNews}
            savedCards={savedCards}
            handleDeleteCard={handleDeleteCard}
            themeHeader={handleClickHeader}
          />
        </Switch>

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
