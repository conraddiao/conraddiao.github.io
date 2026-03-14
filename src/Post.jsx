import React, { useEffect, useRef, useState } from 'react';
import './Post.css';

// Markdown -> HTML converter supporting links, images, videos, code blocks, inline code, bold, italic
const markdownToHtml = (md) => {
  if (!md) return '';

  const escapeHtml = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const isVideoUrl = (url) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

  const processInline = (escaped) => {
    let t = escaped;
    // Inline code (backticks)
    t = t.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    // Images and videos: ![alt](url)
    t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) =>
      isVideoUrl(url)
        ? `<video src="${url}" controls playsinline></video>`
        : `<img src="${url}" alt="${alt}" loading="lazy">`
    );
    // Links: [text](url)
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // Bold: **text**
    t = t.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    // Italic: *text*
    t = t.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
    return t;
  };

  const html = [];
  // Split out fenced code blocks first so their content is not processed as markdown
  const parts = md.split(/(```(?:\w+)?\n[\s\S]*?```)/g);

  for (const part of parts) {
    const codeBlock = part.match(/^```(\w+)?\n([\s\S]*)```$/);
    if (codeBlock) {
      const lang = codeBlock[1] || '';
      const code = escapeHtml(codeBlock[2]);
      html.push(`<pre><code${lang ? ` class="language-${lang}"` : ''}>${code}</code></pre>`);
    } else {
      const paragraphs = part.split(/\n{2,}/);
      for (const para of paragraphs) {
        const trimmed = para.trim();
        if (!trimmed) continue;
        const content = processInline(escapeHtml(trimmed)).replace(/\n/g, '<br>');
        html.push(`<p>${content}</p>`);
      }
    }
  }

  return html.join('');
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

      <div className="post-copy" dangerouslySetInnerHTML={{ __html: markdownToHtml(post.copy) }} />
    </div>
  );
};

export default Post;
