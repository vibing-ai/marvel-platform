import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import ToolCard, { ToolCardSkeleton } from '@/tools/components/ToolCard';
import styles from '../ToolsListingContainer/styles'; // Ensure you use similar styles

const ReccomendedForYou = ({ recommendedTools = [], loading }) => {
  const renderTitle = () => (
    <Grid {...styles.headerGridProps}>
      <Typography {...styles.categoryTitleProps}>
        Recommended for You {recommendedTools && `(${recommendedTools.length})`}
      </Typography>
    </Grid>
  );

  const renderCards = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {recommendedTools.length > 0 ? (
          recommendedTools.map((tool) => <ToolCard key={tool.id} {...tool} />)
        ) : (
          <Typography />
        )}
      </Grid>
    </Grid>
  );

  const renderLoader = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ToolCardSkeleton key={index} />
        ))}
      </Grid>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {loading ? renderLoader() : renderCards()}
    </Grid>
  );
};

ReccomendedForYou.propTypes = {
  recommendedTools: PropTypes.array,
  loading: PropTypes.bool,
};

export default ReccomendedForYou;
