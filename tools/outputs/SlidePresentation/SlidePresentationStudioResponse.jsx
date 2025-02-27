import React from 'react';
import { Grid, Typography, Paper, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

import { 
  TitleSlide, 
  TitleAndBodySlide, 
  TitleAndBulletsSlide, 
  TwoColumnSlide, 
  SectionHeaderSlide,
  TitleAndImageSlide
} from '../components/SlideTemplates';

import { SLIDE_TEMPLATE_TYPES } from '../libs/constants/slideTemplates';

/**
 * Presentation Studio Response component that renders a set of slides
 * based on the response data from the presentation generator tool
 */
const PresentationStudioResponse = () => {
  const { response } = useSelector((state) => state.tools);
  
  // Check if response is available and properly formatted
  if (!response || !Array.isArray(response)) {
    return (
      <Grid container spacing={2} sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">
              No presentation data available.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  const renderSlide = (slide, index) => {
    const { type, data } = slide;
    
    switch(type) {
      case SLIDE_TEMPLATE_TYPES.TITLE:
        return <TitleSlide key={`slide-${index}`} {...data} />;
      case SLIDE_TEMPLATE_TYPES.TITLE_AND_BODY:
        return <TitleAndBodySlide key={`slide-${index}`} {...data} />;
      case SLIDE_TEMPLATE_TYPES.TITLE_AND_BULLETS:
        return <TitleAndBulletsSlide key={`slide-${index}`} {...data} />;
      case SLIDE_TEMPLATE_TYPES.TWO_COLUMN:
        return <TwoColumnSlide key={`slide-${index}`} {...data} />;
      case SLIDE_TEMPLATE_TYPES.SECTION_HEADER:
        return <SectionHeaderSlide key={`slide-${index}`} {...data} />;
      case SLIDE_TEMPLATE_TYPES.TITLE_AND_IMAGE:
        return <TitleAndImageSlide key={`slide-${index}`} {...data} />;
      default:
        return (
          <Paper key={`slide-${index}`} sx={{ padding: '20px', margin: '20px 0' }}>
            <Typography>Unknown slide type: {type}</Typography>
          </Paper>
        );
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Presentation Preview
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '30px' }}>
          The following slides were generated based on your inputs. You can download the presentation or copy individual slides.
        </Typography>
        <Divider sx={{ marginBottom: '30px' }} />
      </Grid>
      
      <Grid item xs={12}>
        {response.map((slide, index) => renderSlide(slide, index))}
      </Grid>
    </Grid>
  );
};

export default PresentationStudioResponse;
