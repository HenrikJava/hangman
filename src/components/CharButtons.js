import React from "react";
import Button from "./Button.js";

const CharButtons = ({ onHandleClick, usedButtons, letters }) => {
  letters = letters.map((char) => {
    return (
      <Button
        text={char}
        key={char}
        onHandleClick={onHandleClick}
        className="charButtons"
        isDisable={usedButtons.includes(char)}
      />
    );
  });
  return <div id={"boxOfChars"}>{letters}</div>;
};
export default CharButtons;
