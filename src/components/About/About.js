import React from "react";
import "./About.css";
import AvatarPath from "../../images/avatar.jpg";

const Main = () => {
  return (
    <section className="about">
      <img src={AvatarPath} alt="avatar" className="about__image" />

      <div className="about__text">
        <p className="about__title">Об авторе</p>
        <p className="about__paragraph">
          Это блок с описанием автора проекта. Здесь следует указать, как вас
          зовут, чем вы занимаетесь, какими технологиями разработки владеете.
        </p>
        <p className="about__paragraph">
          Также можно рассказать о процессе обучения в Практикуме, чему вы тут
          научились, и чем можете помочь потенциальным заказчикам.
        </p>
      </div>
    </section>
  );
};

export default Main;
