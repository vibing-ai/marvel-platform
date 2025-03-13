import React from 'react';

import { styles } from '../styles';

const TitleBodyImageSlide = ({ title, content, imageUrl }) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/800/400';

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>{title}</h2>

        <div style={styles.slide.flexContainer}>
          <div style={styles.slide.textColumn}>
            <p style={styles.slide.body}>
              {Array.isArray(content) ? content[0] : content}
            </p>
          </div>

          <div style={styles.slide.imageColumn}>
            <img
              src={imageUrl || defaultImage}
              alt={title}
              style={styles.slide.contentImage}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TitleBodyImageSlide;
