import React from 'react';

import { styles } from '../styles';

const StretchImageSlide = ({ title, caption, imageUrl }) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/1200/800';

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>{title}</h2>

        {/* Use reveal.js r-stretch class with custom styling */}
        <img
          src={imageUrl || defaultImage}
          alt={title}
          className="r-stretch"
          style={styles.slide.stretchImage}
        />

        {caption && <p style={styles.slide.caption}>{caption}</p>}
      </div>
    </article>
  );
};

export default StretchImageSlide;
