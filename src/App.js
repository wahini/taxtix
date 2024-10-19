import React from 'react';
import Header from './components/Header/Header';
import WordleGrid from './components/WordleGrid/WordleGrid';
import VirtualKeyboard from './components/VirtualKeyboard/VirtualKeyboard';
import Footer from './components/Footer/Footer';
import './App.css';
import './styles/global.css';
import useGameLogic from './hooks/useGameLogic';

function App() {
  const {
    gameOver,
    setGameOver,
    virtualKey,
    handleVirtualKeyClick,
    handleEnter,
    handleDelete,
    handleKeyProcessed,
  } = useGameLogic();

  return (
    <div className="App">
      <Header />
      <main className="main-body">
        <WordleGrid
          handleVirtualKeyClick={virtualKey}
          gameOver={gameOver}
          setGameOver={setGameOver}
          handleKeyProcessed={handleKeyProcessed}
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
