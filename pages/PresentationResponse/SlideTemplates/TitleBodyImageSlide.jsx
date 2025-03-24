import React from 'react';

import { styles } from '../styles';
import TiptapEditor from '../Tiptap/TiptapEditor';

const TitleBodyImageSlide = ({ title, content, imageUrl }) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/800/400';

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <TiptapEditor editorContent={title} />

        <div style={styles.slide.flexContainer}>
          <div style={styles.slide.textColumn}>
            <p style={styles.slide.body}>
              <TiptapEditor
                editorContent={Array.isArray(content) ? content[0] : content}
              />
              {/* {Array.isArray(content) ? content[0] : content} */}
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
