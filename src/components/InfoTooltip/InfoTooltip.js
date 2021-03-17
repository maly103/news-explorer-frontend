import React from "react";
import "./InfoTooltip.css";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const InfoTooltip = ({ isOpen, onClose, textReg, handleClickLogin, login }) => {
  const classButton=login? "tooltip__reg" : "tooltip__reg-inactive";
  return (
    <PopupWithForm
      name="toolTip"
      children={
        <>
          <p className="tooltip__title">{textReg}</p>
          <span className={classButton} onClick={handleClickLogin}>
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
