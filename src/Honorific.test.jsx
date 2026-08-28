import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Honorific from './Honorific';

const honorifics = [
  { title: '___operator', color: 'mediumblue' },
  { title: 'product_guy', color: '#EC5829' },
  { title: '__architect', color: 'dimgray' },
];

describe('Honorific', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('shows the full product_guy title while forcePaused is true', () => {
    render(<Honorific honorifics={honorifics} forcePaused />);
    expect(screen.getByText(/product_guy/)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Still parked on product_guy — no typing while paused.
    expect(screen.getByText(/product_guy/)).toBeInTheDocument();
  });

  test('types the first honorific out character by character when running', async () => {
    // Real timers here: the typewriter chains setTimeouts across React effects,
    // which fake timers don't advance cleanly.
    jest.useRealTimers();
    render(<Honorific honorifics={honorifics} forcePaused={false} />);

    // Leading underscores are stripped; the bare word is typed out over time.
    expect(await screen.findByText(/operator/, {}, { timeout: 3000 })).toBeInTheDocument();
  });

  test('manual pause parks on product_guy and persists across forcePaused toggles', () => {
    const { rerender } = render(
      <Honorific honorifics={honorifics} forcePaused={false} />
    );

    fireEvent.click(screen.getByTitle('Click to pause'));
    expect(screen.getByText(/product_guy/)).toBeInTheDocument();

    rerender(<Honorific honorifics={honorifics} forcePaused />);
    rerender(<Honorific honorifics={honorifics} forcePaused={false} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/product_guy/)).toBeInTheDocument();
  });

  test('does not type until started is true', () => {
    render(<Honorific honorifics={honorifics} started={false} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Nothing has typed out — the honorific waits for the prefix to finish.
    expect(screen.queryByText(/operator/)).not.toBeInTheDocument();
  });

  test('fires onReady once after the first word finishes typing', async () => {
    // Real timers: the typewriter chains setTimeouts across React effects.
    jest.useRealTimers();
    const onReady = jest.fn();
    render(
      <Honorific honorifics={honorifics} started onReady={onReady} />
    );

    await waitFor(() => expect(onReady).toHaveBeenCalledTimes(1), {
      timeout: 3000,
    });
  });
});
