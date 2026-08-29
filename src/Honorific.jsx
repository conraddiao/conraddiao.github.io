import React, { useEffect, useRef, useState } from 'react';

// Leading underscores in the source data were an alignment gimmick for the old
// flip effect; strip them so the typewriter types the bare word.
const clean = title => (title || '').replace(/^_+/, '');

const getPausedHonorific = honorifics => {
  const productGuy = (honorifics || []).find(h => h.title === 'product guy');
  return { title: 'product guy', color: (productGuy && productGuy.color) || '#EC5829' };
};

const TYPE_MS = 85; // per character while typing
const DELETE_MS = 40; // per character while backspacing
const HOLD_MS = 2600; // pause once a word is fully typed
const EMPTY_MS = 400; // pause on empty before the next word

// `started` gates the cycle so the rest of the title can type out first; the
// first time a word finishes typing we fire `onReady`. After one full pass
// through the list it lands back on "product guy" and parks there for good.
const Honorific = ({ honorifics = [], forcePaused = false, started = true, onReady }) => {
  const pausedHonorific = getPausedHonorific(honorifics);
  const list = honorifics.length ? honorifics : [pausedHonorific];

  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | deleting
  const [manualPaused, setManualPaused] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);
  const timeoutRef = useRef();
  const readyFiredRef = useRef(false);
  const finalPassRef = useRef(false); // true once the list has wrapped back to product guy

  const paused = forcePaused || manualPaused || autoPaused;
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
        // Full loop complete and we're back on product guy: park here.
        if (finalPassRef.current && index === 0) {
          setAutoPaused(true);
          return undefined;
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
        setIndex(i => {
          const next = (i + 1) % list.length;
          if (next === 0) finalPassRef.current = true; // wrapped → this pass is the last
          return next;
        });
        setPhase('typing');
      }, EMPTY_MS);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [started, text, phase, paused, fullWord, list.length, index, onReady]);

  const handleClick = () => {
    // Clicking a parked honorific resumes a fresh cycle; otherwise toggle pause.
    if (autoPaused) {
      finalPassRef.current = false;
      setAutoPaused(false);
      setManualPaused(false);
      return;
    }
    setManualPaused(p => !p);
  };

  const displayText = paused ? pausedHonorific.title : text;
  const displayColor = paused ? pausedHonorific.color : current.color;

  // "a" / "an" chosen from the current honorific, so it stays correct as the
  // word changes ("an operator", "a ski patroller").
  const activeWord = paused ? pausedHonorific.title : fullWord;
  const article = /^[aeiou]/i.test(activeWord) ? 'an' : 'a';

  return (
    <span
      className="honorific"
      onClick={handleClick}
      title={paused ? 'Click to resume' : 'Click to pause'}
    >
      {(started || paused) && (
        <>
          {article}{' '}
          {/* Color lives on the word only; the article stays normal text color. */}
          <span style={{ color: displayColor }}>{displayText}</span>
        </>
      )}
      {/* Caret blinks while animating; hidden entirely once paused/parked. */}
      {started && !paused && (
        <span className="honorific-caret" aria-hidden="true">|</span>
      )}
    </span>
  );
};

export default Honorific;
