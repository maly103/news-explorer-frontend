import React, { useRef, useEffect } from "react";
import "./SearchForm.css";
import { validateForm } from "../../utils/config";

const SearchForm = ({ onUpdateSearch }) => {
  const inputSearch = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blockFormSearch = document.querySelector(".search__block");
    const spanError = document.querySelector(".search__text-error");

    validateForm(
      {
        inputSelector: ".search__input",
        submitButtonSelector: ".search__send",
        inactiveButtonClass: "search__send_inactive",
        inputErrorClass: ".error",
        errorClass: "search__text-error_active",
      },
      blockFormSearch
    );
    onUpdateSearch(inputSearch.current.value);

    if (inputSearch.current.value === "") {
      spanError.classList.add("search__text-error_active");
    } else {
      onUpdateSearch(inputSearch.current.value);
    }
    e.target.reset();
  };
  useEffect(() => {}, [inputSearch]);
  return (
    <>
      <form
        className="search__block"
        name="search"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className="search__input"
          type="text"
          name="poisk"
          required
          autoComplete="off"
          placeholder="Еще не ввел текст"
          ref={inputSearch}
        />

        <button className="search__send" type="submit">
          Искать
        </button>
        <span className="search__text-error" id="poisk-error">
          Нужно ввести ключевое слово
        </span>
      </form>
    </>
  );
};

export default SearchForm;
