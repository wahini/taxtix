// /src/hooks/useWordleGameState.js

import { useState, useCallback } from 'react';
import wordListData from '../data/wordList.json';


function useWordleGameState() {
  const [wordToGuess] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState(Array(6).fill('').map(() => Array(5).fill('')));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [flippingCells, setFlippingCells] = useState([]);

  function getRandomWord() {
    return wordListData[Math.floor(Math.random() * wordListData.length)];
  }

  const showPopup = useCallback((message) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage('');
    }, 1000);
  }, []);

  const handleEnterInternal = useCallback(() => {
    if (currentGuess.length !== 5) return;

    if (!wordListData.includes(currentGuess)) {
      showPopup(`"${currentGuess}" is not a valid word`);
      return;
    }

    setFlippingCells(Array.from({ length: 5 }, (_, i) => i));
    setTimeout(() => {
      setGuesses((prevGuesses) => {
        const newGuesses = [...prevGuesses];
        newGuesses[currentAttempt] = currentGuess.split('');
        return newGuesses;
      });

      setFlippingCells([]);

      if (currentGuess === wordToGuess) {
        showPopup('Congratulations! You guessed the word!');
      } else if (currentAttempt < 5) {
        setCurrentAttempt((prev) => prev + 1);
        setCurrentGuess('');
      } else {
        showPopup('Game Over! The correct word was: ' + wordToGuess);
      }
    }, 600);
  }, [currentGuess, currentAttempt, wordToGuess, showPopup]);

  const handleDeleteInternal = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, []);

  return {
    wordToGuess,
    guesses,
    currentGuess,
    setCurrentGuess,
    currentAttempt,
    setCurrentAttempt,
    popupMessage,
    flippingCells,
    handleEnterInternal,
    handleDeleteInternal,
    showPopup,
  };
}

export default useWordleGameState;
