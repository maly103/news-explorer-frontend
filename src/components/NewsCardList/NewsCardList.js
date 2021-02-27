import React, { useState } from "react";
import "./NewsCardList.css";
import Card from "../Card/Card";
import "./NewsCardList";

const NewsCardList = ({ cards, isLogged, handleClickCardMark }) => {
  const countNews = cards.length;
  const [countCards, setCountCards] = useState(3);

  const handleShowMore = () => {
    let stateCount = countCards + 3;
    setCountCards(stateCount);
  };

  const classButton = `button__show ${
    countCards >= countNews ? "button__show__blocked" : "button__show__more"
  }`;
  const disabledButton = `${countCards >= countNews ? "disabled" : ""}`;
  return (
    <section className="block__news">
      <p className="block__title">Результаты поиска</p>
      <ul className="elements">
        {cards.slice(0, countCards).map((item) => (
          <Card
            key={item.id}
            card={item}
            isLogged={isLogged}
            handleClick={handleClickCardMark}
            pageSaved={false}
          />
        ))}
      </ul>
      <button
        className={classButton}
        onClick={handleShowMore}
        disabled={disabledButton}
      />
    </section>
  );
};

export default NewsCardList;
