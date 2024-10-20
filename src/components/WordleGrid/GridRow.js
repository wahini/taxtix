/* ./src/components/WordleGrid/GridRow.js */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

const GridRow = ({ row, rowIndex, currentAttempt, currentGuess, wordToGuess, flippingCells, updateKeyStatuses }) => {
  useEffect(() => {
    if (updateKeyStatuses && rowIndex === currentAttempt - 1) {
      // After completing a guess, update the key statuses
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
  }, [currentAttempt, currentGuess, rowIndex, wordToGuess, updateKeyStatuses]);

  return (
    <div className="row" style={{ display: 'flex', gap: '5px' }}>
      {row.map((letter, letterIndex) => (
        <Cell
          key={letterIndex}
          letter={letter}
          rowIndex={rowIndex}
          letterIndex={letterIndex}
          currentAttempt={currentAttempt}
          currentGuess={currentGuess}
          wordToGuess={wordToGuess}
          flippingCells={flippingCells}
        />
      ))}
    </div>
  );
};

GridRow.propTypes = {
  row: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  currentAttempt: PropTypes.number.isRequired,
  currentGuess: PropTypes.string.isRequired,
  wordToGuess: PropTypes.string.isRequired,
  flippingCells: PropTypes.array.isRequired,
  updateKeyStatuses: PropTypes.func,
};

export default GridRow;
