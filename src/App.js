import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Posts from './Posts.jsx';
import posts from './posts.json';
import honorifics from './honorifics.json';

import './App.css';

function App() {  
  return (
    <div className="App">
      <Header id="header" honorifics={honorifics} />
      <Posts posts={posts} />
      <Footer />
    </div>
  );
}

export default App;
