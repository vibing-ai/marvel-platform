import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Step,
  StepButton,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  useStepContext,
} from '@mui/material';

import styles from './styles';

const StepperConnector = () => {
  const { active, completed } = useStepContext();
  return <StepConnector {...styles.stpConnector(active, completed)} />;
};

const StepIcon = ({ active, completed }) => (
  <Grid {...styles.gridProps}>
    <Grid {...styles.containerProps}>
      {completed ? (
        <Grid {...styles.stepCircleCompleted} />
      ) : (
        <Grid {...styles.getStepCircleStyle(active)} />
      )}
    </Grid>
  </Grid>
);

const ProgressBarStepper = ({ currentStep, onboardingSteps }) => (
  <Stepper
    activeStep={currentStep}
    connector={<StepperConnector />}
    {...styles.stepperProps}
  >
    {onboardingSteps.map((step, index) => (
      <Step key={index}>
        <StepButton>
          <StepLabel StepIconComponent={StepIcon} />
        </StepButton>
      </Step>
    ))}
  </Stepper>
);

const ProgressBarAccordion = ({
  expanded,
  handleChange,
  currentStep,
  onboardingSteps,
}) => (
  <Accordion
    expanded={expanded === 'panel'}
    onChange={handleChange('panel')}
    {...styles.accordionProps}
  >
    <AccordionSummary
      expandIcon={<ExpandMore {...styles.expandMoreProps} />}
      {...styles.accordionSummaryProps}
    >
      <ProgressBarStepper
        currentStep={currentStep}
        onboardingSteps={onboardingSteps}
      />
    </AccordionSummary>
    <AccordionDetails {...styles.accordionDetailsProps}>
      {onboardingSteps.map((step, key) => (
        <Grid key={key} {...styles.accordionDetailsGridProps}>
          <StepIcon
            active={key === currentStep}
            completed={key < currentStep}
          />
          <Typography key={key} {...styles.stepLabelProps}>
            {step.label}
          </Typography>
        </Grid>
      ))}
    </AccordionDetails>
  </Accordion>
);

/**
 * A functional component that renders a checklist for the onboarding process within the progress bar.
 *
 * @param {Object} props - The component props.
 * @param {Boolean} props.expanded - Whether the checklist is expanded.
 * @param {Function} props.handleChange - A callback function to handle changes.
 * @param {Number} props.currentStep - The current step in the onboarding process.
 * @param {Array} props.onboardingSteps - An array of onboarding steps.
 * @return {JSX.Element} The rendered checklist component.
 */
const CheckList = (props) => {
  const { expanded, handleChange, currentStep, onboardingSteps } = props;
  return (
    <ProgressBarAccordion
      expanded={expanded}
      handleChange={handleChange}
      currentStep={currentStep}
      onboardingSteps={onboardingSteps}
    />
  );
};

export default CheckList;
