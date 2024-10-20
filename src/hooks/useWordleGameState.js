// Suggested Directory: ./src/hooks/useWordleGameState.js

import { useState, useCallback } from 'react';
import wordListData from '../data/wordList.json';

function useWordleGameState() {
  const [wordToGuess] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState(Array(6).fill('').map(() => Array(5).fill('')));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [flippingCells, setFlippingCells] = useState([]);
  const [keyStatuses, setKeyStatuses] = useState({});

  function getRandomWord() {
    return wordListData[Math.floor(Math.random() * wordListData.length)];
  }

  const showPopup = useCallback((message, duration = 1000) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage('');
    }, duration);
  }, []);

  const updateLetterStates = useCallback((guess) => {
    setKeyStatuses((prevKeyStatuses) => {
      const newKeyStatuses = { ...prevKeyStatuses };

      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        if (wordToGuess[i] === letter) {
          newKeyStatuses[letter] = 'correct';
        } else if (wordToGuess.includes(letter) && newKeyStatuses[letter] !== 'correct') {
          newKeyStatuses[letter] = 'present';
        } else if (!wordToGuess.includes(letter)) {
          newKeyStatuses[letter] = 'absent';
        }
      }

      return newKeyStatuses;
    });
  }, [wordToGuess]);

  const handleEnterInternal = useCallback(() => {
    if (currentGuess.length !== 5) {
      showPopup('Silakan lengkapi semua kotak terlebih dahulu!', 1500);
      return;
    }

    if (!wordListData.includes(currentGuess)) {
      showPopup(`"${currentGuess}" bukan kata yang valid`, 1500);
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
      updateLetterStates(currentGuess);

      if (currentGuess === wordToGuess) {
        showPopup('Selamat! Anda berhasil menebak kata!', 3000);
      } else if (currentAttempt < 5) {
        setCurrentAttempt((prev) => prev + 1);
        setCurrentGuess('');
      } else {
        showPopup('Permainan selesai! Kata yang benar adalah: ' + wordToGuess, 3000);
      }
    }, 600);
  }, [currentGuess, currentAttempt, wordToGuess, showPopup, updateLetterStates]);

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
    keyStatuses
  };
}

export default useWordleGameState;