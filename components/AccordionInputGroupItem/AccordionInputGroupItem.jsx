import { Edit } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fade,
  Grid,
  Stack,
  useTheme,
} from '@mui/material';

import GradientOutlinedButton from '../GradientOutlinedButton';

import styles from './styles';

/**
 * Creates an AccordionInputGroupItem wrapper component with a title, children, and additional accordion details props.
 *
 * @param {Object} props - An object containing the component's props.
 * @param {string} props.title - The title of the accordion.
 * @param {string} props.description - The description of the accordion.
 * @param {string} props.response - The title of the accordion.
 * @param {boolean} props.open - Whether the accordion is opened.
 * @param {Function} props.toggleOpen - The function to toggle the accordion.
 * @param {JSX.Elemmnt} props.children - The content rendered within the accordion.
 * @param {Object} props.extraAccordionDetailsProps - Additional props to be passed to the AccordionDetails component.
 *
 * @return {JSX.Element} The AccordionInputGroupItem component.
 */
const AccordionInputGroupItem = (props) => {
  const {
    title,
    description,
    children,
    response,
    open,
    toggleOpen,
    extraAccordionDetailsProps,
  } = props;

  const theme = useTheme();
  if (response) return null;

  const renderEditButton = () => {
    return (
      <GradientOutlinedButton
        bgcolor={theme.palette.Common.White['100p']}
        icon={<Edit sx={{ color: theme.palette.primary.main }} />}
        textColor={theme.palette.Greyscale[500]}
        iconPlacement="left"
        onHoverTextColor={theme.palette.Common.White['100p']}
        clickHandler={toggleOpen}
        text={`${open ? 'Hide' : 'Edit'} Prompt`}
        {...styles.outlinedButtonProps}
      />
    );
  };

  const renderSummary = () => {
    return (
      <AccordionSummary
        expandIcon={null}
        id={`${title}-id`}
        {...styles.accordionSummaryProps}
      >
        <Grid {...styles.titleGridProps}>
          <Stack {...styles.stackProps}>
            <Grid {...styles.titleGridProps}>
              {title}
              {response && renderEditButton()}
            </Grid>
            {open && (
              <Grid {...styles.descriptionGridProps}>{description}</Grid>
            )}
          </Stack>
        </Grid>
      </AccordionSummary>
    );
  };

  return (
   <Accordion 
      expanded={open}
      {...(!title && !response && !description
        ? styles.accordianPopoutProps
        : styles.accordianProps
      )}
    >
      {!title && !response && !description ? null : renderSummary()}
      <Fade in>
        <AccordionDetails
          {...styles.accordionDetailsProps(extraAccordionDetailsProps)}
        >
          {children}
        </AccordionDetails>
      </Fade>
    </Accordion>
  );
};

export default AccordionInputGroupItem;
