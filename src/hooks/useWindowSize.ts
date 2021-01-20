import { useState, useEffect } from 'react';

export const useWindowSize = (): number => {
  const [windowSize, setWindowSize] = useState(0);

  function handleResize() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
