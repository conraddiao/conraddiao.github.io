
import React, { useEffect, useState } from 'react';
const Honorific = ({ honorifics }) => {
  const [title, setTitle] = useState('');
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (honorifics && honorifics.length) {
        const index = Math.floor(Math.random() * honorifics.length);
        setTitle(honorifics[index].title);
        setBgColor(honorifics[index].color);
      }
    }, 200);

    return () => clearInterval(interval);
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
