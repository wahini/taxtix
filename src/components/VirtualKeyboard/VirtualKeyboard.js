/* ./src/components/VirtualKeyboard/VirtualKeyboard.js */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './VirtualKeyboard.css';

const KeyButton = ({ keyLabel, handleClick, gameOver }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClickEvent = useCallback(() => {
    if (!isDisabled) {
      console.log(`Key pressed: ${keyLabel}`); // Debug log for key press
      handleClick();
      setIsDisabled(true);  // Disable the button temporarily to avoid multiple inputs
      setTimeout(() => {
        setIsDisabled(false); // Re-enable after a short delay
      }, 200); // 200ms delay to prevent multiple rapid clicks
    }
  }, [handleClick, keyLabel, isDisabled]);

  return (
    <button
      className={`key-button ${keyLabel === '⏎' ? 'enter-button' : ''}`}
      onClick={handleClickEvent}
      disabled={gameOver || isDisabled}
      style={{ flex: '1', padding: '15px', maxWidth: '40px', fontSize: '18px', fontWeight: 'bold' }}
    >
      {keyLabel}
    </button>
  );
};

KeyButton.propTypes = {
  keyLabel: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
};

const VirtualKeyboard = ({ handleKeyClick, handleEnter, handleDelete, gameOver }) => {
  const keyboardLayout = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['⌫', ...'ZXCVBNM'.split(''), '⏎']
  ];

  const handleClick = useCallback((key) => {
    console.log(`Handle click for key: ${key}`); // Debug log for handling key click
    if (key === '⌫') {
      handleDelete();
    } else if (key === '⏎') {
      handleEnter();
    } else {
      handleKeyClick(key);
    }
  }, [handleDelete, handleEnter, handleKeyClick]);

  return (
    <div className="keyboard" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row" style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          {row.map((key) => (
            <KeyButton
              key={key}
              keyLabel={key}
              handleClick={() => handleClick(key)}
              gameOver={gameOver}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Prop validation to ensure all required props are provided and correct
VirtualKeyboard.propTypes = {
  handleKeyClick: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
};

export default VirtualKeyboard;
