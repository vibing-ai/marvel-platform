import React from 'react';

import { styles } from '../styles';

import TiptapEditor from '../Tiptap/TiptapEditor';

const TitleBodySlide = ({ title, content }) => {
  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <TiptapEditor
          editorContent={`<h2 style={styles.slide.title}>{title}</h2>`}
        />

        {/* <h2 style={styles.slide.title}>{title}</h2> */}
        <p style={styles.slide.body}>{content[0]}</p>
      </div>
    </article>
  );
};

export default TitleBodySlide;
