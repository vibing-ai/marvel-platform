import { ArrowBack } from '@mui/icons-material';
import { Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from './styles';

import AssistantListingContainer from '@/assistants/views/AssistantListingContainer';
import ROUTES from '@/libs/constants/routes';
import theme from '@/libs/theme/theme';

const AssistantsPage = () => {
  const router = useRouter();
  const handleRoute = () => router.push(ROUTES.HOME);

  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.headerGridProps}>
        <Grid {...styles.backButtonGridProps}>
          <GradientOutlinedButton
            bgcolor="#24272F"
            icon={<ArrowBack />}
            textColor="#AC92FF"
            iconPlacement="left"
            onHoverTextColor={theme.palette.Background.white2}
            clickHandler={handleRoute}
            text="Back"
            {...styles.outlinedButtonProps}
          />
        </Grid>
        <Grid>
          <TextField
            sx={{ width: '100%' }}
            placeholder="Search for an Assistant"
            {...styles.searchFieldProps}
          />
        </Grid>
      </Grid>
      <Grid {...styles.headerTextGridProps}>
        <Typography {...styles.headerTextProps}>
          Your AI Teaching Sidekick - Tailored for You!
        </Typography>
        <Typography {...styles.descriptionProps}>
          Explore a suite of AI-powered assistants designed to simplify
          teaching, enhance learning, and save you time — customized for every
          classroom need.
        </Typography>
      </Grid>
      <Grid {...styles.containerGridProps}>
        <AssistantListingContainer category="Recently Used" />
      </Grid>
    </Grid>
  );
};

export default AssistantsPage;
