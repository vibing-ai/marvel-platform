import React from 'react';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import styles from './styles';

/**
 * Title and Image Slide template with a title and an image
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Slide title
 * @param {string} props.imageUrl - URL of the image
 * @param {string} props.imageAlt - Alt text for the image
 * @param {string} props.caption - Optional image caption
 * @param {string} props.branding - Optional branding text
 * @returns {JSX.Element} Title and image slide component
 */
const TitleAndImageSlide = ({ title, imageUrl, imageAlt, caption, branding = "Marvel AI" }) => {
  return (
    <Grid sx={styles.slideContainer}>
      <Typography sx={styles.title}>{title}</Typography>
      <Grid sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '60%',
        margin: '20px 0'
      }}>
        {imageUrl ? (
          <>
            <Image 
              src={imageUrl}
              alt={imageAlt || title}
              layout="fill"
              objectFit="contain"
            />
            {caption && (
              <Typography sx={{
                position: 'absolute',
                bottom: '-30px',
                fontFamily: 'Satoshi Regular',
                fontSize: '16px',
                fontStyle: 'italic',
                color: '#555',
                textAlign: 'center'
              }}>
                {caption}
              </Typography>
            )}
          </>
        ) : (
          <Grid sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px'
          }}>
            <Typography sx={{ color: '#888' }}>
              Image placeholder
            </Typography>
          </Grid>
        )}
      </Grid>
      <Typography sx={styles.slideBranding}>{branding}</Typography>
    </Grid>
  );
};

export default TitleAndImageSlide;
