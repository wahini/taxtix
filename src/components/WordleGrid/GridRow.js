// ./src/components/WordleGrid/GridRow.js

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import getLetterStatuses from '../../utils/getLetterStatuses';

const GridRow = ({ row, rowIndex, currentAttempt, currentGuess, wordToGuess, flippingCells, updateKeyStatuses }) => {
  useEffect(() => {
    if (updateKeyStatuses && rowIndex === currentAttempt - 1) {
      const statuses = getLetterStatuses(wordToGuess, currentGuess);

      // Update key statuses based on the result
      currentGuess.split('').forEach((letter, index) => {
        updateKeyStatuses(letter, statuses[index]);
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
          status={getLetterStatuses(wordToGuess, currentGuess)[letterIndex]} // Pass the status to the Cell
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
