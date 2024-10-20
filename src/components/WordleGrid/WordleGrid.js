/* Suggested Directory: ./src/components/WordleGrid/WordleGrid.js */

import React, { useEffect, useCallback, useState } from 'react';
import useInputHandler from '../../utils/InputHandler';
import './WordleGrid.css';
import GridRow from './GridRow';
import PopupMessage from './PopupMessage';
import useWordleGameState from '../../hooks/useWordleGameState';
import VirtualKeyboard from '../VirtualKeyboard/VirtualKeyboard';

const WordleGrid = ({ handleVirtualKeyClick, handleKeyProcessed }) => {
  const {
    wordToGuess,
    guesses,
    currentGuess,
    setCurrentGuess,
    currentAttempt,
    popupMessage,
    flippingCells,
    handleEnterInternal,
    handleDeleteInternal,
  } = useWordleGameState();

  const [keyStatuses, setKeyStatuses] = useState({});

  const updateKeyStatuses = (letter, status) => {
    setKeyStatuses((prevStatuses) => {
      // Always update to 'correct' if it's correct
      if (status === 'correct') {
        return {
          ...prevStatuses,
          [letter]: 'correct',
        };
      }
      // Update to 'present' only if it hasn't been marked 'correct' before
      if (status === 'present' && prevStatuses[letter] !== 'correct') {
        return {
          ...prevStatuses,
          [letter]: 'present',
        };
      }
      // Update to 'absent' only if it hasn't been marked as 'correct' or 'present'
      if (status === 'absent' && !prevStatuses[letter]) {
        return {
          ...prevStatuses,
          [letter]: 'absent',
        };
      }
      return prevStatuses;
    });
  };

  const handleKeyPress = useCallback((key) => {
    if (key === 'ENTER') {
      handleEnterInternal();
      if (currentGuess.length === wordToGuess.length) {
        // Create a map to track letter counts in wordToGuess
        const letterCount = {};
        wordToGuess.split('').forEach((letter) => {
          letterCount[letter] = (letterCount[letter] || 0) + 1;
        });

        // First pass to mark correct letters
        currentGuess.split('').forEach((letter, index) => {
          if (wordToGuess[index] === letter) {
            updateKeyStatuses(letter, 'correct');
            letterCount[letter] -= 1;
          }
        });

        // Second pass to mark present letters
        currentGuess.split('').forEach((letter, index) => {
          if (wordToGuess[index] !== letter && letterCount[letter] > 0) {
            updateKeyStatuses(letter, 'present');
            letterCount[letter] -= 1;
          } else if (!wordToGuess.includes(letter)) {
            updateKeyStatuses(letter, 'absent');
          }
        });
      }
    } else if (key === 'BACKSPACE') {
      handleDeleteInternal();
    } else if (/^[A-Z]$/.test(key)) {
      setCurrentGuess((prev) => (prev.length < 5 ? prev + key : prev));
    }
  }, [handleEnterInternal, handleDeleteInternal, setCurrentGuess, currentGuess, wordToGuess]);

  useInputHandler(handleKeyPress);

  useEffect(() => {
    if (handleVirtualKeyClick) {
      handleKeyPress(handleVirtualKeyClick);
      handleKeyProcessed();
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
            updateKeyStatuses={updateKeyStatuses}
          />
        ))}
      </div>
      {popupMessage && <PopupMessage message={popupMessage} />}
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
