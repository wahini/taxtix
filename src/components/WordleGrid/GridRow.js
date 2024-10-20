/* ./src/components/WordleGrid/GridRow.js */

import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

const GridRow = ({ row, rowIndex, currentAttempt, currentGuess, wordToGuess, flippingCells, updateKeyStatuses }) => {
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
          updateKeyStatuses={updateKeyStatuses}
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
  updateKeyStatuses: PropTypes.func.isRequired,
};

export default GridRow;