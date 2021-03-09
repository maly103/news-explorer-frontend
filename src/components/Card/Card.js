import React, { useRef, useEffect, useState } from "react";
import "./Card.css";

const Card = ({ card, isLogged, handleClick, pageSaved }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const pTitle = useRef(null);
  const pText = useRef(null);
  const wrap = useRef(null);
  const sourceText = card.textNews.split(" ");

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
  const handleCardClick = () => {
    if (!pageSaved) {
      setIsLiked(!isLiked);
    }
    handleClick(card);
  };

  useEffect(() => {
    let heightText = pText.current.clientHeight;
    let heightTitle = pTitle.current.clientHeight;
    let heightWrap = pText.current.offsetTop + 42;
    let heightBlock = pText.current.offsetParent.clientHeight;
    let heightWrapper = wrap.current.clientHeight;
    let heigthAccessText = heightWrapper - heightTitle - 23;
    let useHeight = heightText + heightWrap;

    const resizeText = (pText, chLength, more) => {
      let newArr = pText.current.innerHTML.split(" ");
      more
        ? (newArr = sourceText.slice(0, newArr.length + chLength))
        : (newArr = newArr.slice(0, newArr.length + chLength));
      newArr.push("...");
      pText.current.innerHTML = newArr.join(" ");
    };

    if (useHeight >= heightBlock) {
      while (useHeight > heightBlock) {
        resizeText(pText, -2, false);
        useHeight = pText.current.clientHeight + pText.current.offsetTop + 42;
      }
    } else if (heightText < heigthAccessText) {
      while (heightText < heigthAccessText) {
        resizeText(pText, 1, true);
        heightText = pText.current.clientHeight + 10;
      }
    }
  }, [width, sourceText]);

  return (
    <li className="elements__item">
      <div className="wrapper">
        <p className={classKeyword}>{card.keyword}</p>
        <div
          className={classMark}
          onClick={isLogged ? handleCardClick : () => {}}
        >
          <span className={classTooltip}></span>
        </div>
      </div>
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
