/* ./src/components/WordleGrid/Cell.js */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Cell = ({ letter, rowIndex, letterIndex, currentAttempt, currentGuess, wordToGuess, flippingCells, updateKeyStatuses }) => {
  const getClassName = () => {
    if (flippingCells.includes(letterIndex) && rowIndex === currentAttempt) {
      return 'flipping';
    } else if (letter) {
      if (wordToGuess[letterIndex] === letter) {
        return 'correct';
      } else if (wordToGuess.includes(letter)) {
        return 'present';
      } else {
        return 'absent';
      }
    }
    return '';
  };

  const className = getClassName();

  useEffect(() => {
    if (className && rowIndex < currentAttempt) {
      updateKeyStatuses(letter, className);
    }
  }, [className, letter, rowIndex, currentAttempt, updateKeyStatuses]);

  return (
    <div
      className={`cell ${className}`}
      style={{ flex: 1, height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {rowIndex === currentAttempt && letterIndex < currentGuess.length
        ? currentGuess[letterIndex]
        : letter}
    </div>
  );
};

Cell.propTypes = {
  letter: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired,
  letterIndex: PropTypes.number.isRequired,
  currentAttempt: PropTypes.number.isRequired,
  currentGuess: PropTypes.string.isRequired,
  wordToGuess: PropTypes.string.isRequired,
  flippingCells: PropTypes.array.isRequired,
  updateKeyStatuses: PropTypes.func.isRequired,
};

export default Cell;