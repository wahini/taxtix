/* ./src/components/Header/Header.js */

import React, { useState } from 'react';
import './Header.css';

const Header = ({ handleRefresh, setGameMode }) => {
  const [mode, setMode] = useState('Hewan'); // Default mode is 'Hewan'

  const handleModeChange = () => {
    const newMode = mode === 'Hewan' ? 'Pajak' : 'Hewan';
    setMode(newMode);
    if (typeof setGameMode === 'function') {
      setGameMode(newMode); // Update the game mode in the parent component only if the function is provided
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* <h1>Wordle Game - Mode: {mode}</h1> */}
        <button onClick={handleModeChange} className="mode-toggle-button">
          Switch to {mode === 'Hewan' ? 'Pajak' : 'Hewan'}
        </button>
        {/* <button onClick={handleRefresh} className="refresh-button">
          Refresh Game
        </button> */}
      </div>
    </header>
  );
};

export default Header;
