import React from 'react';

import { styles } from '../styles';
import TiptapEditor from '../Tiptap/TiptapEditor';

const TitleBulletsSlide = ({ title, content }) => {
  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <TiptapEditor editorContent={title} />

        <ul style={styles.slide.bulletList}>
          {content.map((bullet, index) => (
            <li key={index} style={styles.slide.bulletItem}>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default TitleBulletsSlide;
