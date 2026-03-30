import React from 'react';
import Post from './Post';
import './GridFeed.css';

const GridFeed = ({ posts }) => {
  return (
    <div className="grid-feed">
      <div className="timeline">
        {posts.map((post) => (
          <div className="timeline-entry" key={post.title}>
            <div className="timeline-rail">
              <div className="timeline-marker">
                <div className="timeline-pip" />
                <div className="timeline-date">{post.year}</div>
              </div>
            </div>
            <div className="timeline-content">
              <div className="timeline-title-row">
                <h3>{post.title}</h3>
                <div className="timeline-post-tags">
                  {(post.tags || []).map(tag => (
                    <span className="timeline-tag-badge" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <Post post={post} showYear={false} showTitle={false} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridFeed;
