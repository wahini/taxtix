// App.js
import React from 'react';
import Header from './components/Header/Header';
import WordleGrid from './components/WordleGrid/WordleGrid';
import VirtualKeyboard from './components/VirtualKeyboard/VirtualKeyboard';
import Footer from './components/Footer/Footer';
import './App.css';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-body">
        <WordleGrid />
        <VirtualKeyboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;