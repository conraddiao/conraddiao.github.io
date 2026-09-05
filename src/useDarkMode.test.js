import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import useDarkMode from './useDarkMode';

const Probe = () => {
  useDarkMode();
  return <input aria-label="probe" />;
};

const pressD = (target = window, options = {}) =>
  fireEvent.keyDown(target, { key: 'd', ...options });

describe('useDarkMode', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
    window.localStorage.clear();
  });

  test('pressing d toggles the dark class on <html>', () => {
    render(<Probe />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    pressD();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    pressD();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('persists the choice and restores it on mount', () => {
    const first = render(<Probe />);
    pressD();
    expect(window.localStorage.getItem('theme')).toBe('dark');
    first.unmount();
    document.documentElement.classList.remove('dark');

    render(<Probe />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('ignores d with a modifier held (cmd+d bookmark etc.)', () => {
    render(<Probe />);

    pressD(window, { metaKey: true });
    pressD(window, { ctrlKey: true });
    pressD(window, { altKey: true });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('ignores d typed into an editable element', () => {
    const { getByLabelText } = render(<Probe />);

    pressD(getByLabelText('probe'));

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('ignores d typed into a textarea or contenteditable element', () => {
    render(<Probe />);

    const textarea = document.createElement('textarea');
    const editable = document.createElement('div');
    Object.defineProperty(editable, 'isContentEditable', { value: true });
    document.body.append(textarea, editable);

    pressD(textarea);
    pressD(editable);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    textarea.remove();
    editable.remove();
  });

  test('ignores keys other than d', () => {
    render(<Probe />);

    pressD(window, { key: 'x' });
    pressD(window, { key: 'Enter' });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('uppercase D (shift / caps lock) also toggles', () => {
    render(<Probe />);

    pressD(window, { key: 'D' });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('persists light when toggled back off', () => {
    render(<Probe />);

    pressD();
    pressD();

    expect(window.localStorage.getItem('theme')).toBe('light');
  });

  test('still toggles for the visit when localStorage throws (private mode)', () => {
    const getItem = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => { throw new Error('denied'); });
    const setItem = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => { throw new Error('denied'); });

    render(<Probe />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    pressD();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    getItem.mockRestore();
    setItem.mockRestore();
  });

  test('stops listening after unmount', () => {
    const { unmount } = render(<Probe />);
    unmount();

    pressD();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('ignores key auto-repeat (held key does not strobe)', () => {
    render(<Probe />);

    pressD(window, { repeat: true });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('follows a toggle made in another tab (storage event)', () => {
    render(<Probe />);

    fireEvent(window, new StorageEvent('storage', { key: 'theme', newValue: 'dark' }));
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent(window, new StorageEvent('storage', { key: 'theme', newValue: 'light' }));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
