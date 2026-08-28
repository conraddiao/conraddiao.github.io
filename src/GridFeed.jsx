import React from 'react';
import Post from './Post';
import './GridFeed.css';

const GridFeed = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => {
        const linked = Boolean(post.url);

        const body = (
          <>
            <div className="post-card__head">
              <div className="post-card__titles">
                {post.year && <span className="post-card__year">{post.year}</span>}
                <h3 className="post-card__title">{post.title}</h3>
              </div>
              <div className="post-card__tags">
                {(post.tags || []).map(tag => (
                  <span className="post-card__tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <Post post={post} showYear={false} showTitle={false} linked={linked} />
          </>
        );

        return linked ? (
          <a
            className="post-card post-card--linked"
            href={post.url}
            target="_blank"
            rel="noreferrer"
            data-project-card
            key={post.title}
          >
            {body}
          </a>
        ) : (
          <article className="post-card" key={post.title}>
            {body}
          </article>
        );
      })}
    </div>
  );
};

export default GridFeed;
