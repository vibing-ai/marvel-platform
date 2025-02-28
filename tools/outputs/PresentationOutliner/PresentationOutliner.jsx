import React, { useEffect } from 'react';
import { Button, Fade, Grid, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import UnsavedChangesAlert from '@/tools/components/UnsavedChangesAlert';
import styles from './styles';

/**
 * PresentationOutliner component renders a list of slides with their titles and content.
 * It allows editing, reordering, and generating the presentation.
 */
const PresentationOutliner = ({
  onGeneratePresentation,
  slides,
  setSlides,
  unsavedChanges,
  setUnsavedChanges,
  originalSlides,
  setOriginalSlides,
}) => {
  const { response } = useSelector((state) => state.tools);

  // Initialize slides from props or response if available
  useEffect(() => {
    if (slides.length === 0 && response?.slides) {
      setSlides(response.slides);
      setOriginalSlides(response.slides);
    }
  }, [response, slides, setSlides, setOriginalSlides]);

  // Log the slides to verify the data
  console.log('Slides:', slides);

  // Handle editing of slide title or content
  const handleEditSlide = (index, field, value) => {
    const updatedSlides = slides.map((slide, i) => {
      if (i === index) {
        return { ...slide, [field]: value };
      }
      return slide;
    });
    setSlides(updatedSlides);
    setUnsavedChanges(true);
  };

  // Handle reordering of slides
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSlides = Array.from(slides);
    const [removed] = reorderedSlides.splice(result.source.index, 1);
    reorderedSlides.splice(result.destination.index, 0, removed);

    setSlides(reorderedSlides);
    setUnsavedChanges(true);
  };

  // Handle "Generate Presentation" button click
  const handleGeneratePresentation = () => {
    console.log('Generating presentation with slides:', slides);
    onGeneratePresentation(slides); // Call the parent component function to switch view
  };

  const handleAddSlide = () => {
    const newSlide = {
      title: 'New Slide',
      content: 'Add your content here',
    };
    setSlides([...slides, newSlide]);
    setUnsavedChanges(true);
  };

  const handleRemoveSlide = (index) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
    setUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    setOriginalSlides([...slides]);
    setUnsavedChanges(false);
    // TODO: Add API call to save changes
    console.log('Saving changes:', slides);
  };

  const handleRevertChanges = () => {
    setSlides([...originalSlides]);
    setUnsavedChanges(false);
  };

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (unsavedChanges) {
        handleSaveChanges();
      }
    }, 3000); // Autosave after 3 seconds of no changes

    return () => clearTimeout(autoSaveTimer);
  }, [slides, unsavedChanges]);

  // Render individual slide
  const renderSlide = (slide, index) => {
    const { title, content } = slide;

    return (
      <Draggable
        key={`slide-${index}`}
        draggableId={`slide-${index}`}
        index={index}
      >
        {(provided) => (
          <Grid
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...styles.slideGridProps}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography {...styles.slideNumberProps}>{index + 1}.</Typography>
              <Button
                onClick={() => handleRemoveSlide(index)}
                sx={styles.removeButton}
              >
                ×
              </Button>
            </Grid>
            <TextField
              value={title}
              onChange={(e) => handleEditSlide(index, 'title', e.target.value)}
              fullWidth
              sx={styles.slideTitleProps?.sx}
              InputProps={{
                sx: {
                  color: styles.slideTitleProps?.color,
                  fontFamily: styles.slideTitleProps?.fontFamily,
                  fontSize: styles.slideTitleProps?.fontSize,
                },
              }}
            />
            <TextField
              value={content}
              onChange={(e) =>
                handleEditSlide(index, 'content', e.target.value)
              }
              fullWidth
              multiline
              rows={4}
              sx={styles.slideContentProps?.sx}
              InputProps={{
                sx: {
                  color: styles.slideContentProps?.color,
                  fontFamily: styles.slideContentProps?.fontFamily,
                  fontSize: styles.slideContentProps?.fontSize,
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
              {...styles.slidesGridProps}
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
      <Grid container item xs={12} direction="column" width="100%">
        <Typography {...styles.presentationTitleProps}>
          Presentation Detail
        </Typography>

        {/* Show unsaved changes alert */}
        {unsavedChanges && (
          <UnsavedChangesAlert
            onSave={handleSaveChanges}
            onRevert={handleRevertChanges}
          />
        )}

        {/* Render the slides */}
        {slides.length > 0 ? (
          renderSlides()
        ) : (
          <Typography>No slides available.</Typography>
        )}

        {/* Add new control buttons */}
        <Grid {...styles.actionButtonGridProps}>
          <Grid item>
            <Button
              onClick={handleAddSlide}
              sx={{
                ...styles.generateButtonProps?.sx,
                backgroundColor: 'primary.light',
              }}
            >
              Add Slide
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleGeneratePresentation}
              sx={styles.generateButtonProps?.sx}
            >
              Generate presentation
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default PresentationOutliner;
