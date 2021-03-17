import React, { useEffect } from "react";
import "./SavedNews.css";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../context/currentUserContext";

const SavedNews = ({ savedCards, handleDeleteCard, themeHeader }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const handleClickDelete = (card) => {
    handleDeleteCard(card._id);
  };
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
    const result = keywords.reduce((sumKeywords, item) => {
      return typeof sumKeywords[item] !== "undefined"
        ? { ...sumKeywords, [item]: sumKeywords[item] + 1 }
        : { ...sumKeywords, [item]: 1 };
    }, {});
    let arr = [];
    for (let key in result) {
      arr.push({ name: key, col: result[key] });
    }
    arr.sort((a, b) => (a.col < b.col ? 1 : -1));

    let str = "По ключевым словам: ";
    switch (arr.length) {
      case 0:
        break;
      case 1:
        str += arr[0].name;
        break;
      case 2:
        str += arr[0].name + ", " + arr[1].name;
        break;
      default:
        str +=
          arr[0].name +
          ", " +
          arr[1].name +
          " и " +
          +(arr.length - 2) +
          "-м другим";
        break;
    }

    return str;
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
              key={item._id}
              card={item}
              isLogged={true}
              handleClick={handleClickDelete}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default SavedNews;
