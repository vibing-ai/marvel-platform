import React from 'react';

import { styles } from '../styles';

const TwoColumnImageSlide = ({
  title,
  leftContent,
  rightContent,
  imageUrl,
}) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/800/400';

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>{title}</h2>

        <div style={styles.slide.threeColumnContainer}>
          <div style={styles.slide.column}>
            <h3 style={styles.slide.columnTitle}>{leftContent.title}</h3>
            <ul style={styles.slide.bulletList}>
              {leftContent.bullets.map((bullet, index) => (
                <li key={index} style={styles.slide.bulletItem}>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.slide.column}>
            <h3 style={styles.slide.columnTitle}>{rightContent.title}</h3>
            <ul style={styles.slide.bulletList}>
              {rightContent.bullets.map((bullet, index) => (
                <li key={index} style={styles.slide.bulletItem}>
                  {bullet}
                </li>
              ))}
            </ul>
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

export default TwoColumnImageSlide;
