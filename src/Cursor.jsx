import React, { useEffect, useRef, useState } from 'react';
import './Cursor.css';

const DESKTOP_QUERY = '(min-width: 768px) and (pointer: fine)';

const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Only take over the pointer on desktop with a real mouse.
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('custom-cursor-active');
      return undefined;
    }
    document.documentElement.classList.add('custom-cursor-active');

    const render = () => {
      rafRef.current = null;
      const el = dotRef.current;
      if (el) {
        el.style.transform =
          `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) ` +
          'translate(-50%, -50%)';
      }
    };

    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(render);
    };

    const inCard = node => !!(node && node.closest && node.closest('[data-project-card]'));

    const onOver = e => {
      if (inCard(e.target)) setHovering(true);
    };
    const onOut = e => {
      if (inCard(e.target) && !inCard(e.relatedTarget)) setHovering(false);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const className = [
    'app-cursor',
    hovering ? 'app-cursor--hover' : '',
    visible ? '' : 'app-cursor--hidden',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={dotRef} className={className} aria-hidden="true">
      <span className="app-cursor__label">view project</span>
    </div>
  );
};

export default Cursor;
