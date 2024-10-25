// ./src/utils/getLetterStatuses.js

function getLetterStatuses(wordToGuess, currentGuess) {
  const letterCount = {};
  const result = Array(currentGuess.length).fill('absent');

  // Track letter counts from the word to guess
  wordToGuess.split('').forEach((letter) => {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  });

  // First pass: Mark correct letters
  currentGuess.split('').forEach((letter, index) => {
    if (wordToGuess[index] === letter) {
      result[index] = 'correct';
      letterCount[letter] -= 1; // Reduce count for correct letter
    }
  });

  // Second pass: Mark present letters only if there are occurrences left
  currentGuess.split('').forEach((letter, index) => {
    if (result[index] !== 'correct' && letterCount[letter] > 0) {
      if (wordToGuess.includes(letter)) {
        result[index] = 'present';
        letterCount[letter] -= 1; // Reduce count for present letter
      }
    }
  });

  return result;
}

export default getLetterStatuses;
