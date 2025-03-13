'use client';

import React, { useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Slides from './Slides';

const Reveal = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if reveal.js CSS is already loaded
    const revealCssExists = document.querySelector('link[href*="reveal.css"]');
    const revealThemeExists = document.querySelector('link[href*="theme"]');

    // Dynamically load reveal.js CSS if not already loaded
    if (!revealCssExists) {
      const revealCss = document.createElement('link');
      revealCss.rel = 'stylesheet';
      revealCss.href =
        'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css';
      document.head.appendChild(revealCss);
    }

    // Dynamically load a reveal.js theme if not already loaded
    if (!revealThemeExists) {
      const revealTheme = document.createElement('link');
      revealTheme.rel = 'stylesheet';
      revealTheme.href =
        'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/black.min.css';
      document.head.appendChild(revealTheme);
    }

    // You can also add other plugins CSS here if needed
  }, []);

  return (
    <>
      <Head>
        <title>Presentation</title>
        {/* You can also add the CSS links here instead of in useEffect */}
      </Head>

      <div className="presentation-container">
        <Slides />
      </div>
    </>
  );
};

export default Reveal;
