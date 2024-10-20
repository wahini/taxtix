/* ./src/components/WordleGrid/WordleGrid.js */

import React, { useEffect, useCallback } from 'react';
import useInputHandler from '../../utils/InputHandler';
import './WordleGrid.css';
import GridRow from './GridRow';
import PopupMessage from './PopupMessage';
import useWordleGameState from '../../hooks/useWordleGameState';

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

  // Wrap `handleKeyPress` in useCallback to ensure it is memoized
  const handleKeyPress = useCallback((key) => {
    if (key === 'ENTER') {
      handleEnterInternal();
    } else if (key === 'BACKSPACE') {
      handleDeleteInternal();
    } else if (/^[A-Z]$/.test(key)) {
      setCurrentGuess((prev) => (prev.length < 5 ? prev + key : prev));
    }
  }, [handleEnterInternal, handleDeleteInternal, setCurrentGuess]);

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
