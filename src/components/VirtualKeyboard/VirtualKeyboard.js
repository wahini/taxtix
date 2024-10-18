/* ./src/components/VirtualKeyboard/VirtualKeyboard.js */

import React from 'react';
import './VirtualKeyboard.css';

const VirtualKeyboard = ({ handleKeyClick, handleEnter, handleDelete, gameOver }) => {
  const keyboardLayout = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['⌫', ...'ZXCVBNM'.split(''), '⏎']
  ];

  return (
    <div className="keyboard" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row" style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          {row.map((key) => (
            <button
              key={key}
              className={`key-button ${key === '⏎' ? 'enter-button' : ''}`}
              onClick={() => key === '⌫' ? handleDelete() : key === '⏎' ? handleEnter() : handleKeyClick(key)}
              disabled={gameOver}
              style={{ flex: '1', padding: '15px', maxWidth: '40px', fontSize: '18px', fontWeight: 'bold' }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
