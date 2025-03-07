import React from "react";
import { styles } from "../styles";

const TitleBulletsSlide = ({ title, content }) => {
  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>{title}</h2>
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
