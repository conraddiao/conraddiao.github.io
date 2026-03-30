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

      <div className="timeline">
        {filteredPosts.map((post) => (
          <div className="timeline-entry" key={post.title}>
            <div className="timeline-rail">
              <div className="timeline-marker">
                <div className="timeline-pip" />
                <div className="timeline-date">{post.year}</div>
              </div>
            </div>
            <div className="timeline-content">
              <div className="timeline-post-tags">
                {(post.tags || []).map(tag => (
                  <span className="timeline-tag-badge" key={tag}>{tag}</span>
                ))}
              </div>
              <Post post={post} showYear={false} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridFeed;
