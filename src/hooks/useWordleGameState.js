// Updated useWordleGameState.js to integrate win message with number of tries

import { useState, useCallback, useEffect, useRef } from 'react';
import wordListData from '../data/wordList.json';
import wordCluesData from '../data/wordClues.json'; // Import word clues
import messageListData from '../data/messageList.json'; // Import message list for welcome messages

function useWordleGameState() {
  const getRandomWord = useCallback(() => {
    return wordListData[Math.floor(Math.random() * wordListData.length)];
  }, []);

  const getRandomClueForWord = useCallback((word) => {
    const clues = wordCluesData[word];
    if (clues && clues.length > 0) {
      return clues[Math.floor(Math.random() * clues.length)];
    }
    return '';
  }, []);

  const [wordToGuess] = useState(() => getRandomWord());
  const [clueForWord] = useState(() => getRandomClueForWord(wordToGuess)); // Lock the clue for the word
  const [guesses, setGuesses] = useState(Array(6).fill('').map(() => Array(5).fill('')));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [messageKey, setMessageKey] = useState('clue'); // Track which message should be displayed
  const [currentMessage, setCurrentMessage] = useState('');
  const [flippingCells, setFlippingCells] = useState([]);
  const [keyStatuses, setKeyStatuses] = useState({});

  const messageTimeout = useRef(null);

  const getRandomWelcomeMessage = useCallback(() => {
    return messageListData.welcomeMessages[Math.floor(Math.random() * messageListData.welcomeMessages.length)];
  }, []);

  const getRandomMotivationalMessage = useCallback(() => {
    return messageListData.motivationalMessages[Math.floor(Math.random() * messageListData.motivationalMessages.length)];
  }, []);

  // Show a random welcome message, and set the clue as the default message right after
  useEffect(() => {
    const welcomeMessage = getRandomWelcomeMessage();
    setCurrentMessage(welcomeMessage);
    messageTimeout.current = setTimeout(() => {
      setMessageKey('clue'); // Set the message key to clue after the welcome message
      setCurrentMessage(clueForWord);
    }, 1000); // Display the welcome message for 1 second, then show the clue
  }, [clueForWord, getRandomWelcomeMessage]);

  const clearMessage = useCallback(() => {
    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current);
    }
    setCurrentMessage('');
  }, []);

  const setTemporaryMessage = useCallback((message, duration = 1000) => { // Changed duration to 1 second
    clearMessage(); // Clear any previous message before setting a new one
    setCurrentMessage(message);
    setMessageKey('temporary'); // Set message key to temporary to track temporary messages
    messageTimeout.current = setTimeout(() => {
      setMessageKey('clue'); // Revert to clue message after temporary message
      setCurrentMessage(clueForWord);
    }, duration);
  }, [clearMessage, clueForWord]);

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
        setMessageKey('win');
        const winMessages = [
          messageListData.successMessages.correctGuess,
          messageListData.successMessages.winInTries.replace("{tries}", currentAttempt + 1)
        ];
        let currentIndex = 0;

        const showNextMessage = () => {
          if (currentIndex < winMessages.length) {
            setCurrentMessage(winMessages[currentIndex]);
            messageTimeout.current = setTimeout(() => {
              currentIndex++;
              showNextMessage();
            }, 1000); // Set each success message to display for 1 second
          }
        };

        showNextMessage();
      } else if (currentAttempt < 5) {
        setCurrentAttempt((prev) => prev + 1);
        setCurrentGuess('');
        setTemporaryMessage(getRandomMotivationalMessage(), 1000); // Changed duration to 1 second
      } else {
        setMessageKey('lose');
        setCurrentMessage(`${messageListData.endMessages.gameOver} ${wordToGuess}`);
      }
    }, 600);
  }, [currentGuess, currentAttempt, wordToGuess, updateLetterStates, setTemporaryMessage, getRandomMotivationalMessage]);

  const handleDeleteInternal = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1));
    if (messageKey !== 'temporary') {
      setCurrentMessage(clueForWord); // Always show the locked clue if not a temporary message
    }
  }, [clueForWord, messageKey]);

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
