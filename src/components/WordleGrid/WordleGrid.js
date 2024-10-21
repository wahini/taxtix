import React, { useEffect, useCallback } from 'react';
import useInputHandler from '../../utils/InputHandler';
import './WordleGrid.css';
import GridRow from './GridRow';
import GameMessageBox from '../GameMessageBox/GameMessageBox';
import useWordleGameState from '../../hooks/useWordleGameState';
import VirtualKeyboard from '../VirtualKeyboard/VirtualKeyboard';

const WordleGrid = ({ handleVirtualKeyClick, handleKeyProcessed }) => {
  const {
    wordToGuess,
    guesses,
    currentGuess,
    setCurrentGuess,
    currentAttempt,
    currentMessage,
    flippingCells,
    handleEnterInternal,
    handleDeleteInternal,
    keyStatuses,
  } = useWordleGameState();

  const handleKeyPress = useCallback(
    (key) => {
      if (key === 'ENTER') {
        handleEnterInternal();
      } else if (key === 'BACKSPACE') {
        handleDeleteInternal();
      } else if (/^[A-Z]$/.test(key)) {
        setCurrentGuess((prev) => (prev.length < wordToGuess.length ? prev + key : prev));
      }
    },
    [handleEnterInternal, handleDeleteInternal, setCurrentGuess, wordToGuess]
  );

  // Enable physical keyboard input only if handleVirtualKeyClick is not used
  useInputHandler(handleKeyPress, !handleVirtualKeyClick);

  useEffect(() => {
    if (handleVirtualKeyClick) {
      handleKeyPress(handleVirtualKeyClick);
      handleKeyProcessed();
    }
  }, [handleVirtualKeyClick, handleKeyProcessed, handleKeyPress]);

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
          />
        ))}
      </div>
      <GameMessageBox message={currentMessage} />
      <VirtualKeyboard
        handleKeyClick={(key) => {
          handleKeyPress(key);
          handleKeyProcessed(); // Ensure the key is marked as processed to avoid double input
        }}
        handleEnter={handleEnterInternal}
        handleDelete={handleDeleteInternal}
        gameOver={false}
        keyStatuses={keyStatuses}
      />
    </div>
  );
};

export default WordleGrid;