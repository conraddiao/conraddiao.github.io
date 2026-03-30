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

  const groupedByYear = useMemo(() => {
    const groups = {};
    filteredPosts.forEach(post => {
      const year = post.year || 'Unknown';
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
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

      {groupedByYear.map(([year, yearPosts]) => (
        <div key={year} className="timeline-year-group">
          <div className="timeline-year-label">{year}</div>
          {yearPosts.map((post, i) => (
            <div className="timeline-entry" key={post.title}>
              <div className="timeline-track">
                <div className="timeline-pip" />
                {i < yearPosts.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-post-tags">
                  {(post.tags || []).map(tag => (
                    <span className="timeline-tag-badge" key={tag}>{tag}</span>
                  ))}
                </div>
                <Post post={post} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridFeed;
