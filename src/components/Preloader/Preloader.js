import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <section className="preloader">
      <i className="circle-preloader" />
      <p className="text-preloader">Идет поиск новостей...</p>
    </section>
  );
};

export default Preloader;
