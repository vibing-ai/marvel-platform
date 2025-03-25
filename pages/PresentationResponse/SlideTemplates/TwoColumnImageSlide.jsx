import React from 'react';

import { styles } from '../styles';
import TiptapEditor from '../Tiptap/TiptapEditor';

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
        <TiptapEditor editorContent={title} />

        <div style={styles.slide.threeColumnContainer}>
          <div style={styles.slide.column}>
            <TiptapEditor editorContent={leftContent.title} />
            {/* <h3 style={styles.slide.columnTitle}>{leftContent.title}</h3> */}
            <ul style={styles.slide.bulletList}>
              {leftContent.bullets.map((bullet, index) => (
                <li key={index} style={styles.slide.bulletItem}>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.slide.column}>
          <TiptapEditor editorContent={rightContent.title} />
            {/* <h3 style={styles.slide.columnTitle}>{rightContent.title}</h3> */}
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
