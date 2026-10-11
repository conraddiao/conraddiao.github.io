import { render } from '@testing-library/react';
import Post from './Post';

// jsdom has no IntersectionObserver; report every observed element as on screen.
beforeEach(() => {
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      this.callback([{ isIntersecting: true }]);
    }
    disconnect() {}
  };
  window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

const base = { title: 'Care Plans', year: '2024', copy: 'Copy.', images: [] };

test('renders a muted, looping, autoplaying video when a post has one', () => {
  const post = { ...base, video: { src: '/media/demo.mp4', poster: '/media/demo.jpg' } };
  const { container } = render(<Post post={post} />);

  const video = container.querySelector('.post-hero--video video');
  expect(video).not.toBeNull();
  expect(video.getAttribute('src')).toBe('/media/demo.mp4');
  expect(video.getAttribute('poster')).toBe('/media/demo.jpg');
  expect(video.loop).toBe(true);
  expect(video.muted).toBe(true);
  expect(video.autoplay).toBe(true);
  expect(video.hasAttribute('playsinline')).toBe(true);
  expect(video.hasAttribute('controls')).toBe(false);
});

test('shows controls instead of autoplaying when reduced motion is preferred', () => {
  window.matchMedia = jest.fn(() => ({ matches: true }));
  const post = { ...base, video: { src: '/media/demo.mp4', poster: '/media/demo.jpg' } };
  const { container } = render(<Post post={post} />);

  const video = container.querySelector('video');
  expect(video.autoplay).toBe(false);
  expect(video.hasAttribute('controls')).toBe(true);
  delete window.matchMedia;
});

test('keeps the placeholder hero for posts without a video or images', () => {
  const { container } = render(<Post post={base} />);
  expect(container.querySelector('video')).toBeNull();
  expect(container.querySelector('.post-hero--placeholder')).not.toBeNull();
});
