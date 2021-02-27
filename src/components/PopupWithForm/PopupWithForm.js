import React from "react";
import "./PopupWithForm.css";

const PopupWithForm = ({ name, children, isOpen, onClose, onSubmit }) => {
  return (
    <section
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
    >
      <form
        action="#"
        className={`popup__container popup__container_${name}`}
        name={`popup-${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        <button className="popup__close" type="button" onClick={onClose} />

        {children}
      </form>
    </section>
  );
};

export default PopupWithForm;
