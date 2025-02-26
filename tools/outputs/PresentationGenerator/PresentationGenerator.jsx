import { Fade, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import styles from './styles';

/**
 * PresentationGenerator component renders a list of slides with their titles and content.
 * It fetches the presentation data from the Redux store and displays each slide
 * in a styled grid layout. The component uses Material-UI's Grid, Typography, and Fade
 * components for styling and animations.
 */
const PresentationGenerator = () => {
  // Fetch the response from the Redux store
  const { response } = useSelector((state) => state.tools);

  // Log the response to verify its structure
  console.log('Response:', response);

  // Extract slides from the response
  const slides = response?.slides || [];

  // Log the slides to verify the data
  console.log('Slides:', slides);

  const renderSlide = (slide, index) => {
    const { title, content } = slide;

    return (
      <Grid key={`slide-${index}`} {...(styles.slideGridProps || {})}>
        <Typography {...(styles.slideTitleProps || {})}>{title}</Typography>
        <Typography {...(styles.slideContentProps || {})}>{content}</Typography>
      </Grid>
    );
  };

  const renderSlides = () => {
    return (
      <Grid {...(styles.slidesGridProps || {})}>
        {slides.map((slide, index) => renderSlide(slide, index))}
      </Grid>
    );
  };

  return (
    <Fade in>
      <Grid {...(styles.mainGridProps || {})}>
        {slides.length > 0 ? (
          renderSlides()
        ) : (
          <Typography>No slides available.</Typography>
        )}
      </Grid>
    </Fade>
  );
};

export default PresentationGenerator;
