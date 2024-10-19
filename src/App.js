// ./src/App.js

import React, { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import WordleGrid from './components/WordleGrid/WordleGrid';
import VirtualKeyboard from './components/VirtualKeyboard/VirtualKeyboard';
import Footer from './components/Footer/Footer';
import './App.css';
import './styles/global.css';

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [virtualKey, setVirtualKey] = useState(null);

  const handleVirtualKeyClick = useCallback((key) => {
    setVirtualKey(key);
  }, []);

  const handleEnter = useCallback(() => {
    if (gameOver) return;
    setVirtualKey('ENTER');  // Trigger virtual key for Enter
  }, [gameOver]);

  const handleDelete = useCallback(() => {
    if (gameOver) return;
    setVirtualKey('BACKSPACE');  // Trigger virtual key for Backspace
  }, [gameOver]);

  return (
    <div className="App">
      <Header />
      <main className="main-body">
        <WordleGrid
          handleVirtualKeyClick={virtualKey}
          gameOver={gameOver}
          setGameOver={setGameOver}
        />
        <VirtualKeyboard
          handleKeyClick={handleVirtualKeyClick}
          handleEnter={handleEnter}
          handleDelete={handleDelete}
          gameOver={gameOver}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
