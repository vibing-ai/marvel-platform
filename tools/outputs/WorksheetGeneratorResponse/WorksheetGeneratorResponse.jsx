import { Fade, Grid } from '@mui/material';

import { useSelector } from 'react-redux';

import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

import styles from './styles';

const WorksheetGeneratorResponse = () => {
  const { content: markdownContent } = useSelector((state) => state.tools.editorState.currentState);

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        <DocumentEditor markdownContent={markdownContent} />
      </Grid>
    </Fade>
  );
};
export default WorksheetGeneratorResponse;
