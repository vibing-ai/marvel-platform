import { Fade, Grid } from '@mui/material';

import { useSelector } from 'react-redux';

import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

import styles from './styles';

/**
 * Displays the response from the Syllabus Generator tool in a table format.
 *
 * The table has two columns: "Section" and "Details". The "Section" column
 * displays the name of the section, and the "Details" column displays the
 * details of the section.
 *
 * The sections and their details are as follows:
 *
 * - Course Title: The title of the course.
 * - Grade Level: The grade level of the course.
 * - Description: A brief description of the course.
 * - Objectives: The objectives of the course.
 * - Learning Outcomes: The learning outcomes of the course.
 */
const SyllabusGeneratorResponse = () => {
  const { content: markdownContent } = useSelector((state) => state.tools.editorState.currentState);

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        <DocumentEditor markdownContent={markdownContent} />
      </Grid>
    </Fade>
  );
};

export default SyllabusGeneratorResponse;
