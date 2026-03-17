import "./App.css";
import { useState, useEffect, useRef } from "react";
import { languages } from "./languages";
import clsx from "clsx";
import { getFarewellText, getWord } from "./utils";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

/**
 * Backlog:
 *
 * ✅ Farewell messages in status section
 * ✅ Disable the keyboard when the game is over
 * ✅ Fix a11y issues
 * ✅ Choose a random word from a list of words
 * ✅ Make the New Game button reset the game
 * ✅ Reveal what the word was if the user loses the game
 * ✅ Confetti drop when the user wins
 *
 */

function AssemblyEndgame() {
  // State values -----------------------------------
  const [currentWord, setCurrentWord] = useState(() => getWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [shake, setShake] = useState(false);
  // Derived values -----------------------------------

  console.log(currentWord);

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;
  console.log("Wrong guesses:", wrongGuessCount);

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  console.log("Game won:", isGameWon);

  const numGuessesLeft = languages.length - 1;
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  console.log("last guess incorrect?", isLastGuessIncorrect);

  // Static values -----------------------------------
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Keyboard Elements
  const languageElements = languages.map((lang, index) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    const isLanguageLost = index < wrongGuessCount;
    console.log(isLanguageLost);

    const className = clsx(
      "chip",
      isLanguageLost && "lost",
      isGameLost && "fall",
    );

    return (
      <span style={styles} key={lang.name} className={className}>
        {lang.name}
      </span>
    );
  });

  // Letter Elements
  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    return (
      <span
        key={index}
        className={clsx(
          !guessedLetters.includes(letter) && isGameLost && "reveal",
        )}
      >
        {shouldRevealLetter ? letter : ""}
      </span>
    );
  });

  // Keyboard Elements
  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    // clsx conditional class names
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    // console.log(className);

    return (
      <button
        key={letter}
        onClick={() => addGuessedLetter(letter)}
        className={className}
        disabled={isGameOver}
        // a11y (accessibility)
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
      >
        {letter}
      </button>
    );
  });

  function addGuessedLetter(letter) {
    setGuessedLetters((prevGuess) =>
      prevGuess.includes(letter) ? prevGuess : [...prevGuess, letter],
    );
  }

  function renderGameStatus() {
    if (!isGameOver && !isLastGuessIncorrect) {
      return null;
    }
    if (!isGameOver && isLastGuessIncorrect) {
      return getFarewellText(languages[wrongGuessCount - 1].name);
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } else {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
  }

  function startNewGame() {
    setCurrentWord(() => getWord());
    setGuessedLetters([]);
    setShake(false);
  }

  // To check/debug guessedLetters state
  useEffect(() => console.log(guessedLetters), [guessedLetters]);

  useEffect(() => {
    isGameLost ? setShake(true) : "";
    console.log("Checking if I should shake");
  }, [guessedLetters]);

  // Ensures confetti fills the entire screen and resizes if the window changes.
  const { width, height } = useWindowSize();
  console.log(width, height);

  return (
    <>
      {isGameWon && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={1000}
        />
      )}
      <main className={shake ? "shake" : ""}>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word in under 8 attempts to keep the programming world
            safe from Assembly!
          </p>
        </header>
        <section
          className={clsx("game-status", {
            won: isGameWon,
            lost: isGameLost,
            farewell: !isGameOver && isLastGuessIncorrect,
          })}
          // a11y (accessibility)
          aria-live="polite"
          role="status"
        >
          {renderGameStatus()}
        </section>
        <section className="eliminations">{languageElements}</section>
        <section className="word">{letterElements}</section>
        {/* Combined visually-hidden aria-live region for status update */}
        <section
          // a11y (accessibility) [sr - screen reader only]
          className="sr-only"
          aria-live="polite"
          role="status"
        >
          <p>
            {currentWord.includes(lastGuessedLetter)
              ? `Correct! The letter ${lastGuessedLetter} is in the word.`
              : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
            You have {numGuessesLeft} attempts left.
          </p>
          <p>
            Current word:{" "}
            {currentWord
              .split("")
              .map((letter) =>
                guessedLetters.includes(letter) ? letter + "." : "blank.",
              )
              .join(" ")}
          </p>
        </section>
        <section className="keyboard">{keyboardElements}</section>
        {!isGameLost && !isGameWon && (
          <section className="guesses-left">
            Guesses Left: <span>{8 - wrongGuessCount}</span>
          </section>
        )}
        {isGameOver && (
          <button className="new-game" onClick={startNewGame}>
            New Game
          </button>
        )}
      </main>
    </>
  );
}

export default AssemblyEndgame;
