import React from 'react';

import { styles } from '../styles';

import TiptapEditor from '../Tiptap/TiptapEditor';

const TitleImageSlide = ({ title, subtitle, imageUrl }) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/800/400';

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <TiptapEditor editorContent={title} />
        <TiptapEditor editorContent={subtitle} />

        <div style={styles.slide.imageContainer}>
          <img
            src={imageUrl || defaultImage}
            alt={title}
            style={{ ...styles.slide.image, ...styles.slide.framedImage }}
            className="r-frame" // Use reveal.js frame class
          />
        </div>
      </div>
    </article>
  );
};

export default TitleImageSlide;
