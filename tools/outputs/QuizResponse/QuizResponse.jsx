import { Fade, Grid } from '@mui/material';

import { useSelector } from 'react-redux';

import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

import styles from './styles';

/**
 * QuizResponse component renders the response from the quiz tool.
 * It uses the response from the Redux store to display content in a styled grid layout.
 * The component leverages Material-UI's Grid and Fade components for styling and animations.
 *
 * @returns {JSX.Element} The QuizResponse component.
 */
const QuizResponse = () => {

  // Access the current markdown content from the Redux store
  const { content: markdownContent } = useSelector(
    (state) => state.tools.editorState.currentState
  );

  // Render the component with fade-in animation
  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        <Grid {...styles.questionsGridProps}>
          {/* DocumentEditor component displays the markdown content */}
          <DocumentEditor markdownContent={markdownContent} />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default QuizResponse;
