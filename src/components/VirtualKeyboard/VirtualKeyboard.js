// Suggested Directory: ./src/components/VirtualKeyboard/VirtualKeyboard.js

import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import './VirtualKeyboard.css';

const KeyButton = ({ keyLabel, handleClick, gameOver, keyColor }) => {
  const handleClickEvent = useCallback(() => {
    if (!gameOver) {
      console.log(`Key pressed: ${keyLabel}`); // Debug log for key press
      handleClick();
    }
  }, [handleClick, keyLabel, gameOver]);

  const getKeyClass = () => {
    if (keyColor === 'correct') return 'key-button correct';
    if (keyColor === 'present') return 'key-button present';
    if (keyColor === 'absent') return 'key-button absent';
    return 'key-button';
  };

  useEffect(() => {
    console.log(`Key: ${keyLabel}, Color: ${keyColor}`); // Debug log for key status
  }, [keyLabel, keyColor]);

  return (
    <button
      className={`${getKeyClass()} ${keyLabel === 'ENTER' ? 'enter-button' : ''}`}
      onClick={handleClickEvent}
      disabled={gameOver}
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
  keyColor: PropTypes.string,
};

const VirtualKeyboard = ({ handleKeyClick, handleEnter, handleDelete, gameOver, keyStatuses }) => {
  const keyboardLayout = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['⌫', ...'ZXCVBNM'.split(''), '⏎']
  ];

  const handleClick = useCallback((key) => {
    console.log(`Handle click for key: ${key}`); // Debug log for handling key click
    if (key === 'DELETE') {
      handleDelete();
    } else if (key === 'ENTER') {
      handleEnter();
    } else {
      handleKeyClick(key);
    }
  }, [handleDelete, handleEnter, handleKeyClick]);

  const getKeyColor = (key) => {
    const color = keyStatuses && keyStatuses[key] ? keyStatuses[key] : '';
    console.log(`Key: ${key}, Status: ${color}`); // Debug log to verify each key's status
    return color;
  };

  useEffect(() => {
    console.log('KeyStatuses in VirtualKeyboard:', keyStatuses);
  }, [keyStatuses]);

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
              keyColor={getKeyColor(key)}
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
  keyStatuses: PropTypes.object,
};

export default VirtualKeyboard;

// Next Step: Verify that the `keyStatuses` is correctly applied to the keys
// Use debugging logs to confirm each key's status and ensure the UI reflects these statuses visually.