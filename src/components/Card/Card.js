import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { formatDateApi } from "../../utils/utils";
import "./Card.css";

const Card = ({ card, isLogged, handleClick, hadleClickReg }) => {
  let history = useHistory();
  let pageSaved = history.location.pathname === "/news";
  const [isLiked, setIsLiked] = useState(card.isLiked);
  const [width, setWidth] = useState(window.innerWidth);

  const pTitle = useRef(null);
  const pText = useRef(null);
  const wrap = useRef(null);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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
  const handleRegister = () => {
    hadleClickReg();
  };
  const handleCardClick = () => {
    if (!pageSaved) {
      setIsLiked(!isLiked);
    }
    handleClick(card);
  };

  useEffect(() => {
    let heightText = pText.current.clientHeight;
    let heightTitle = pTitle.current.clientHeight;

    let heightWrapper = wrap.current.clientHeight;
    let heigthAccessText = heightWrapper - heightTitle - 23;

    const resizeText = (text, accessHeight, textHeight) => {
      let newArr = text.current.innerHTML.split(" ");
      let colWord = newArr.length;
      let chLength = Math.floor((colWord * accessHeight) / textHeight);
      newArr = newArr.slice(0, chLength);
      newArr.push("...");
      text.current.innerHTML = newArr.join(" ");
    };

    if (heightTitle > heightWrapper) {
      resizeText(pTitle, heightWrapper - 10, heightTitle);
      pText.current.innerHTML = "";
    } else if (heigthAccessText <= 0) {
      pText.current.innerHTML = "";
    } else if (heigthAccessText < heightText) {
      resizeText(pText, heigthAccessText, heightText);
    }
  }, [width]);

  return (
    <li className="elements__item">
      <div className="wrapper">
        <p className={classKeyword}>{card.keyword}</p>
        <div
          className={classMark}
          onClick={isLogged ? handleCardClick : handleRegister}
        >
          <span className={classTooltip}></span>
        </div>
      </div>
      <img className="elements__img" alt="img" src={card.image} />
      <p className="elements__data">{formatDateApi(card.date)}</p>
      <div className="elements__footer">
        <div className="elements__wrapper" ref={wrap}>
          <h2 className="elements__title" ref={pTitle}>
            {card.title}
          </h2>
          <p className="elements__text" ref={pText}>
            {card.text}
          </p>
        </div>
        <p className="elements__source">{card.source}</p>
      </div>
    </li>
  );
};

export default Card;
