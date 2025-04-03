import { Fade, Grid } from '@mui/material';

import { useSelector } from 'react-redux';

import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

import styles from './styles';

/**
 * FlashCardList component renders a list of flashcards.
 * It uses the response from the Redux store to generate each flashcard,
 * displaying the concept and definition in a styled grid layout.
 * The component leverages Material-UI's Grid, Typography, and Fade components
 * for styling and animations.
 */
const FlashCardList = () => {
  const { content: markdownContent } = useSelector((state) => state.tools.editorState.currentState);

  const renderCards = () => {
    return (
      <Grid {...styles.questionsGridProps}>
        <DocumentEditor markdownContent={markdownContent} />
      </Grid>
    );
  };

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>{renderCards()}</Grid>
    </Fade>
  );
};
export default FlashCardList;
