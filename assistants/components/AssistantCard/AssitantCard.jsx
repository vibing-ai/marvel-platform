import { AutoAwesome } from '@mui/icons-material';
import { Card, Chip, Grid, Typography } from '@mui/material';

import { useRouter } from 'next/router';

import styles from './styles';

/**
 * Returns a Tool Card component with an image and a chip displaying the amount of coins.
 *
 * @prop {string} id - The tool id.
 * @prop {string} maskedToolUrl - The masked tool URL used for routing.
 * @prop {string} backgroundImgURL - The URL of the background image.
 * @prop {string} name - The name of the tool.
 * @prop {string} description - The description of the tool.
 *
 * @return {JSX.Element} The Tool Card component.
 */
const AssistantCard = (props) => {
  const { backgroundImgURL, name, description } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.titleProps}>{name}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
      </Grid>
    );
  };

  const renderLabel = () => {
    return <Chip icon={<AutoAwesome />} />;
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Card>
        <Grid {...styles.imageProps(backgroundImgURL)} />
        <Grid {...styles.toolDetailsGridProps}>
          {renderTitle()}
          {renderLabel()}
        </Grid>
      </Card>
    </Grid>
  );
};

export default AssistantCard;
