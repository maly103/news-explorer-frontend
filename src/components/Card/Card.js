import React, { useRef, useEffect, useState } from "react";
import "./Card.css";

const Card = ({ card, isLogged, handleClick, pageSaved }) => {
  const [isLiked, setIsLiked] = useState(false);
  const pTitle = useRef(null);
  const pText = useRef(null);
  const wrap = useRef(null);

  let classKeyword;
  let classMark;
  let classTooltip;

  if (pageSaved) {
    classKeyword = "elements__keyword";
    classMark = "elements__size elements__trash";
    classTooltip = "tooltip tooltip__trash";
  } else {
    classKeyword = "elements__keyword elements__disabled";
    classMark = `elements__size ${
      isLiked ? "elements__mark-liked" : "elements__mark"
    }`;

    classTooltip = `tooltip tooltip__mark ${
      isLogged ? "tooltip__disabled" : ""
    }`;
  }
  const handleCardClick = () => {
    if (!pageSaved) {
      setIsLiked(!isLiked);
    }
    handleClick(card);
  };

  useEffect(() => {
    const heightTitle = pTitle.current.clientHeight;
    const heightText = pText.current.clientHeight;
    const heightWrap = wrap.current.clientHeight;
    const target_height = heightWrap - heightTitle;

    if (heightText > target_height) {
      const arrText = pText.current.innerHTML.split(" ");
      const col = Math.floor((target_height / heightText) * arrText.length) - 1;
      const newArr = arrText.slice([0], col);
      newArr.push("...");
      const testText = newArr.join(" ");
      pText.current.innerHTML = testText;
    }
  }, []);

  return (
    <li className="elements__item">
      <section className="wrapper">
        <p className={classKeyword}>{card.keyword}</p>
        <div
          className={classMark}
          onClick={isLogged ? handleCardClick : () => {}}
        >
          <span className={classTooltip}></span>
        </div>
      </section>
      <img className="elements__img" alt="img" src={card.srcImg} />
      <p className="elements__data">{card.dateNews}</p>
      <div className="elements__footer">
        <div className="elements__wrapper" ref={wrap}>
          <h2 className="elements__title" ref={pTitle}>
            {card.titleNews}
          </h2>
          <p className="elements__text" ref={pText}>
            {card.textNews}
          </p>
        </div>
        <p className="elements__source">{card.sourceNews}</p>
      </div>
    </li>
  );
};

export default Card;
