import React, { useEffect, useRef, useState } from 'react';

// Leading underscores in the source data were an alignment gimmick for the old
// flip effect; strip them so the typewriter types the bare word.
const clean = title => (title || '').replace(/^_+/, '');

// "a" / "an" from the first letter of the word.
const articleFor = word => (/^[aeiou]/i.test(word) ? 'an' : 'a');

const getPausedHonorific = honorifics => {
  const productGuy = (honorifics || []).find(h => h.title === 'product guy');
  return {
    title: 'product guy',
    color: (productGuy && productGuy.color) || '#EC5829',
    darkColor: (productGuy && productGuy.darkColor) || '#EC5829',
  };
};

const TYPE_MS = 40; // per character while typing (matches the title Typewriter)
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
  const word = clean(current.title);
  const article = articleFor(word);
  // The whole "a word" / "an word" stream is typed and deleted together, so the
  // caret backspaces the article too before the next word types.
  const fullString = `${article} ${word}`;

  useEffect(() => {
    if (!started || paused) return undefined;

    if (phase === 'typing') {
      if (text.length < fullString.length) {
        timeoutRef.current = setTimeout(
          () => setText(fullString.slice(0, text.length + 1)),
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
        () => setText(fullString.slice(0, text.length - 1)),
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
  }, [started, text, phase, paused, fullString, list.length, index, onReady]);

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

  // Parked state shows the full "a product guy".
  const pausedWord = pausedHonorific.title;
  const pausedFull = `${articleFor(pausedWord)} ${pausedWord}`;
  const shown = paused ? pausedFull : text;
  const shownHonorific = paused ? pausedHonorific : current;

  // Split the shown stream into the plain article ("a "/"an ") and the coloured
  // word so only the word carries the honorific colour.
  const articleLen = (paused ? articleFor(pausedWord) : article).length + 1;
  const articlePart = shown.slice(0, articleLen);
  const wordPart = shown.length > articleLen ? shown.slice(articleLen) : '';

  return (
    <span
      className="honorific"
      onClick={handleClick}
      title={paused ? 'Click to resume' : 'Click to pause'}
    >
      {(started || paused) && (
        <>
          {articlePart}
          {/* Both palettes ride along as custom properties; the CSS picks one
              per theme, so a theme toggle recolors without a re-render. */}
          <span
            className="honorific-word"
            style={{
              '--h-color': shownHonorific.color,
              '--h-color-dark': shownHonorific.darkColor || shownHonorific.color,
            }}
          >
            {wordPart}
          </span>
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
