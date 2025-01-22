import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AssistantCard from './AssistantCard';
import styles from './styles';
import { fetchAssistants } from '@/store/slices/assistantsSlice';

const AssistantsListingContainer = ({ category, currentTab }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.assistants);

  useEffect(() => {
    console.log('AssistantsListingContainer - Dispatching fetchAssistants');
    dispatch(fetchAssistants());
  }, [dispatch]);

  useEffect(() => {
    console.log('AssistantsListingContainer - Data updated:', { data, loading, error });
  }, [data, loading, error]);

  const filteredData = currentTab === 'All' 
    ? data 
    : data.filter(assistant => assistant.groupName === currentTab);

  console.log('AssistantsListingContainer - Filtered data:', { currentTab, filteredData });

  const renderTitle = () => (
    <Grid {...styles.headerGridProps}>
      <Typography {...styles.categoryTitleProps}>
        {category} {filteredData && `(${filteredData.length})`}
      </Typography>
    </Grid>
  );

  const renderCards = () => (
    <Grid {...styles.containerGridProps}>
      <Grid {...styles.innerListGridProps}>
        {filteredData?.map((assistant) => (
          <AssistantCard key={assistant.id} {...assistant} />
        ))}
      </Grid>
    </Grid>
  );

  if (loading) {
    return (
      <Grid {...styles.mainGridProps}>
        <Typography>Loading assistants...</Typography>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid {...styles.mainGridProps}>
        <Typography color="error">Error: {error}</Typography>
      </Grid>
    );
  }

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {renderCards()}
    </Grid>
  );
};

export default AssistantsListingContainer;
