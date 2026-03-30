import React, { useState, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import GridFeed from './GridFeed.jsx';
import posts from './posts.json';
import honorifics from './honorifics.json';

import './App.css';

function App() {
  const [activeTag, setActiveTag] = useState(null);

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

  return (
    <div className="App">
      <Header
        id="header"
        honorifics={honorifics}
        allTags={allTags}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <GridFeed posts={filteredPosts} />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
