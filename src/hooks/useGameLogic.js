// /src/hooks/useGameLogic.js
import { useState, useCallback } from 'react';

function useGameLogic() {
  const [gameOver, setGameOver] = useState(false);
  const [virtualKey, setVirtualKey] = useState(null);

  const handleVirtualKeyClick = useCallback((key) => {
    if (key !== virtualKey) {
      console.log(`Setting virtual key: ${key}`);
      setVirtualKey(key);
    }
  }, [virtualKey]);

  const handleEnter = useCallback(() => {
    if (gameOver) return;
    if (virtualKey !== 'ENTER') {
      setVirtualKey('ENTER');
    }
  }, [gameOver, virtualKey]);

  const handleDelete = useCallback(() => {
    if (gameOver) return;
    if (virtualKey !== 'BACKSPACE') {
      setVirtualKey('BACKSPACE');
    }
  }, [gameOver, virtualKey]);

  const handleKeyProcessed = useCallback(() => {
    setVirtualKey(null);
  }, []);

  return {
    gameOver,
    setGameOver,
    virtualKey,
    handleVirtualKeyClick,
    handleEnter,
    handleDelete,
    handleKeyProcessed,
  };
}

export default useGameLogic;
