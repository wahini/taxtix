// Suggested Directory: ./src/utils/InputHandler.js

import { useEffect } from 'react';

const useInputHandler = (handleKeyPress, enablePhysicalKeyboard = true) => {
  useEffect(() => {
    if (!enablePhysicalKeyboard) return;

    const handleKeyboardInput = (event) => {
      const key = event.key.toUpperCase();
      handleKeyPress(key);
    };

    window.addEventListener('keydown', handleKeyboardInput);
    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [handleKeyPress, enablePhysicalKeyboard]);
};

export default useInputHandler;