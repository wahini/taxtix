// ./src/App.js

import React, { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import WordleGrid from './components/WordleGrid/WordleGrid';
import VirtualKeyboard from './components/VirtualKeyboard/VirtualKeyboard';
import Footer from './components/Footer/Footer';
import './App.css';
import './styles/global.css';

function App() {
  const [virtualKey, setVirtualKey] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleKeyPress = useCallback((key) => {
    setVirtualKey(key);
  }, []);

  const handleVirtualKeyClick = useCallback((key) => {
    handleKeyPress(key);
  }, [handleKeyPress]);

  const handleEnter = useCallback(() => {
    // Handle the game over state
    if (gameOver) return;
    setGameOver(true); // Example of how you might handle the game ending
  }, [gameOver]);

  const handleDelete = useCallback(() => {
    if (gameOver) return;
    // Handle deletion logic here
  }, [gameOver]);

  return (
    <div className="App">
      <Header />
      <main className="main-body">
        <WordleGrid
          handleVirtualKeyClick={virtualKey}
          handleEnter={handleEnter}
          handleDelete={handleDelete}
          gameOver={gameOver}
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
