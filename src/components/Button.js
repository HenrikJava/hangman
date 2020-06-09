import React from "react";
import "../styles/Button.css";

const Button = ({ text, onHandleClick, className, isDisable }) => {
  console.log(isDisable);
  return (
    <button
      className={isDisable ? "charButtonsShadowed" : className}
      key={text}
      onClick={onHandleClick}
      disabled={isDisable}
    >
      {text}
    </button>
  );
};
export default Button;
