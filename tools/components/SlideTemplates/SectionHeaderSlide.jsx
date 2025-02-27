import React from 'react';
import { Grid, Typography } from '@mui/material';
import styles from './styles';

/**
 * Section Header Slide template with a large centered title and optional subtitle
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Optional subtitle
 * @param {string} props.branding - Optional branding text
 * @returns {JSX.Element} Section header slide component
 */
const SectionHeaderSlide = ({ title, subtitle, branding = "Marvel AI" }) => {
  return (
    <Grid sx={{...styles.slideContainer, ...styles.titleSlideContainer}}>
      <Typography sx={styles.sectionHeader}>{title}</Typography>
      {subtitle && <Typography sx={styles.subtitle}>{subtitle}</Typography>}
      <Typography sx={styles.slideBranding}>{branding}</Typography>
    </Grid>
  );
};

export default SectionHeaderSlide;
