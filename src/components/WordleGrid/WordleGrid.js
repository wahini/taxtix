/* ./src/components/WordleGrid/WordleGrid.js */

import React, { useState, useEffect, useCallback } from 'react';
import './WordleGrid.css';
import wordListData from '../../data/wordList.json';

const WordleGrid = () => {
  const [wordToGuess] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState(Array(6).fill('').map(() => Array(5).fill('')));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [flippingCells, setFlippingCells] = useState([]);

  function getRandomWord() {
    return wordListData[Math.floor(Math.random() * wordListData.length)];
  }

  const handleEnter = useCallback(() => {
    if (gameOver || currentGuess.length !== 5) return;

    if (!wordListData.includes(currentGuess)) {
      showPopup(`"${currentGuess}" tidak ditemukan`);
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
        setGameOver(true);
        showPopup('Congratulations! You guessed the word!');
      } else if (currentAttempt < 5) {
        setCurrentAttempt((prev) => prev + 1);
        setCurrentGuess('');
      } else {
        setGameOver(true);
        showPopup('Game Over! The correct word was: ' + wordToGuess);
      }
    }, 600);
  }, [currentGuess, currentAttempt, wordToGuess, gameOver]);

  const handleDelete = useCallback(() => {
    if (gameOver) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameOver]);

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage('');
    }, 1000);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      if (key === 'ENTER') {
        handleEnter();
      } else if (key === 'BACKSPACE') {
        handleDelete();
      } else if (/^[A-Z]$/.test(key)) {
        setCurrentGuess((prev) => prev.length < 5 ? prev + key : prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleEnter, handleDelete]);

  return (
    <div className="wordle-container">
      <div className="grid" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        {guesses.map((row, rowIndex) => (
          <div key={rowIndex} className="row" style={{ display: 'flex', gap: '5px' }}>
            {row.map((letter, letterIndex) => (
              <div
                key={letterIndex}
                className={`cell ${
                  flippingCells.includes(letterIndex) && rowIndex === currentAttempt
                    ? 'flipping'
                    : letter
                    ? wordToGuess[letterIndex] === letter
                      ? 'correct'
                      : wordToGuess.includes(letter)
                      ? 'present'
                      : 'absent'
                    : ''
                }`}
                style={{ flex: 1, height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {rowIndex === currentAttempt && letterIndex < currentGuess.length
                  ? currentGuess[letterIndex]
                  : letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
    </div>
  );
};

export default WordleGrid;


