import React from 'react';
import { Grid, Typography } from '@mui/material';
import styles from './styles';

/**
 * Title Slide template with a main title and optional subtitle
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Main slide title
 * @param {string} props.subtitle - Optional subtitle
 * @param {string} props.branding - Optional branding text
 * @returns {JSX.Element} Title slide component
 */
const TitleSlide = ({ title, subtitle, branding = "Marvel AI" }) => {
  return (
    <Grid sx={{...styles.slideContainer, ...styles.titleSlideContainer}}>
      <Typography sx={styles.title}>{title}</Typography>
      {subtitle && <Typography sx={styles.subtitle}>{subtitle}</Typography>}
      <Typography sx={styles.slideBranding}>{branding}</Typography>
    </Grid>
  );
};

export default TitleSlide;
