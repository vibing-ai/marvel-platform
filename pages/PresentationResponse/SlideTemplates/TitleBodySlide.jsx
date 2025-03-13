import React from 'react';

import { styles } from '../styles';

const TitleBodySlide = ({ title, content }) => {
  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>{title}</h2>
        <p style={styles.slide.body}>{content[0]}</p>
      </div>
    </article>
  );
};

export default TitleBodySlide;
