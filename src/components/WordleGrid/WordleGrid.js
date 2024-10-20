// components/WordleGrid/WordleGrid.js

import React, { useEffect, useCallback, useState } from 'react';
import useInputHandler from '../../utils/InputHandler';
import './WordleGrid.css';
import GridRow from './GridRow';
import PopupMessage from './PopupMessage';
import useWordleGameState from '../../hooks/useWordleGameState';
import VirtualKeyboard from '../VirtualKeyboard/VirtualKeyboard';
import wordList from '../../data/wordList.json'; // Import the word list

const WordleGrid = ({ handleVirtualKeyClick, handleKeyProcessed }) => {
  const {
    wordToGuess,
    guesses,
    currentGuess,
    setCurrentGuess,
    currentAttempt,
    popupMessage,
    setPopupMessage, // Use setPopupMessage to show popup messages
    flippingCells,
    handleEnterInternal,
    handleDeleteInternal,
  } = useWordleGameState();

  const [keyStatuses, setKeyStatuses] = useState({});

  const isWordValid = (word) => wordList.includes(word); // Check if the word is in the word list

  const updateKeyStatuses = useCallback((guess) => {
    setKeyStatuses((prevStatuses) => {
      const newStatuses = { ...prevStatuses };
      for (let i = 0; i < guess.length; i++) {
        const guessChar = guess[i];
        if (wordToGuess[i] === guessChar) {
          newStatuses[guessChar] = 'correct';
        } else if (wordToGuess.includes(guessChar)) {
          if (newStatuses[guessChar] !== 'correct') {
            newStatuses[guessChar] = 'present';
          }
        } else {
          if (!newStatuses[guessChar]) {
            newStatuses[guessChar] = 'absent';
          }
        }
      }
      return newStatuses;
    });
  }, [wordToGuess]);

  const handleKeyPress = useCallback(
    (key) => {
      if (key === 'ENTER') {
        if (currentGuess.length === wordToGuess.length) {
          if (isWordValid(currentGuess)) { // Only proceed if the word is valid
            handleEnterInternal();
            updateKeyStatuses(currentGuess); // Only update key statuses after pressing ENTER and validating the word
          } else {
            // Show a popup message that the word is invalid
            setPopupMessage(`"${currentGuess}" bukan kata yang valid`);
          }
        }
      } else if (key === 'BACKSPACE') {
        handleDeleteInternal();
      } else if (/^[A-Z]$/.test(key)) {
        setCurrentGuess((prev) => (prev.length < wordToGuess.length ? prev + key : prev));
      }
    },
    [handleEnterInternal, handleDeleteInternal, setCurrentGuess, currentGuess, wordToGuess, updateKeyStatuses, setPopupMessage]
  );

  useInputHandler(handleKeyPress);

  useEffect(() => {
    if (handleVirtualKeyClick) {
      handleKeyPress(handleVirtualKeyClick);
      handleKeyProcessed();
    }
  }, [handleVirtualKeyClick, handleKeyProcessed, handleKeyPress]); // Added handleKeyPress to dependencies

  return (
    <div className="wordle-container">
      <div className="grid" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        {guesses.map((row, rowIndex) => (
          <GridRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            currentAttempt={currentAttempt}
            currentGuess={rowIndex === currentAttempt ? currentGuess : ''}
            wordToGuess={wordToGuess}
            flippingCells={flippingCells}
            updateKeyStatuses={rowIndex === currentAttempt - 1 ? updateKeyStatuses : undefined} // Only pass updateKeyStatuses for validated guesses
          />
        ))}
      </div>
      {popupMessage && <PopupMessage message={popupMessage} />} {/* Ensure PopupMessage displays correctly */}
      <VirtualKeyboard
        handleKeyClick={handleKeyPress}
        handleEnter={handleEnterInternal}
        handleDelete={handleDeleteInternal}
        gameOver={false}
        keyStatuses={keyStatuses}
      />
    </div>
  );
};

export default WordleGrid;
