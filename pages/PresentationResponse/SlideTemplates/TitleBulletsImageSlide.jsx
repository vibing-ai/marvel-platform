import React from 'react';

import { styles } from '../styles';
import TiptapEditor from '../Tiptap/TiptapEditor';

const TitleBulletsImageSlide = ({ title, content, imageUrl }) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/800/400';

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <TiptapEditor editorContent={title} />

        <div style={styles.slide.flexContainer}>
          <div style={styles.slide.textColumn}>
            <ul style={styles.slide.bulletList}>
              {content.map((bullet, index) => (
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
              className="r-frame"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TitleBulletsImageSlide;
