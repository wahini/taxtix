// Suggested Directory: ./src/utils/InputHandler.js

import { useEffect } from 'react';

const useInputHandler = (handleKeyPress, enablePhysicalKeyboard = true) => {
  useEffect(() => {
    if (!enablePhysicalKeyboard) return;

    const handleKeyboardInput = (event) => {
      const key = event.key.toUpperCase();
      // Check for valid input keys (A-Z and special keys like Enter, Backspace)
      if (/^[A-Z]$/.test(key) || key === 'ENTER' || key === 'BACKSPACE') {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyboardInput);
    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [handleKeyPress, enablePhysicalKeyboard]);
};

export default useInputHandler;
