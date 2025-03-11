import { Fade, Grid, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

import styles from './styles';

/**
 * QuizResponse component renders a list of quiz questions and their choices.
 * It fetches the quiz response data from the Redux store and displays each
 * question with its associated choices in a styled grid layout.
 * The component uses Material-UI's Grid, Typography, and Fade components
 * for styling and animations. It includes optional rendering of a title.
 */
const QuizResponse = () => {
  const { response } = useSelector((state) => state.tools);

  const hasTitle = false;

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>No Title</Typography>
      </Grid>
    );
  };

  const renderQuestion = (question, questionNo) => {
    const { choices, question: questionTitle } = question;

    const questionChoices = Array.isArray(choices)
      ? choices
      : Object.values(choices || {});

    return (
      <Grid key={`question-${questionNo}`} {...styles.questionGridProps}>
        <Typography {...styles.questionTitleProps}>
          {questionNo}. {questionTitle}
        </Typography>
        <Grid>
            {Object.entries(question.choices).map(([key, value]) => (
            <Typography key={`${questionNo}-choice-${key}`} {...styles.choiceProps}>
              {key}. {value}
            </Typography>
          ))}
        </Grid>
      </Grid>
    );
  };

  const renderQuestions = () => {
    return (
      <Grid {...styles.questionsGridProps}>
        {response?.map((question, i) => renderQuestion(question, i + 1))}
      </Grid>
    );
  };

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        {hasTitle && renderTitle()}
        {renderQuestions()}
      </Grid>
    </Fade>
  );
};
export default QuizResponse;
