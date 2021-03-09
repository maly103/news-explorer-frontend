import React from "react";
import "./InfoTooltip.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const InfoTooltip = ({ isOpen, onClose, textReg, handleClickLogin }) => {
  return (
    <PopupWithForm
      name="toolTip"
      children={
        <>
          <p className="tooltip__title">{textReg}</p>
          <span className="tooltip__reg" onClick={handleClickLogin}>
            Войти
          </span>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
export default InfoTooltip;
