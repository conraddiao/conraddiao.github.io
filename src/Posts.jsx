import React from 'react';
import Post from './Post';
import './Posts.css';

const Posts = ({ posts }) => {
  const mt = document.getElementById('header').getBoundingClientRect().height;
  console.log(mt);
  return (
    <div className="posts" style={{ marginTop: `${mt}px` }}>
      {posts.map(post => (
        <Post key={post.title} post={post} />
      ))}
    </div>
  );
};

export default Posts;
