import React from "react";
import "./Notfounded.css";
import pathImg from "../../images/not-found_v1.svg";

const Notfounded = () => {
  return (
    <section className="notfounded">
      <img className="notfounded__img" src={pathImg} alt="notfounded" />
      <p className="notfounded__title">Ничего не найдено</p>
      <p className="notfounded__text">
        К сожалению по вашему запросу ничего не найдено.
      </p>
    </section>
  );
};

export default Notfounded;
