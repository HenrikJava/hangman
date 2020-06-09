import React from "react";
import "./styles/App.css";
import image0 from "./images/0.jpg";
import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";
import image4 from "./images/4.jpg";
import image5 from "./images/5.jpg";
import image6 from "./images/6.jpg";
import { useState } from "react";
import CharButtons from "./components/CharButtons.js";
import randomWord from "./utils/RandomWord.js";
import Button from "./components/Button.js";

const App = () => {
  let letters = "abcdefghijklmnopqrstuvwxyzåäö";
  letters = letters.split("");
  const images = [image0, image1, image2, image3, image4, image5, image6];
  const [secretWord, setSecretWord] = useState(randomWord());
  const [displayedWord, setDisplayedWord] = useState(
    secretWord.split("").map((e) => " - ")
  );
  const [guesses, setGuesses] = useState(5);
  const [usedButtons, setUsedButtons] = useState([]);
  const [userFriendlyText, setUserFriendlyText] = useState(
    "Välkommen, antal felgissningar kvar: "
  );
  const [imageCount, setImageCount] = useState(0);
  const [image, setImage] = useState(images[imageCount]);
  const [resetButton, setResetButton] = useState("");

  const guess = (charObject) => {
    setUsedButtons(usedButtons.concat(charObject.innerHTML));
    validateGuess(charObject.innerHTML, secretWord, displayedWord);
    return "";
  };
  const validateGuess = (char, secretWord, displayedWord) => {
    let letterFound = false;
    secretWord.split("").map((elem, index) => {
      if (char === elem) {
        displayedWord[index] = char;
        letterFound = true;
      }
      return "";
    });
    if (!letterFound) {
      wrongGuess();
    } else {
      setUserFriendlyText("Bokstaven fanns! , antal felgissningar kvar: ");
      if (displayedWord.join("") === secretWord) {
        wonGame();
      }
    }
  };

  const wrongGuess = () => {
    setGuesses(guesses - 1);
    setUserFriendlyText("Det var tyvärr fel, antal felgissningar kvar: ");
    setImageCount((prevCount) => {
      return prevCount + 1;
    });
    setImage(images[imageCount + 1]);
    guesses < 1 && loseGame();
  };

  const wonGame = () => {
    setUserFriendlyText("Du vann!!!");
    setGuesses("");
    setUsedButtons(letters);
    setResetButton(
      <Button
        text="Spela igen"
        className="resetButton"
        onHandleClick={() => resetGame()}
      />
    );
  };

  const loseGame = () => {
    setUserFriendlyText("Du förlorade, det rätta ordet var:");
    setDisplayedWord(secretWord.split(""));
    setGuesses("");
    setUsedButtons(letters);
    setResetButton(
      <Button
        text="Spela igen"
        className="resetButton"
        onHandleClick={() => resetGame()}
      />
    );
  };

  const resetGame = () => {
    let newSecretWord = randomWord();
    setSecretWord(newSecretWord);
    setDisplayedWord(newSecretWord.split("").map((e) => " - "));
    setUsedButtons([]);
    setGuesses(5);
    setUserFriendlyText("Välkommen, antal felgissningar kvar: ");
    setImageCount(0);
    setImage(images[imageCount]);
    setResetButton("");
  };

  return (
    <div className="App">
      <h1>Hänga gubbe</h1>
      <br />
      <p>
        Spelet går ut på att du ska gissa på en bokstav. Svarar du rätt sätts
        bokstaven in på rätt position. Svarar du fel går gubben mot sin död
        tills han till slut blir hängd!
      </p>
      <img src={image} alt="galge" />
      <p id="textToUser">
        {userFriendlyText} {guesses}
      </p>
      <h3 id="word">{displayedWord}</h3>
      <br />
      <CharButtons
        id="boxOfChars"
        letters={letters}
        onHandleClick={(e) => guess(e.target)}
        usedButtons={usedButtons}
      />
      {resetButton}
    </div>
  );
};

export default App;
