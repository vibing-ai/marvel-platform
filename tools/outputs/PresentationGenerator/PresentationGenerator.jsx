import React, { useState } from 'react';

import { Grid } from '@mui/material';

import PresentationOutliner from '../PresentationOutliner/PresentationOutliner';
import PresentationSlides from '../PresentationSlides/PresentationSlides';

import styles from './styles';

/**
 * PresentationGenerator is the parent component that manages the state and toggles between
 * Outliner and Slides views
 */
const PresentationGenerator = () => {
  const [viewMode, setViewMode] = useState('outliner'); // 'outliner' or 'slides'
  const [slides, setSlides] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [originalSlides, setOriginalSlides] = useState([]);

  // Toggle to slides view and pass the current slides data
  const handleShowSlides = (slidesData) => {
    setSlides(slidesData);
    setViewMode('slides');
  };

  // Go back to outliner view
  const handleBackToOutliner = () => {
    setViewMode('outliner');
  };

  return (
    <Grid {...styles.mainGridProps}>
      {viewMode === 'outliner' ? (
        <PresentationOutliner
          onGeneratePresentation={handleShowSlides}
          slides={slides}
          setSlides={setSlides}
          unsavedChanges={unsavedChanges}
          setUnsavedChanges={setUnsavedChanges}
          originalSlides={originalSlides}
          setOriginalSlides={setOriginalSlides}
        />
      ) : (
        <PresentationSlides
          slides={slides}
          onBackToOutliner={handleBackToOutliner}
        />
      )}
    </Grid>
  );
};

export default PresentationGenerator;
