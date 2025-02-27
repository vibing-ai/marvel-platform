import React from 'react';
import { Fade, Grid, Typography, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UnsavedChangesAlert from '@/tools/components/UnsavedChangesAlert';
import styles from './styles';

/**
 * PresentationGenerator component renders a list of slides with their titles and content.
 * It allows editing, reordering, and generating the presentation.
 */
const PresentationGenerator = () => {
  const { response } = useSelector((state) => state.tools);
  const [slides, setSlides] = React.useState(response?.slides || []);
  const [unsavedChanges, setUnsavedChanges] = React.useState(false);
  const [originalSlides, setOriginalSlides] = React.useState(
    response?.slides || []
  );

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
  };

  // Handle "Generate Presentation" button click
  const handleGeneratePresentation = () => {
    console.log('Generating presentation with slides:', slides);
    // TODO: Save slides to the database or trigger presentation generation
  };

  // Add these new functions after the existing handlers
  const handleAddSlide = () => {
    const newSlide = {
      title: 'New Slide',
      content: 'Add your content here',
    };
    setSlides([...slides, newSlide]);
  };

  const handleRemoveSlide = (index) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
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

  React.useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (unsavedChanges) {
        handleSaveChanges();
      }
    }, 3000); // Autosave after 3 seconds of no changes

    return () => clearTimeout(autoSaveTimer);
  }, [slides, unsavedChanges]);
  // Modify the renderSlide function to include a delete button
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
            {...(styles.slideGridProps || {})}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography {...(styles.slideNumberProps || {})}>
                {index + 1}.
              </Typography>
              <Button
                onClick={() => handleRemoveSlide(index)}
                sx={{
                  minWidth: '30px',
                  color: 'primary.main',
                  '&:hover': { background: 'rgba(133, 116, 255, 0.1)' },
                }}
              >
                ×
              </Button>
            </Grid>
            <TextField
              value={title}
              onChange={(e) => handleEditSlide(index, 'title', e.target.value)}
              fullWidth
              sx={styles.slideTitleProps?.sx || {}}
              InputProps={{
                sx: {
                  color: styles.slideTitleProps?.color || '#AC92FF',
                  fontFamily:
                    styles.slideTitleProps?.fontFamily || 'Satoshi Bold',
                  fontSize: styles.slideTitleProps?.fontSize || {
                    laptop: '20px',
                    desktop: '24px',
                  },
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
              sx={styles.slideContentProps?.sx || {}}
              InputProps={{
                sx: {
                  color: styles.slideContentProps?.color || 'white',
                  fontFamily:
                    styles.slideContentProps?.fontFamily || 'Satoshi Regular',
                  fontSize: styles.slideContentProps?.fontSize || {
                    laptop: '16px',
                    desktop: '18px',
                  },
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

  // Modify the return statement to include the new button
  return (
    <Fade in>
      <Grid {...(styles.mainGridProps || {})}>
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
        <Grid container spacing={2} {...styles.actionButtonGridProps}>
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
              sx={styles.generateButtonProps?.sx || {}}
            >
              Generate presentation
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default PresentationGenerator;
