import { Grid, Typography } from '@mui/material';

import styles from './styles';

import AssistantCard from '@/assistants/components/AssistantCard';

// const DEFAULT_TOOLS = new Array(8)
//   .fill()
//   .map((_, index) => ({ id: index + 1 }));

const AssistantListingContainer = (props) => {
  const { data, category } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.categoryTitleProps}>
          {category} {data && `(${data?.length})`}
        </Typography>
      </Grid>
    );
  };

  const renderCards = () => {
    return (
      <Grid {...styles.containerGridProps}>
        <Grid {...styles.innerListGridProps}>
          <AssistantCard
            name="Assistant 1"
            description="Assistant 1 Description"
          />
          <AssistantCard
            name="Assistant 2"
            description="Assistant 2 Description"
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {renderCards()}
    </Grid>
  );
};

export default AssistantListingContainer;
