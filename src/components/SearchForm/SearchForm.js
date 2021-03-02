import React, { useRef } from "react";
import "./SearchForm.css";

const SearchForm = ({ onUpdateSearch }) => {
  const inputSearch = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateSearch(inputSearch.current.value);
  };
  return (
    <>
      <form className="search__block" name="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          name="poisk"
          required
          placeholder="Еще не ввел текст"
          ref={inputSearch}
        />
        <button className="search__send" type="submit">
          Искать
        </button>
      </form>
    </>
  );
};

export default SearchForm;
