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
    if (key !== virtualKey) {
      console.log(`Setting virtual key: ${key}`); // Debug log for state update
      setVirtualKey(key);
    }
  }, [virtualKey]);

  const handleEnter = useCallback(() => {
    if (gameOver) return;
    if (virtualKey !== 'ENTER') {
      setVirtualKey('ENTER');  // Trigger virtual key for Enter
    }
  }, [gameOver, virtualKey]);

  const handleDelete = useCallback(() => {
    if (gameOver) return;
    if (virtualKey !== 'BACKSPACE') {
      setVirtualKey('BACKSPACE');  // Trigger virtual key for Backspace
    }
  }, [gameOver, virtualKey]);

  // Add this function to reset the virtual key after it is processed
  const handleKeyProcessed = useCallback(() => {
    setVirtualKey(null);
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-body">
        <WordleGrid
          handleVirtualKeyClick={virtualKey}
          gameOver={gameOver}
          setGameOver={setGameOver}
          handleKeyProcessed={handleKeyProcessed}  // Pass the new handler to WordleGrid
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
