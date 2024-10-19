/* ./src/components/WordleGrid/WordleGrid.js */

import React, { useState, useCallback, useEffect } from 'react';
import useInputHandler from '../../utils/InputHandler';
import './WordleGrid.css';
import wordListData from '../../data/wordList.json';

const WordleGrid = ({ handleVirtualKeyClick, handleEnter, handleDelete, gameOver }) => {
  const [wordToGuess] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState(Array(6).fill('').map(() => Array(5).fill('')));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [flippingCells, setFlippingCells] = useState([]);
  const [processedKey, setProcessedKey] = useState(null);

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
    if (gameOver || currentGuess.length !== 5) return;

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
  }, [currentGuess, currentAttempt, wordToGuess, gameOver, showPopup]);

  const handleDeleteInternal = useCallback(() => {
    if (gameOver) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameOver]);

  const handleKeyPress = useCallback((key) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      handleEnterInternal();
    } else if (key === 'BACKSPACE') {
      handleDeleteInternal();
    } else if (/^[A-Z]$/.test(key)) {
      setCurrentGuess((prev) => (prev.length < 5 ? prev + key : prev));
    }
  }, [gameOver, handleEnterInternal, handleDeleteInternal]);

  // Use custom hook to handle real keyboard input
  useInputHandler(handleKeyPress);

  // Handle virtual keyboard input
  useEffect(() => {
    if (handleVirtualKeyClick && handleVirtualKeyClick !== processedKey) {
      handleKeyPress(handleVirtualKeyClick);
      setProcessedKey(handleVirtualKeyClick); // Mark the key as processed
    }
  }, [handleVirtualKeyClick, handleKeyPress, processedKey]);

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
