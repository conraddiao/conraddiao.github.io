import React from 'react';
import { render, screen } from '@testing-library/react';
import CaseStudy from './CaseStudy';
import caseStudies from './caseStudies';
import posts from './posts.json';

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe('CaseStudy', () => {
  it('renders the care plans study with its sections and decisions', () => {
    render(<CaseStudy study={caseStudies['care-plans']} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Care Plans' })).toBeInTheDocument();
    expect(screen.getByText('The hard calls')).toBeInTheDocument();
    expect(screen.getByText('Which condition do we pilot on?')).toBeInTheDocument();
    expect(document.title).toBe('Care Plans — econr.ad');
  });

  it('shows a not-found message for an unknown slug', () => {
    render(<CaseStudy study={undefined} />);
    expect(screen.getByText("That page doesn't exist.")).toBeInTheDocument();
  });

  it('only references case studies that exist', () => {
    posts
      .filter(post => post.caseStudy)
      .forEach(post => expect(caseStudies[post.caseStudy]).toBeDefined());
  });
});
