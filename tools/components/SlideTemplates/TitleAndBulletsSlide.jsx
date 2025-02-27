import React from 'react';
import { Grid, Typography, List, ListItem } from '@mui/material';
import styles from './styles';

/**
 * Title and Bullets Slide template with a title and bullet points
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Slide title
 * @param {Array<string>} props.bullets - Array of bullet point texts
 * @param {string} props.branding - Optional branding text
 * @returns {JSX.Element} Title and bullets slide component
 */
const TitleAndBulletsSlide = ({ title, bullets, branding = "Marvel AI" }) => {
  return (
    <Grid sx={styles.slideContainer}>
      <Typography sx={styles.title}>{title}</Typography>
      <List sx={styles.bulletList}>
        {bullets.map((bullet, index) => (
          <ListItem key={index} sx={styles.bulletItem}>
            {bullet}
          </ListItem>
        ))}
      </List>
      <Typography sx={styles.slideBranding}>{branding}</Typography>
    </Grid>
  );
};

export default TitleAndBulletsSlide;
