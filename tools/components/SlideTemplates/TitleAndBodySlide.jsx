import React from 'react';
import { Grid, Typography } from '@mui/material';
import styles from './styles';

/**
 * Title and Body Slide template with a title and paragraph of text
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Slide title
 * @param {string} props.body - Main paragraph text
 * @param {string} props.branding - Optional branding text
 * @returns {JSX.Element} Title and body slide component
 */
const TitleAndBodySlide = ({ title, body, branding = "Marvel AI" }) => {
  return (
    <Grid sx={styles.slideContainer}>
      <Typography sx={styles.title}>{title}</Typography>
      <Typography sx={styles.bodyText}>{body}</Typography>
      <Typography sx={styles.slideBranding}>{branding}</Typography>
    </Grid>
  );
};

export default TitleAndBodySlide;
