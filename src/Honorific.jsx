import React, { useEffect, useRef, useState } from 'react';

// Leading underscores in the source data were an alignment gimmick for the old
// flip effect; strip them so the typewriter types the bare word.
const clean = title => (title || '').replace(/^_+/, '');

const getPausedHonorific = honorifics => {
  const productGuy = (honorifics || []).find(h => h.title === 'product_guy');
  return { title: 'product_guy', color: (productGuy && productGuy.color) || '#EC5829' };
};

const TYPE_MS = 85; // per character while typing
const DELETE_MS = 40; // per character while backspacing
const HOLD_MS = 2600; // pause once a word is fully typed
const EMPTY_MS = 400; // pause on empty before the next word

// `started` gates the cycle so the rest of the title can type out first; the
// first time a word finishes typing we fire `onReady` so the trailing period
// can be revealed.
const Honorific = ({ honorifics = [], forcePaused = false, started = true, onReady }) => {
  const pausedHonorific = getPausedHonorific(honorifics);
  const list = honorifics.length ? honorifics : [pausedHonorific];

  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | deleting
  const [manualPaused, setManualPaused] = useState(false);
  const timeoutRef = useRef();
  const readyFiredRef = useRef(false);

  const paused = forcePaused || manualPaused;
  const current = list[index % list.length];
  const fullWord = clean(current.title);

  useEffect(() => {
    if (!started || paused) return undefined;

    if (phase === 'typing') {
      if (text.length < fullWord.length) {
        timeoutRef.current = setTimeout(
          () => setText(fullWord.slice(0, text.length + 1)),
          TYPE_MS
        );
      } else {
        if (!readyFiredRef.current) {
          readyFiredRef.current = true;
          if (onReady) onReady();
        }
        timeoutRef.current = setTimeout(() => setPhase('deleting'), HOLD_MS);
      }
    } else if (text.length > 0) {
      timeoutRef.current = setTimeout(
        () => setText(fullWord.slice(0, text.length - 1)),
        DELETE_MS
      );
    } else {
      timeoutRef.current = setTimeout(() => {
        setIndex(i => (i + 1) % list.length);
        setPhase('typing');
      }, EMPTY_MS);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [started, text, phase, paused, fullWord, list.length, onReady]);

  const displayText = paused ? pausedHonorific.title : text;
  const displayColor = paused ? pausedHonorific.color : current.color;

  return (
    <span
      className="honorific"
      onClick={() => setManualPaused(p => !p)}
      title={paused ? 'Click to resume' : 'Click to pause'}
    >
      {/* Color lives on the word only, so the caret stays normal text color. */}
      <span style={{ color: displayColor }}>{displayText}</span>
      {(started || paused) && (
        <span className="honorific-caret" aria-hidden="true" data-paused={paused}>
          |
        </span>
      )}
    </span>
  );
};

export default Honorific;
