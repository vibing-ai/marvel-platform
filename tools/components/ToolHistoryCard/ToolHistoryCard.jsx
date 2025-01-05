import { Button, Card, Grid, Typography } from '@mui/material';
import moment from 'moment';
import Image from "next/image";

import ToolImage from '@/assets/images/BookImage.png';

import styles from './styles';

import { convertToUnixTimestamp } from '@/libs/utils/FirebaseUtils';
import { getToolData } from '@/libs/utils/ToolUtils';

/**
 * Renders a card component displaying information about a tool session.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.data - The data object containing the tool information.
 * @param {function} props.onOpen - Callback function to handle opening the detailed view.
 *
 * @returns {JSX.Element} A React component that renders the tool history card.
 */
const ToolHistoryCard = (props) => {
  const { data, onOpen } = props;

  const toolData = getToolData({
    toolId: data?.toolId,
    item: data,
  });

  const { title, backgroundImgURL, logo, createdAt, description } = toolData;

  const renderImage = () => {
    return (
      (<Grid {...styles.imageGridProps(backgroundImgURL)}>
        <Image
          src={logo || ToolImage}
          alt="tool logo"
          {...styles.imageProps}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </Grid>)
    );
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.dateProps}>
          {moment(convertToUnixTimestamp(createdAt)).format('DD MMM YYYY')}
        </Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
        <Button {...styles.previewButtonProps} onClick={() => onOpen(toolData)}>
          Preview
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Card {...styles.cardProps} elevation={6}>
        <Grid {...styles.toolDetailsGridProps}>
          {renderImage()}
          {renderTitle()}
        </Grid>
      </Card>
    </Grid>
  );
};

export default ToolHistoryCard;
