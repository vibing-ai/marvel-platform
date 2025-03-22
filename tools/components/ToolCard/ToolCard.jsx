import React from 'react';
import { Grid, Typography, Card, Chip } from '@mui/material';
import { useRouter } from 'next/router';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import styles from './styles'; // Assuming styles is an object with the necessary styles

import { TOOLS_ID } from '@/tools/libs/constants/tools';
import { firestore } from "@/libs/redux/store";
import { useDispatch } from "react-redux";

import  FavoriteButton from '@/tools/components/FavoriteButton'
import { updateToolFrequency} from '@/libs/redux/thunks/user'


/**
 * Returns a Tool Card component.
 * @param {object} props - The props object containing data, category, favorites, and toggle function.
 * @prop {string} props.id - The tool id.
 * @prop {string} props.maskedToolUrl - The masked tool URL used for routing.
 * @prop {string} props.backgroundImgURL - The URL of the background image.
 * @prop {string} props.name - The name of the tool.
 * @prop {string} props.description - The description of the tool.
 * @prop {string} props.favorite - The description of the tool.
 * @param {function} props.handleToggleFavorite - Function to toggle a tool as favorite.
 * @return {JSX.Element} The Tool Card component.
 */
const ToolCard = (props) => {

  const { id, name, description, maskedToolUrl, backgroundImgURL, favorites = [], handleToggleFavorite } = props
  const isPublished =
    TOOLS_ID &&
    typeof TOOLS_ID === 'object' &&
    Object.values(TOOLS_ID).includes(id);

  const router = useRouter();
  const dispatch = useDispatch();
  
  const handleRoute = () => {
    if (isPublished) {
      dispatch(
        updateToolFrequency({ firestore,  toolId:id })
      );
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
            <Typography sx={{ position: 'relative', bottom: 0, right: 100 }}>
            {renderLabel()}
            </Typography>
            <FavoriteButton
              isFavorite={favorites.includes(id)}
              onToggleFavorite={() => handleToggleFavorite(id)}
            />
        </Grid>
      </Card>
    </Grid>
  );
};

export default ToolCard;