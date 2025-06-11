
import React, { useEffect, useState, useTransition } from 'react';
const Honorific = ({ honorifics }) => {
  const [title, setTitle] = useState('');
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    let lastTime = performance.now();
    let animationFrame;

    const tick = (now) => {
      if (now - lastTime >= 200) {
        if (honorifics && honorifics.length) {
          const index = Math.floor(Math.random() * honorifics.length);
          setTitle(honorifics[index].title);
          setBgColor(honorifics[index].color);
        }
        lastTime = now;
      }
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [honorifics]);

  return (
    <span
      style={{
        backgroundColor: bgColor,
        fontFamily: "'IBM Plex Mono', monospace",
        fontStyle: 'normal',
        fontWeight: 200,
        color: 'white',
      }}
    >
      &nbsp;{title}&nbsp;
    </span>
  );
};

export default Honorific;
