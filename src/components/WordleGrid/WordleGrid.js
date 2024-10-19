/* ./src/components/WordleGrid/WordleGrid.js */

import React, { useState, useCallback, useEffect } from 'react';
import useInputHandler from '../../utils/InputHandler';
import './WordleGrid.css';
import wordListData from '../../data/wordList.json';
import GridRow from './GridRow';
import PopupMessage from './PopupMessage';

const WordleGrid = ({ handleVirtualKeyClick, handleEnter, handleDelete, gameOver, handleKeyProcessed }) => {
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
    if (handleVirtualKeyClick) {
      handleKeyPress(handleVirtualKeyClick);
      handleKeyProcessed(); // Clear the virtual key after processing
    }
  }, [handleVirtualKeyClick, handleKeyPress, handleKeyProcessed]);

  return (
    <div className="wordle-container">
      <div className="grid" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        {guesses.map((row, rowIndex) => (
          <GridRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            currentAttempt={currentAttempt}
            currentGuess={currentGuess}
            wordToGuess={wordToGuess}
            flippingCells={flippingCells}
          />
        ))}
      </div>
      {popupMessage && <PopupMessage message={popupMessage} />}
    </div>
  );
};

export default WordleGrid;
