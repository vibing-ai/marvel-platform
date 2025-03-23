import React from 'react';

import { styles } from '../styles';

const TwoColumnImageSlide = ({
  title,
  leftContent = { title: 'Left Column', bullets: [] },
  rightContent = { title: 'Right Column', bullets: [] },
  imageUrl,
}) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/800/400';

  // Ensure we have valid content objects with the required properties
  const leftCol = leftContent || { title: 'Left Column', bullets: [] };
  const rightCol = rightContent || { title: 'Right Column', bullets: [] };
  
  // Ensure bullets are always arrays
  const leftBullets = Array.isArray(leftCol.bullets) ? leftCol.bullets : [];
  const rightBullets = Array.isArray(rightCol.bullets) ? rightCol.bullets : [];

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>{title || 'Two Column Slide'}</h2>

        <div style={styles.slide.threeColumnContainer}>
          <div style={styles.slide.column}>
            <h3 style={styles.slide.columnTitle}>{leftCol.title || 'Left Column'}</h3>
            <ul style={styles.slide.bulletList}>
              {leftBullets.length > 0 ? (
                leftBullets.map((bullet, index) => (
                  <li key={index} style={styles.slide.bulletItem}>
                    {bullet}
                  </li>
                ))
              ) : (
                <li style={styles.slide.bulletItem}>Add content here</li>
              )}
            </ul>
          </div>

          <div style={styles.slide.column}>
            <h3 style={styles.slide.columnTitle}>{rightCol.title || 'Right Column'}</h3>
            <ul style={styles.slide.bulletList}>
              {rightBullets.length > 0 ? (
                rightBullets.map((bullet, index) => (
                  <li key={index} style={styles.slide.bulletItem}>
                    {bullet}
                  </li>
                ))
              ) : (
                <li style={styles.slide.bulletItem}>Add content here</li>
              )}
            </ul>
          </div>

          <div style={styles.slide.imageColumn}>
            <img
              src={imageUrl || defaultImage}
              alt={title || 'Slide image'}
              style={styles.slide.contentImage}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TwoColumnImageSlide;
