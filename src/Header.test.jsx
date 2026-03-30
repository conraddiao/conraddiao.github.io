import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock('./Honorific', () => function HonorificMock({ forcePaused }) {
  return (
    <span data-testid="honorific-state">
      {forcePaused ? 'paused' : 'running'}
    </span>
  );
});

describe('Header', () => {
  let rafId;
  let rafCallbacks;

  beforeEach(() => {
    rafId = 1;
    rafCallbacks = new Map();

    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });

    class ResizeObserverMock {
      observe() {}

      disconnect() {}
    }

    window.ResizeObserver = ResizeObserverMock;

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      const id = rafId++;
      rafCallbacks.set(id, cb);
      return id;
    });

    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => {
      rafCallbacks.delete(id);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('pauses honorific while header is collapsed and resumes at top', () => {
    const runFrame = now => {
      const pending = Array.from(rafCallbacks.entries());
      rafCallbacks.clear();
      pending.forEach(([, cb]) => cb(now));
    };

    render(
      <Header
        honorifics={[{ title: 'product_guy', color: '#EC5829' }]}
        allTags={[]}
        activeTag={null}
        setActiveTag={() => {}}
      />
    );

    expect(screen.getByTestId('honorific-state')).toHaveTextContent('running');

    act(() => {
      window.scrollY = 120;
      window.dispatchEvent(new Event('scroll'));
      runFrame(0);
    });

    expect(screen.getByTestId('honorific-state')).toHaveTextContent('paused');

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
      runFrame(16);
    });

    expect(screen.getByTestId('honorific-state')).toHaveTextContent('running');
  });
});
