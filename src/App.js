import React, { useState, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import GridFeed from './GridFeed.jsx';
import CaseStudy from './CaseStudy.jsx';
import caseStudies from './caseStudies';
import Cursor from './Cursor.jsx';
import posts from './posts.json';
import honorifics from './honorifics.json';
import useDarkMode from './useDarkMode';

import './App.css';

// /work/<slug> renders a case study; everything else is the home feed.
// vercel.json already rewrites every path to index.html, so no router needed.
const workMatch = (pathname) => pathname.match(/^\/work\/([\w-]+)\/?$/);

function App() {
  const [activeTag, setActiveTag] = useState(null);
  // The header's falling dot hands off to a dot that lives in the footer.
  const [dotLanded, setDotLanded] = useState(false);
  useDarkMode();

  const allTags = useMemo(() => {
    const tagSet = new Set();
    posts.forEach(post => {
      (post.tags || []).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, []);

  const filteredPosts = activeTag
    ? posts.filter(post => (post.tags || []).includes(activeTag))
    : posts;

  const match = workMatch(window.location.pathname);
  if (match) {
    return (
      <div className="App">
        <CaseStudy study={caseStudies[match[1]]} />
        <Footer />
        <Analytics />
      </div>
    );
  }

  return (
    <div className="App">
      <Header
        id="header"
        honorifics={honorifics}
        allTags={allTags}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        onDotLanded={() => setDotLanded(true)}
      />
      <GridFeed posts={filteredPosts} />
      <Footer dot={dotLanded ? 'landed' : 'waiting'} />
      <Cursor />
      <Analytics />
    </div>
  );
}

export default App;
