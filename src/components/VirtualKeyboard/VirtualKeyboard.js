// Suggested Directory: ./src/components/VirtualKeyboard/VirtualKeyboard.js

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import './VirtualKeyboard.css';

const KeyButton = ({ keyLabel, handleClick, gameOver, keyColor }) => {
  const handleClickEvent = useCallback((e) => {
    e.preventDefault();
    if (!gameOver) {
      handleClick();
    }
  }, [handleClick, gameOver]);

  const getKeyClass = () => {
    if (keyColor === 'correct') return 'key-button correct';
    if (keyColor === 'present') return 'key-button present';
    if (keyColor === 'absent') return 'key-button absent';
    return 'key-button';
  };

  return (
    <button
      className={`${getKeyClass()} ${keyLabel === 'ENTER' ? 'enter-button' : ''}`}
      onPointerUp={handleClickEvent} // Replaced onClick and onTouchEnd with onPointerUp
      onClick={handleClickEvent} // Added fallback for onClick in case pointer events aren't consistently handled on certain devices
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

  const handleClick = useCallback(
    debounce((key) => {
      if (key === '⌫') {
        handleDelete();
      } else if (key === 'ENTER' || key === '⏎') {
        handleEnter();
      } else {
        handleKeyClick(key);
      }
    }, 100), // Adjusted debounce timing to 100ms for better responsiveness on mobile
    [handleDelete, handleEnter, handleKeyClick]
  );

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
