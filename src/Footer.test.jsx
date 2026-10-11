import { render } from '@testing-library/react';
import Footer from './Footer';

test('holds the resting dot hidden until the falling dot lands', () => {
  const { container, rerender } = render(<Footer dot="waiting" />);
  const dot = container.querySelector('.footer-dot');
  expect(dot).not.toBeNull();
  expect(dot.classList.contains('is-landed')).toBe(false);

  rerender(<Footer dot="landed" />);
  expect(container.querySelector('.footer-dot').classList.contains('is-landed')).toBe(true);
});

test('renders no dot on pages without the header animation', () => {
  const { container } = render(<Footer />);
  expect(container.querySelector('.footer-dot')).toBeNull();
});
