import { Fade, Grid } from '@mui/material';

import { useSelector } from 'react-redux';

import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

import styles from './styles';

/**
 * WorksheetGeneratorResponse component renders the response from the worksheet generator tool.
 * It uses the response from the Redux store to display content in a styled grid layout.
 * The component leverages Material-UI's Grid and Fade components for styling and animations.
 *
 * @returns {JSX.Element} The WorksheetGeneratorResponse component.
 */
const WorksheetGeneratorResponse = () => {
  // Access the current markdown content from the Redux store
  const { content: markdownContent } = useSelector(
    (state) => state.tools.editorState.currentState
  );

  // Render the component with fade-in animation
  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        {/* DocumentEditor component displays the markdown content */}
        <DocumentEditor markdownContent={markdownContent} />
      </Grid>
    </Fade>
  );
};

export default WorksheetGeneratorResponse;
