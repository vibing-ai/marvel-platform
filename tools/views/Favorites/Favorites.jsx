import React from 'react';
import { Grid, Typography } from '@mui/material';
import ToolCard from '@/tools/components/ToolCard';
import styles from './styles'; // Replace with the actual path to your stylesheet

const Favorites = ({ favoriteTools, handleToggleFavorite }) => {
  const renderTitle = () => (
    <Grid {...styles.headerGridProps}>
      <Typography {...styles.categoryTitleProps}>
        Favorites {favoriteTools.length > 0 && `(${favoriteTools.length})`}
      </Typography>
    </Grid>
  );

  const renderCards = () => (
    <Grid {...styles.mainGridProps}>
      {favoriteTools.length > 0 ? (
        favoriteTools.map((tool) => (
          <Grid
            item
            key={tool.id}
            xs={12}
            sm={6}
            md={4}
            {...styles.toolDetailsGridProps}
          >
            <ToolCard
              {...tool}
              favorites={favoriteTools}
              handleToggleFavorite={handleToggleFavorite}
            />
          </Grid>
        ))
      ) : (
        <Typography>No favorite tools added yet.</Typography>
      )}
    </Grid>
  );

  return (
    <Grid container direction="column" spacing={2}>
      {renderTitle()}
      {renderCards()}
    </Grid>
  );
};

export default Favorites;
