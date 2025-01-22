import { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { Search } from '@mui/icons-material';
import Image from 'next/image';

import TabButton from '@/components/TabButton';
import AssistantsListingContainer from './AssistantsListingContainer';
import styles from './styles';

import Star from '@/assets/svg/Star_3.svg';
import ImageURLs from '@/assets/urls';

const TABS = ['All', 'Classroom Support', 'Lesson Planning', 'Student Engagement'];

const AssistantsPage = () => {
  const [currentTab, setCurrentTab] = useState(TABS[0]);

  const renderWelcomeBanner = () => {
    return (
      <Grid {...styles.bannerGridProps}>
        <Image
          src={ImageURLs.WelcomeBannerImg}
          alt="welcome_banner_img"
          width={200}
          height={200}
          {...styles.image1Props}
          priority
        />
        <Box {...styles.star1Props}>
          <Star />
        </Box>
        <Box {...styles.star2Props}>
          <Star />
        </Box>

        <Grid>
          <Typography {...styles.titleProps}>
            Meet Your AI Teaching Assistants 🤖
          </Typography>
          <Typography {...styles.subtitleProps}>
            Discover AI assistants designed to support your teaching journey. Each assistant specializes in different aspects of education.
          </Typography>
        </Grid>

        <Image
          src={ImageURLs.CapsulesImg}
          alt="capsules_img"
          width={200}
          height={200}
          {...styles.image2Props}
          priority
        />
        <Box {...styles.star3Props}>
          <Star />
        </Box>
      </Grid>
    );
  };

  const renderFilters = () => {
    return (
      <Grid {...styles.filtersProps}>
        <Grid {...styles.tabsGrid}>
          {TABS.map((tab) => (
            <TabButton
              text={tab}
              isActive={currentTab === tab}
              setActive={setCurrentTab}
              key={tab}
            />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderWelcomeBanner()}
      {renderFilters()}
      <AssistantsListingContainer
        category="AI Assistants"
        currentTab={currentTab}
      />
    </Grid>
  );
};

export default AssistantsPage;
