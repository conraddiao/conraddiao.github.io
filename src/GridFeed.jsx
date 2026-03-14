import React, { useState, useMemo } from 'react';
import Post from './Post';
import './GridFeed.css';

const GridFeed = ({ posts }) => {
  const [activeTag, setActiveTag] = useState(null);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    posts.forEach(post => {
      (post.tags || []).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [posts]);

  const filteredPosts = activeTag
    ? posts.filter(post => (post.tags || []).includes(activeTag))
    : posts;

  const groupedByTag = useMemo(() => {
    const groups = {};
    filteredPosts.forEach(post => {
      const tag = (post.tags || ['other'])[0];
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(post);
    });
    return groups;
  }, [filteredPosts]);

  return (
    <div className="grid-feed">
      <div className="grid-feed-filters">
        <button
          className={`grid-feed-tag ${activeTag === null ? 'active' : ''}`}
          onClick={() => setActiveTag(null)}
        >
          all
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`grid-feed-tag ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {Object.entries(groupedByTag).map(([tag, tagPosts]) => (
        <div key={tag} className="grid-feed-section">
          <div className="grid-feed-section-header">
            <span className="grid-feed-section-label">{tag}</span>
            <hr className="grid-feed-divider" />
          </div>
          <div className="grid-feed-grid">
            {tagPosts.map(post => (
              <div key={post.title} className="grid-feed-cell">
                <Post post={post} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridFeed;
