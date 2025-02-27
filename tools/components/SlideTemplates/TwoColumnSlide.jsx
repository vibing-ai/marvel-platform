import React from 'react';
import { Grid, Typography, List, ListItem } from '@mui/material';
import styles from './styles';

/**
 * Two-Column Slide template with a title and two columns of content
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Slide title
 * @param {Object} props.leftColumn - Left column data
 * @param {string} props.leftColumn.title - Left column title
 * @param {string|Array<string>} props.leftColumn.content - Left column content (text or bullets)
 * @param {Object} props.rightColumn - Right column data
 * @param {string} props.rightColumn.title - Right column title
 * @param {string|Array<string>} props.rightColumn.content - Right column content (text or bullets)
 * @param {string} props.branding - Optional branding text
 * @returns {JSX.Element} Two column slide component
 */
const TwoColumnSlide = ({ title, leftColumn, rightColumn, branding = "Marvel AI" }) => {
  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return (
        <List sx={styles.bulletList}>
          {content.map((item, index) => (
            <ListItem key={index} sx={styles.bulletItem}>
              {item}
            </ListItem>
          ))}
        </List>
      );
    } else {
      return <Typography sx={styles.bodyText}>{content}</Typography>;
    }
  };

  return (
    <Grid sx={styles.slideContainer}>
      <Typography sx={styles.title}>{title}</Typography>
      <Grid sx={styles.columnContainer}>
        <Grid sx={styles.column}>
          <Typography sx={styles.columnTitle}>{leftColumn.title}</Typography>
          {renderContent(leftColumn.content)}
        </Grid>
        <Grid sx={styles.column}>
          <Typography sx={styles.columnTitle}>{rightColumn.title}</Typography>
          {renderContent(rightColumn.content)}
        </Grid>
      </Grid>
      <Typography sx={styles.slideBranding}>{branding}</Typography>
    </Grid>
  );
};

export default TwoColumnSlide;
