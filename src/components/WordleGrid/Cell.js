/* Suggested Directory: ./src/components/WordleGrid/Cell.js */

import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ letter, rowIndex, letterIndex, currentAttempt, currentGuess, wordToGuess, flippingCells }) => {
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
};

export default Cell;
