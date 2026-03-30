import React, { useEffect, useState, useRef } from 'react';

const getDefaultHonorific = honorifics => {
  if (!honorifics || !honorifics.length) {
    return { title: '', color: '' };
  }

  const productGuy = honorifics.find(h => h.title === 'product_guy');
  return productGuy || honorifics[0];
};

const Honorific = ({ honorifics, forcePaused = false }) => {
  const initialHonorific = getDefaultHonorific(honorifics);
  const pausedHonorific = {
    title: 'product_guy',
    color: initialHonorific.color || '#EC5829',
  };
  const [title, setTitle] = useState(initialHonorific.title);
  const [bgColor, setBgColor] = useState(initialHonorific.color);
  const [manualPaused, setManualPaused] = useState(false);
  const rafRef = useRef();
  const lastTimeRef = useRef(performance.now());
  const paused = forcePaused || manualPaused;
  const displayTitle = paused ? pausedHonorific.title : title;
  const displayBgColor = paused ? pausedHonorific.color : bgColor;

  useEffect(() => {
    function tick(now) {
      if (!paused && honorifics && honorifics.length && now - lastTimeRef.current >= 200) {
        const index = Math.floor(Math.random() * honorifics.length);
        setTitle(honorifics[index].title);
        setBgColor(honorifics[index].color);
        lastTimeRef.current = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [honorifics, paused]);

  const handleClick = () => setManualPaused(p => !p);

  return (
    <span
      style={{
        backgroundColor: displayBgColor,
        fontFamily: "'IBM Plex Mono', monospace",
        fontStyle: 'normal',
        fontWeight: 200,
        color: 'white',
        cursor: 'pointer',
      }}
      onClick={handleClick}
      title={paused ? 'Click to resume' : 'Click to pause'}
    >
      &nbsp;{displayTitle}&nbsp;
    </span>
  );
};

export default Honorific;
