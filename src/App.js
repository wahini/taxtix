// Suggested Directory: ./src/App.js

import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import WordleGrid from './components/WordleGrid/WordleGrid';
// import VirtualKeyboard from './components/VirtualKeyboard/VirtualKeyboard';
import Footer from './components/Footer/Footer';
import './App.css';
import './styles/global.css';
import useGameLogic from './hooks/useGameLogic';

function App() {
  const {
    gameOver,
    setGameOver,
    virtualKey,
    // handleVirtualKeyClick,
    // handleEnter,
    // handleDelete,
    handleKeyProcessed,
    keyStatuses,
  } = useGameLogic();

  // Debugging to verify keyStatuses before passing to VirtualKeyboard
  useEffect(() => {
    console.log('KeyStatuses in App:', keyStatuses);
  }, [keyStatuses]);

  // Additional Debug Step: Log `keyStatuses` before returning
  console.log('KeyStatuses before rendering VirtualKeyboard:', keyStatuses);

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
        {/* <VirtualKeyboard
          handleKeyClick={handleVirtualKeyClick}
          handleEnter={handleEnter}
          handleDelete={handleDelete}
          gameOver={gameOver}
          keyStatuses={keyStatuses}
        /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;

// Next Step: Verify that `keyStatuses` is properly updated and passed to `VirtualKeyboard`
// Use the debugging logs to confirm if `keyStatuses` contains correct values for each letter and that these statuses reflect correctly in the UI.
