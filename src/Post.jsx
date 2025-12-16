import React, { useEffect, useRef, useState } from 'react';
import './Post.css';

// Minimal markdown -> HTML converter to support basic markdown in posts.json (links, newlines, paragraphs)
const markdownToHtml = (md) => {
  if (!md) return '';
  const escapeHtml = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  let text = escapeHtml(md);
  // convert markdown links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // paragraphs (double newline) and single newlines -> <br>
  text = '<p>' + text.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
  return text;
};

const Post = ({ post }) => {
  const containerRef = useRef(null);
  const paginationRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isDesktop = () => window.innerWidth >= 768;

  useEffect(() => {
    const container = containerRef.current;
    const dots = paginationRef.current?.children;

    if (!container || !dots) return;

    let checking = false;

    const onScroll = () => {
      if (!checking) {
        checking = true;
        setTimeout(() => {
          const index = Math.floor(container.scrollLeft / container.clientWidth);
          setActiveIndex(index);
          checking = false;
        }, 100);
      }
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const handleDotClick = (index) => {
    if (!isDesktop()) return;
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        left: index * container.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="post" id={`p-${post.id}`}>
      <h3>
        {post.title}, <span className="postDate">{post.year}.</span>
      </h3>

      {post.images && post.images.length > 0 && (
        <>
          <div
            className="container mandatory-scroll-snapping"
            dir="ltr"
            ref={containerRef}
          >
            {post.images.map((image, index) => (
              <div className="post-image" key={index}>
                <img src={image} alt="" loading="lazy" />
              </div>
            ))}
          </div>

          <div className="pagination" ref={paginationRef}>
            {post.images.map((_, i) => (
              <span
                className="pagination-icon"
                key={i}
                style={{
                  backgroundColor: i === activeIndex ? 'var(--color-accent)' : 'darkgray',
                }}
                onClick={() => handleDotClick(i)}
              ></span>
            ))}
          </div>
        </>
      )}

      <p dangerouslySetInnerHTML={{ __html: markdownToHtml(post.copy) }} />
    </div>
  );
};

export default Post;
