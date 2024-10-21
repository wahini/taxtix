// Suggested Directory: ./src/App.js

import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import Header from './components/Header/Header';
import WordleGrid from './components/WordleGrid/WordleGrid';
import Footer from './components/Footer/Footer';
import './App.css';
import './styles/global.css';
import useGameLogic from './hooks/useGameLogic';
import useWindowSize from './hooks/useWindowSize';

function App() {
  const {
    gameOver,
    setGameOver,
    virtualKey,
    handleKeyProcessed,
  } = useGameLogic();

  const size = useWindowSize();
  const isCompact = size.width < 400;

  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>TAXTIX - Permainan Tebak Pajak Setiap Hari</title>
          <meta name="description" content="Mainkan TAXTIX - Permainan Kata tentang Pajak. Sebuah permainan yang menyenangkan dan edukatif untuk mempelajari istilah perpajakan sambil bersenang-senang!" />
          <meta name="keywords" content="permainan kata pajak, edukasi pajak, wordle pajak, TAXTIX, permainan belajar pajak, permainan edukatif, pembelajaran keuangan" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Vito Atmo" />
          <meta name="publisher" content="Atmo Intelligence" />
          <html lang="id" />
        </Helmet>
        {/* <Header /> */}
        <main className="main-body">
          {/* <h1>TAXTIX</h1> */}
          <WordleGrid
            handleVirtualKeyClick={virtualKey}
            gameOver={gameOver}
            setGameOver={setGameOver}
            handleKeyProcessed={handleKeyProcessed}
            compact={isCompact} // Pass compact prop to adjust for small screens
          />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
