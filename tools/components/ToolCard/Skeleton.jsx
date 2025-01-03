import { Grid, Skeleton } from '@mui/material';

import styles from './styles';

/**
 * Renders a skeleton loader for a tool card.
 *
 * @returns {JSX.Element} The ToolCardSkeleton component.
 */
const ToolCardSkeleton = () => {
  return (
    <Grid {...styles.mainGridProps}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        height={150}
        width="100%"
        sx={{
          borderRadius: '10px',
          bgcolor: (theme) => theme.palette.common.black['30p'],
        }}
      />
    </Grid>
  );
};

export default ToolCardSkeleton;
