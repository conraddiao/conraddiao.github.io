import { useEffect } from 'react';

const STORAGE_KEY = 'theme';
const THEME_COLORS = { light: '#f7f6f3', dark: '#1b1a18' }; // must match --color-bg

const apply = dark => {
  document.documentElement.classList.toggle('dark', dark);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? THEME_COLORS.dark : THEME_COLORS.light);
};

const isEditable = t => {
  if (!t || !(t instanceof Element)) return false;
  if (t.isContentEditable) return true;
  return Boolean(t.closest('input, textarea, select, [contenteditable]'));
};

// Typing "d" anywhere on the page toggles dark mode by flipping a `dark` class
// on <html>; the choice sticks across visits via localStorage (a pre-paint
// script in index.html restores it before first render, so there's no flash).
// Modifier chords (cmd+d = bookmark), key auto-repeat, IME composition, and
// keystrokes aimed at editable elements are left alone.
const useDarkMode = () => {
  useEffect(() => {
    let stored;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    apply(stored === 'dark');

    // theme-anim must come off only after the fade truly finishes — a fixed
    // timer can fire mid-transition (the class forces a full-page style recalc,
    // so the fade starts a frame or two late) and snap the remaining color
    // change. Key off <html>'s own transitionend, with a generous fallback,
    // and cancel any pending removal when a new toggle restarts the fade.
    let animTimer = null;
    let onAnimEnd = null;
    const startThemeAnim = el => {
      if (animTimer) window.clearTimeout(animTimer);
      if (onAnimEnd) el.removeEventListener('transitionend', onAnimEnd);
      el.classList.add('theme-anim');
      const finish = () => {
        window.clearTimeout(animTimer);
        animTimer = null;
        el.removeEventListener('transitionend', onAnimEnd);
        onAnimEnd = null;
        el.classList.remove('theme-anim');
      };
      onAnimEnd = e => {
        if (e.target === el && e.propertyName === 'background-color') finish();
      };
      el.addEventListener('transitionend', onAnimEnd);
      animTimer = window.setTimeout(finish, 700);
    };

    const onKeyDown = e => {
      if (e.defaultPrevented || e.isComposing || e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key !== 'd' && e.key !== 'D') return;
      if (isEditable(e.composedPath ? e.composedPath()[0] : e.target)) return;

      // Cross-fade only on a real toggle — never on load, where the restored
      // theme must land instantly (theme-anim gates the CSS transitions).
      const el = document.documentElement;
      startThemeAnim(el);

      const dark = !el.classList.contains('dark');
      apply(dark);
      try {
        // 'light' is stored rather than removed so an explicit choice stays
        // distinguishable from "never chose" (e.g. for a future
        // prefers-color-scheme default).
        window.localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
      } catch {
        // private mode etc. — the toggle still works for this visit
      }
    };

    // A toggle in another tab re-applies here so tabs never diverge.
    const onStorage = e => {
      if (e.key === STORAGE_KEY) apply(e.newValue === 'dark');
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('storage', onStorage);
      if (animTimer) window.clearTimeout(animTimer);
      if (onAnimEnd) document.documentElement.removeEventListener('transitionend', onAnimEnd);
      document.documentElement.classList.remove('theme-anim');
    };
  }, []);
};

export default useDarkMode;
