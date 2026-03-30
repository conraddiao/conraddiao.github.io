import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Honorific from './Honorific';

const installRafMock = () => {
  let rafId = 1;
  const callbacks = new Map();

  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
    const id = rafId++;
    callbacks.set(id, cb);
    return id;
  });

  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => {
    callbacks.delete(id);
  });

  return time => {
    const pending = Array.from(callbacks.entries());
    callbacks.clear();
    pending.forEach(([, cb]) => cb(time));
  };
};

describe('Honorific', () => {
  beforeEach(() => {
    jest.spyOn(performance, 'now').mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders product_guy initially when present', () => {
    render(
      <Honorific
        honorifics={[
          { title: 'operator', color: 'mediumblue' },
          { title: 'product_guy', color: '#EC5829' },
          { title: 'architect', color: 'dimgray' },
        ]}
      />
    );

    expect(screen.getByText(/product_guy/)).toBeInTheDocument();
  });

  test('falls back to first honorific when product_guy is missing', () => {
    render(
      <Honorific
        honorifics={[
          { title: 'first_choice', color: 'orchid' },
          { title: 'second_choice', color: 'seagreen' },
        ]}
      />
    );

    expect(screen.getByText(/first_choice/)).toBeInTheDocument();
  });

  test('does not cycle while forcePaused is true', () => {
    const runFrame = installRafMock();
    jest.spyOn(Math, 'random').mockReturnValue(0.99);

    render(
      <Honorific
        honorifics={[
          { title: 'product_guy', color: '#EC5829' },
          { title: 'architect', color: 'dimgray' },
        ]}
        forcePaused
      />
    );

    act(() => {
      runFrame(250);
      runFrame(500);
      runFrame(750);
    });

    expect(screen.getByText(/product_guy/)).toBeInTheDocument();
    expect(screen.queryByText(/architect/)).not.toBeInTheDocument();
  });

  test('cycles while forcePaused is false', () => {
    const runFrame = installRafMock();
    jest.spyOn(Math, 'random').mockReturnValue(0.99);

    render(
      <Honorific
        honorifics={[
          { title: 'product_guy', color: '#EC5829' },
          { title: 'architect', color: 'dimgray' },
        ]}
        forcePaused={false}
      />
    );

    act(() => {
      runFrame(250);
    });

    expect(screen.getByText(/architect/)).toBeInTheDocument();
  });

  test('manual pause persists across forcePaused true to false transition', () => {
    const runFrame = installRafMock();
    jest.spyOn(Math, 'random').mockReturnValue(0.99);

    const { rerender } = render(
      <Honorific
        honorifics={[
          { title: 'product_guy', color: '#EC5829' },
          { title: 'architect', color: 'dimgray' },
        ]}
        forcePaused={false}
      />
    );

    fireEvent.click(screen.getByText(/product_guy/));

    rerender(
      <Honorific
        honorifics={[
          { title: 'product_guy', color: '#EC5829' },
          { title: 'architect', color: 'dimgray' },
        ]}
        forcePaused
      />
    );

    rerender(
      <Honorific
        honorifics={[
          { title: 'product_guy', color: '#EC5829' },
          { title: 'architect', color: 'dimgray' },
        ]}
        forcePaused={false}
      />
    );

    act(() => {
      runFrame(250);
      runFrame(500);
    });

    expect(screen.getByText(/product_guy/)).toBeInTheDocument();
    expect(screen.queryByText(/architect/)).not.toBeInTheDocument();
  });
});
