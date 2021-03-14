import React, { useEffect } from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import { useHistory } from "react-router-dom";

const Main = ({ handleLogin, handleUpdateSearch, mobile, themeHeader }) => {
  const history = useHistory();
  const coverClass = `cover  ${mobile ? "cover__mobile" : ""}`;

  useEffect(() => {
    if (history.action === "REPLACE") handleLogin();
  });

  useEffect(() => {
    themeHeader(false);
  }, [themeHeader]);

  return (
    <>
      <section className={coverClass}>
        <div className="wrap">
          <h2 className="cover__title">Что творится в мире?</h2>
          <p className="cover__subtitle">
            Находите самые свежие статьи на любую тему и сохраняйте в своём
            личном кабинете.
          </p>
          <SearchForm onUpdateSearch={handleUpdateSearch} />
        </div>
      </section>
    </>
  );
};

export default Main;
