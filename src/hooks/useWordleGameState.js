// Suggested Directory: ./src/hooks/useWordleGameState.js

import { useState, useCallback, useEffect, useRef } from 'react';
import wordListData from '../data/wordList.json';
import messageListData from '../data/messageList.json'; // Import message list for welcome messages

function useWordleGameState() {
  const [wordToGuess] = useState(() => getRandomWord());
  const [guesses, setGuesses] = useState(Array(6).fill('').map(() => Array(5).fill('')));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [flippingCells, setFlippingCells] = useState([]);
  const [keyStatuses, setKeyStatuses] = useState({});

  const messageTimeout = useRef(null);

  function getRandomWord() {
    return wordListData[Math.floor(Math.random() * wordListData.length)];
  }

  const getRandomWelcomeMessage = useCallback(() => {
    return messageListData.welcomeMessages[Math.floor(Math.random() * messageListData.welcomeMessages.length)];
  }, []);

  const getRandomMotivationalMessage = useCallback(() => {
    return messageListData.motivationalMessages[Math.floor(Math.random() * messageListData.motivationalMessages.length)];
  }, []);

  // Show a random welcome message when the game starts
  useEffect(() => {
    setCurrentMessage(getRandomWelcomeMessage());
  }, [getRandomWelcomeMessage]);

  const clearMessage = useCallback(() => {
    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current);
    }
    setCurrentMessage('');
  }, []);

  const setTemporaryMessage = useCallback((message, duration = 3000) => {
    clearMessage(); // Clear any previous message before setting a new one
    setCurrentMessage(message);
    messageTimeout.current = setTimeout(() => {
      setCurrentMessage('');
    }, duration);
  }, [clearMessage]);

  const updateLetterStates = useCallback((guess) => {
    setKeyStatuses((prevKeyStatuses) => {
      const newKeyStatuses = { ...prevKeyStatuses };
      const letterCount = {};

      // Create a map to track letter counts in wordToGuess
      wordToGuess.split('').forEach((letter) => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
      });

      // First pass to mark correct letters
      guess.split('').forEach((letter, index) => {
        if (wordToGuess[index] === letter) {
          newKeyStatuses[letter] = 'correct';
          letterCount[letter] -= 1;
        }
      });

      // Second pass to mark present letters
      guess.split('').forEach((letter, index) => {
        if (wordToGuess[index] !== letter && letterCount[letter] > 0) {
          if (newKeyStatuses[letter] !== 'correct') {
            newKeyStatuses[letter] = 'present';
          }
          letterCount[letter] -= 1;
        } else if (!wordToGuess.includes(letter)) {
          newKeyStatuses[letter] = 'absent';
        }
      });

      return newKeyStatuses;
    });
  }, [wordToGuess]);

  const handleEnterInternal = useCallback(() => {
    if (currentGuess.length !== 5) {
      setTemporaryMessage(messageListData.errorMessages.incompleteGuess);
      return;
    }

    if (!wordListData.includes(currentGuess.toUpperCase())) { // Ensure the comparison is case insensitive
      const formattedMessage = messageListData.errorMessages.wordNotFound.replace("{word}", currentGuess);
      setTemporaryMessage(formattedMessage); // Explicitly set the message here
      return;
    }

    setFlippingCells(Array.from({ length: 5 }, (_, i) => i));
    setTimeout(() => {
      setGuesses((prevGuesses) => {
        const newGuesses = [...prevGuesses];
        newGuesses[currentAttempt] = currentGuess.split('');
        return newGuesses;
      });

      setFlippingCells([]);
      updateLetterStates(currentGuess); // Update letter states immediately after a guess

      if (currentGuess === wordToGuess) {
        setTemporaryMessage(messageListData.successMessages.correctGuess);
      } else if (currentAttempt < 5) {
        setCurrentAttempt((prev) => prev + 1);
        setCurrentGuess('');
        setTemporaryMessage(getRandomMotivationalMessage());
      } else {
        setTemporaryMessage(`${messageListData.endMessages.gameOver} ${wordToGuess}`);
      }
    }, 600);
  }, [currentGuess, currentAttempt, wordToGuess, updateLetterStates, setTemporaryMessage, getRandomMotivationalMessage]);

  const handleDeleteInternal = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1));
    clearMessage();
  }, [clearMessage]);

  useEffect(() => {
    return () => {
      // Clear timeout when component unmounts
      if (messageTimeout.current) {
        clearTimeout(messageTimeout.current);
      }
    };
  }, []);

  return {
    wordToGuess,
    guesses,
    currentGuess,
    setCurrentGuess,
    currentAttempt,
    setCurrentAttempt,
    currentMessage,
    flippingCells,
    handleEnterInternal,
    handleDeleteInternal,
    keyStatuses,
    setMessage: setCurrentMessage,
  };
}

export default useWordleGameState;