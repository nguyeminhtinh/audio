/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [hasWindow]);

  return windowDimensions;
}

export default useWindowDimensions;
