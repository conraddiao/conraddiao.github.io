import React, { useEffect, useState, useRef } from 'react';
const Honorific = ({ honorifics }) => {
  const [title, setTitle] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [paused, setPaused] = useState(false);
  const rafRef = useRef();
  const lastTimeRef = useRef(performance.now());

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

  const handleClick = () => setPaused(p => !p);

  return (
    <span
      style={{
        backgroundColor: bgColor,
        fontFamily: "'IBM Plex Mono', monospace",
        fontStyle: 'normal',
        fontWeight: 200,
        color: 'white',
        cursor: 'pointer',
      }}
      onClick={handleClick}
      title={paused ? 'Click to resume' : 'Click to pause'}
    >
      &nbsp;{title}&nbsp;
    </span>
  );
};

export default Honorific;
