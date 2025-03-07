"use client";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import TitleBodySlide from "./SlideTemplates/TitleBodySlide";
import TitleBulletsSlide from "./SlideTemplates/TitleBulletsSlide";

const Slides = () => {
  const [presentationData, setPresentationData] = useState([]);

  useEffect(() => {
    // Get presentation data from sessionStorage
    const storedData = sessionStorage.getItem("presentationData");
    if (storedData) {
      setPresentationData(JSON.parse(storedData));
    }
  }, []);

  const renderSlide = (slide, index) => {
    // console.log(slide);
    const { template, title, content } = slide;

    switch (template) {
      case "titleBody":
        return <TitleBodySlide key={index} title={title} content={content} />;
      case "titleBullets":
        return (
          <TitleBulletsSlide key={index} title={title} content={content} />
        );
      default:
        return null;
    }
  };

  return (
    <section style={styles.slides.container}>
      {presentationData.map((slide, index) => renderSlide(slide, index))}
    </section>
  );
};

export default Slides;


