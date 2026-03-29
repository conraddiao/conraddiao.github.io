import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import GridFeed from './GridFeed.jsx';
import posts from './posts.json';
import honorifics from './honorifics.json';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header id="header" honorifics={honorifics} />
      <GridFeed posts={posts} />
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
