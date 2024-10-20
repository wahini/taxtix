// Suggested Directory: ./src/components/VirtualKeyboard/VirtualKeyboard.js

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './VirtualKeyboard.css';

const KeyButton = ({ keyLabel, handleClick, gameOver, keyColor }) => {
  // Unified event handler to handle both touch and click events without duplication
  const handleClickEvent = useCallback((e) => {
    e.preventDefault(); // Prevent any default action for the click or touch
    if (!gameOver) {
      handleClick();
    }
  }, [handleClick, gameOver]);

  const getKeyClass = () => {
    if (keyColor === 'correct') return 'key-button correct';
    if (keyColor === 'present') return 'key-button present'; // Make sure present status is applied if correct is not.
    if (keyColor === 'absent') return 'key-button absent';
    return 'key-button';
  };

  return (
    <button
      className={`${getKeyClass()} ${keyLabel === 'ENTER' ? 'enter-button' : ''}`}
      onClick={handleClickEvent}
      onTouchEnd={(e) => {
        // Handle touchEnd instead of touchStart to avoid triggering the event twice
        e.preventDefault(); // Prevent touch event propagation
        handleClickEvent(e);
      }} // Using touchEnd to ensure that click and touch are not triggered at the same time
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
    if (key === '⌫') {
      handleDelete();
    } else if (key === 'ENTER' || key === '⏎') {
      handleEnter();
    } else {
      handleKeyClick(key);
    }
  }, [handleDelete, handleEnter, handleKeyClick]);

  const getKeyColor = (key) => {
    return keyStatuses && keyStatuses[key] ? keyStatuses[key] : '';
  };

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
