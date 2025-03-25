import React from 'react';

import { styles } from '../styles';

import TiptapEditor from '../Tiptap/TiptapEditor';

const TitleBodySlide = ({ title, content }) => {
  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <TiptapEditor editorContent={title} />
        <p style={styles.slide.body}>
          <TiptapEditor editorContent={content[0]} />
        </p>
      </div>
    </article>
  );
};

export default TitleBodySlide;
