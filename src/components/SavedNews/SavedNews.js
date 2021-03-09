import React, { useEffect } from "react";
import "./SavedNews.css";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../context/currentUserContext";

const SavedNews = ({ savedCards, handleClickDelete, themeHeader }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const strSavedNews = () => {
    const countNews = savedCards.length;
    let x;
    let y;
    switch (countNews % 10) {
      case 1:
        x = "ая";
        y = "ья";
        break;
      case 2:
      case 3:
      case 4:
        y = "ьи";
        x = "ых";
        break;
      default:
        x = "ых";
        y = "ей";
    }
    const strTitle =
      currentUser.userName +
      ", у вас " +
      countNews +
      " сохраненн" +
      x +
      " стат" +
      y;
    return strTitle;
  };
  const newsKeywords = () => {
    const keywords = savedCards.map((item) => item.keyword);
    let result = [];
    for (let str of keywords) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    if (result.length > 2) {
      const countKeywords = result.length - 2;
      return (
        "По ключевым словам: " +
        result[0] +
        ", " +
        result[1] +
        " и " +
        countKeywords +
        "-м другим"
      );
    } else if (result.length === 2) {
      return "По ключевым словам: " + result[0] + ", " + result[1];
    } else {
      return "По ключевым словам: " + result[0];
    }
  };
  useEffect(() => {
    themeHeader(true);
  }, [themeHeader]);

  return (
    <>
      <section className="saved__news">
        <p className="news__subtitle">Сохранённые статьи</p>
        <p className="news__title">{strSavedNews()}</p>
        <p className="news__keywords">{newsKeywords()}</p>
      </section>

      <section className="block__news">
        <ul className="gallery">
          {savedCards.map((item) => (
            <Card
              key={item.id}
              card={item}
              isLogged={true}
              handleClick={handleClickDelete}
              pageSaved={true}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default SavedNews;
