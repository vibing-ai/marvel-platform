'use client';

import React from 'react';

import Sidebar from './Sidebar';
import Slides from './Slides';
import { styles } from './styles';
import TopBar from './TopBar';

const PresentationResponse = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <main style={styles.app}>
        <TopBar />
        <div style={styles.content}>
          <Sidebar />
          <Slides />
        </div>
      </main>
    </>
  );
};

export default PresentationResponse;
