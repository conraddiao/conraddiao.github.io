import React from 'react';
import Post from './Post';
import './Posts.css';

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map(post => (
        <Post key={post.title} post={post} />
      ))}
    </div>
  );
};

export default Posts;
