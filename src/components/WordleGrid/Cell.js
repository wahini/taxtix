/* Suggested Directory: ./src/components/WordleGrid/Cell.js */

import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ letter, rowIndex, letterIndex, currentAttempt, currentGuess, wordToGuess, flippingCells }) => {
  const getClassName = () => {
    if (flippingCells.includes(letterIndex) && rowIndex === currentAttempt) {
      return 'flipping';
    } else if (letter) {
      const letterCount = {}; // Track the count of each letter in wordToGuess
      wordToGuess.split('').forEach((char) => {
        letterCount[char] = (letterCount[char] || 0) + 1;
      });
      
      // First pass: check if the letter is in the correct position
      if (wordToGuess[letterIndex] === letter) {
        letterCount[letter] -= 1;
        return 'correct';
      }
      // Second pass: check if the letter is present, but in the wrong position
      else if (wordToGuess.includes(letter) && letterCount[letter] > 0) {
        letterCount[letter] -= 1;
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
      style={{
        flex: 1,
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: className === 'absent' ? 'var(--primary-bg-color)' : '',
        border: className === 'absent' ? '2px solid #3a3a3c' : '',
      }}
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