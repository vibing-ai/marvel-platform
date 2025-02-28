import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

import styles from './styles';

/**
 * PresentationSlides component renders the actual presentation view
 * with navigation controls to move between slides and a sidebar with all slide details
 */
const PresentationSlides = ({ slides, onBackToOutliner }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Navigate to previous slide
  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Navigate to next slide
  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  // Handle selecting a slide from the sidebar
  const handleSlideSelect = (index) => {
    setCurrentSlideIndex(index);
  };

  // Current slide
  const currentSlide = slides[currentSlideIndex] || { title: '', content: '' };

  return (
    <Fade in>
      {/* Main container with forceful style overrides */}
      <Box
        sx={{
          margin: 0,
        }}
      >
        <Grid
          container
          sx={{
            width: '80vw',
            maxWidth: '100%',
            boxSizing: 'border-box',
            paddingLeft: '10px',
            paddingRight: '10px',
            margin: '0 auto',
            display: 'flex',
            background: 'transparent !important',
            border: 'none !important',
          }}
        >
          {/* Header with back button */}
          <Grid
            item
            xs={12}
            {...styles.slideControlsContainer}
            sx={{
              backgroundColor: 'transparent !important',
              border: 'none !important',
              ...(styles.slideControlsContainer?.sx || {}),
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={onBackToOutliner}
              sx={{
                color: styles.slideTitleProps?.color || '#AC92FF',
                backgroundColor: 'transparent !important',
              }}
            >
              Back to Outliner
            </Button>
          </Grid>

          {/* Main content with sidebar and slide view */}
          <Grid
            container
            item
            xs={12}
            sx={{
              minHeight: '80vh',
              width: '100%',
              display: 'flex',
              backgroundColor: 'transparent !important',
              border: 'none !important',
            }}
          >
            {/* Sidebar with all slide details */}
            <Grid
              item
              xs={3}
              sx={{
                backgroundColor: '#1C1233',
                borderRadius: '10px 0 0 10px',
                padding: 2,
                overflowY: 'auto',
                maxHeight: '80vh',
                border: 'none !important',
              }}
            >
              <List>
                {slides.map((slide, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      mb: 1,
                      backgroundColor:
                        currentSlideIndex === index ? '#2A1B4A' : 'transparent',
                      borderRadius: '6px',
                      border: 'none !important',
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleSlideSelect(index)}
                      sx={{
                        borderRadius: '6px',
                        '&:hover': { backgroundColor: '#2A1B4A' },
                        border: 'none !important',
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              color: styles.slideTitleProps?.color || '#AC92FF',
                              fontWeight:
                                currentSlideIndex === index ? 'bold' : 'normal',
                            }}
                          >
                            {`${index + 1}. ${slide.title}`}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{
                              color: styles.slideContentProps?.color || 'white',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {slide.content}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Main slide view */}
            <Grid
              item
              xs={9}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 4,
                backgroundColor: 'transparent !important',
                border: 'none !important',
              }}
            >
              <Typography variant="body1" sx={{ mb: 2 }}>
                Slide {currentSlideIndex + 1} of {slides.length}
              </Typography>

              {/* Slide content */}
              <Box
                sx={{
                  backgroundColor: '#1C1233',
                  borderRadius: '0 10px 10px 0',
                  padding: 4,
                  minHeight: '60vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  mb: 4,
                  width: '100%',
                  border: 'none !important',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    mb: 4,
                    color: styles.slideTitleProps?.color,
                    fontFamily: styles.slideTitleProps?.fontFamily,
                    fontSize: styles.slideTitleProps?.fontSize,
                  }}
                >
                  {currentSlide.title}
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: 'pre-wrap',
                    color: styles.slideContentProps?.color,
                    fontFamily: styles.slideContentProps?.fontFamily,
                    fontSize: styles.slideContentProps?.fontSize,
                  }}
                >
                  {currentSlide.content}
                </Typography>
              </Box>

              {/* Navigation controls */}
              <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={{
                  backgroundColor: 'transparent !important',
                  border: 'none !important',
                }}
              >
                <Grid item>
                  <IconButton
                    onClick={handlePrevSlide}
                    disabled={currentSlideIndex === 0}
                    sx={{
                      color: styles.slideTitleProps?.color,
                      backgroundColor: '#1C1233',
                      '&:hover': { backgroundColor: '#2A1B4A' },
                      '&.Mui-disabled': { color: 'text.disabled' },
                      border: 'none !important',
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={handleNextSlide}
                    disabled={currentSlideIndex === slides.length - 1}
                    sx={{
                      color: styles.slideTitleProps?.color,
                      backgroundColor: '#1C1233',
                      '&:hover': { backgroundColor: '#2A1B4A' },
                      '&.Mui-disabled': { color: 'text.disabled' },
                      border: 'none !important',
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default PresentationSlides;
