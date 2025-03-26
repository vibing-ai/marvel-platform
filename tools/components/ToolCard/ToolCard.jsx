import React from 'react';
import { Grid, Typography, IconButton, Card, Chip } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useRouter } from 'next/router';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import styles from './styles'; // Assuming styles is an object with the necessary styles

import { TOOLS_ID } from '@/tools/libs/constants/tools';

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
const ToolCard = (props) => {
  const {
    id,
    name,
    description,
    maskedToolUrl,
    backgroundImgURL,
    favorites,
    handleToggleFavorite,
  } = props;

  const isPublished =
    TOOLS_ID &&
    typeof TOOLS_ID === 'object' &&
    Object.values(TOOLS_ID).includes(id);

  const router = useRouter();

  const handleRoute = () => {
    if (isPublished) {
      router.push(`/${maskedToolUrl}`);
    }
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.titleProps}>{name}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
      </Grid>
    );
  };

  const renderLabel = () => {
    return (
      <Chip
        icon={isPublished ? <AutoAwesome /> : null}
        {...styles.labelProps(isPublished)}
      />
    );
  };

  return (
    <Grid onClick={handleRoute} {...styles.mainGridProps}>
      <Card {...styles.cardProps(isPublished)}>
        <Grid {...styles.imageProps(backgroundImgURL)} />
        <Grid {...styles.toolDetailsGridProps}>
          {renderTitle()}
            <Grid sx={{ position: 'relative', bottom: 0, right: 100 }}>
            {renderLabel()}
            </Grid>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(id);
            }}
            sx={{ position: 'relative', bottom: 0, right: 0 }}
            >
            {favorites.includes(id) ? (
              <Star sx={{ color: '#9d74ff' }} />
            ) : (
              <StarBorder />
            )}
          </IconButton>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ToolCard;
