// ./src/utils/InputHandler.js

import { useEffect } from 'react';

const useInputHandler = (handleKeyPress) => {
  useEffect(() => {
    const handleKeyboardInput = (event) => {
      const key = event.key.toUpperCase();
      handleKeyPress(key);
    };

    window.addEventListener('keydown', handleKeyboardInput);
    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [handleKeyPress]);
};

export default useInputHandler;