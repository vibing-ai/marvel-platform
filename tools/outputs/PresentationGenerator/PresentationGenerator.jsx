import React from 'react';
import { Fade, Grid, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import FileSaver from 'file-saver';
import styles from './styles';

/**
 * PresentationGenerator component renders a list of slides generated from the response data.
 * It fetches the slide data from the Redux store (`tools` slice) and displays each slide
 * with its title, content, and suggestions in a styled grid layout.
 * 
 * The component provides an option to export the slides as a text file using the FileSaver library.
 * Material-UI's Grid, Typography, Fade, and Button components are utilized for styling, 
 * animations, and interactivity.
 */

const PresentationGenerator = () => {
  const { response } = useSelector((state) => state.tools);

  const handleExport = () => {
    if (!response?.list_slides) return;

    const textContent = response.list_slides
      .map(
        (slide, index) =>
          `Slide ${index + 1}\nTitle: ${slide.title}\nContent: ${slide.content}\nSuggestions: ${slide.suggestions || 'None'}\n`
      )
      .join('\n\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'presentation.txt');
  };

  const renderSlides = () => (
    <Grid {...styles.slidesGridProps} container spacing={4}>
      {response?.list_slides?.map((slide, index) => (
        <Grid
          key={`slide-${index}`}
          item
          xs={12}
          sm={6}
          md={4} // Three slides per row on medium screens and above
          sx={{
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            ':hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <Fade in style={{ transitionDelay: `${index * 200}ms` }}>
            <div>
              <Typography {...styles.slideLabelProps}>Slide {index + 1}</Typography>
              <Grid {...styles.slideGridProps}>
                <Typography {...styles.titleProps}>{slide.title}</Typography>
                <Typography {...styles.contentProps}>{slide.content}</Typography>
                {slide.suggestions && (
                  <Typography {...styles.suggestionsProps}>
                    Suggestions: {slide.suggestions}
                  </Typography>
                )}
              </Grid>
            </div>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        {response && renderSlides()}
        {response?.list_slides && (
          <Grid {...styles.exportButtonGridProps}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleExport}
              style={styles.exportButtonStyle}
            >
              Export Slides as Text
            </Button>
          </Grid>
        )}
      </Grid>
    </Fade>
  );
};

export default PresentationGenerator;
