import React from 'react';
import { Fade, Grid, Typography, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './styles';

/**
 * PresentationGenerator component renders a list of slides with their titles and content.
 * It allows editing, reordering, and generating the presentation.
 */
const PresentationGenerator = () => {
  const { response } = useSelector((state) => state.tools);
  const [slides, setSlides] = React.useState(response?.slides || []);

  // Log the slides to verify the data
  console.log('Slides:', slides);

  // Handle editing of slide title or content
  const handleEditSlide = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = value;
    setSlides(updatedSlides);
  };

  // Handle reordering of slides
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSlides = Array.from(slides);
    const [removed] = reorderedSlides.splice(result.source.index, 1);
    reorderedSlides.splice(result.destination.index, 0, removed);

    setSlides(reorderedSlides);
  };

  // Handle "Generate Presentation" button click
  const handleGeneratePresentation = () => {
    console.log('Generating presentation with slides:', slides);
    // TODO: Save slides to the database or trigger presentation generation
  };

  const renderSlide = (slide, index) => {
    const { title, content } = slide;

    return (
      <Draggable key={`slide-${index}`} draggableId={`slide-${index}`} index={index}>
        {(provided) => (
          <Grid
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...(styles.slideGridProps || {})}
          >
            <Typography {...(styles.slideNumberProps || {})}>
              {index + 1}.
            </Typography>
            <TextField
              value={title}
              onChange={(e) => handleEditSlide(index, 'title', e.target.value)}
              fullWidth
              sx={styles.slideTitleProps?.sx || {}}
              InputProps={{
                sx: {
                  color: styles.slideTitleProps?.color || '#AC92FF',
                  fontFamily: styles.slideTitleProps?.fontFamily || 'Satoshi Bold',
                  fontSize: styles.slideTitleProps?.fontSize || { laptop: '20px', desktop: '24px' },
                },
              }}
            />
            <TextField
              value={content}
              onChange={(e) => handleEditSlide(index, 'content', e.target.value)}
              fullWidth
              multiline
              rows={4}
              sx={styles.slideContentProps?.sx || {}}
              InputProps={{
                sx: {
                  color: styles.slideContentProps?.color || 'white',
                  fontFamily: styles.slideContentProps?.fontFamily || 'Satoshi Regular',
                  fontSize: styles.slideContentProps?.fontSize || { laptop: '16px', desktop: '18px' },
                },
              }}
            />
          </Grid>
        )}
      </Draggable>
    );
  };

  const renderSlides = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="slides">
          {(provided) => (
            <Grid
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...(styles.slidesGridProps || {})}
            >
              {slides.map((slide, index) => renderSlide(slide, index))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <Fade in>
      <Grid {...(styles.mainGridProps || {})}>
        {/* Add the "Presentation Detail" title */}
        <Typography {...styles.presentationTitleProps}>
          Presentation Detail
        </Typography>

        {/* Render the slides */}
        {slides.length > 0 ? renderSlides() : <Typography>No slides available.</Typography>}

        {/* Render the "Generate Presentation" button */}
        <Grid {...styles.actionButtonGridProps}>
          <Button
            onClick={handleGeneratePresentation}
            sx={styles.generateButtonProps?.sx || {}}
          >
            Generate presentation
          </Button>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default PresentationGenerator;