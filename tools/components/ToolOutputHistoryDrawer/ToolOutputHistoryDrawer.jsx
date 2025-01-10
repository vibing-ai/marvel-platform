import { ContentCopy, FileDownload } from '@mui/icons-material';
import { Button, Drawer, Grid, Typography } from '@mui/material';
import moment from 'moment';

import styles from './styles';

import FlashCardsOutput from './toolRenderers/FlashCardsOutput';
import QuizOutput from './toolRenderers/QuizOutput';
import SyllabusOutput from './toolRenderers/SyllabusOutput';

import { convertToUnixTimestamp } from '@/libs/utils/FirebaseUtils';
import { copyToClipboard, exportToCSV } from '@/libs/utils/ToolHistoryUtils';
import { TOOLS_ID } from '@/tools/libs/constants/tools';

const DRAWER_RENDERERS = {
  [TOOLS_ID.MULTIPLE_CHOICE_QUIZ_GENERATOR]: QuizOutput,
  [TOOLS_ID.FLASHCARDS_GENERATOR]: FlashCardsOutput,
  [TOOLS_ID.SYLLABUS_GENERATOR]: SyllabusOutput,
};

const DEFAULT_DATA = {
  title: 'Default Title',
  content: 'Default Content',
  creationDate: moment().toDate().toLocaleDateString(),
  questions: [
    {
      question: 'Default Question 1',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
    },
  ],
};

/**
 * Renders a drawer component displaying information about a tool session.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isOpen - Indicates whether the drawer is open.
 * @param {function} props.onClose - Callback function to handle closing the drawer.
 * @param {Object} props.data - The data object containing the tool information.
 *
 * @returns {JSX.Element} A React component that renders the tool output history drawer.
 */
const ToolOutputHistoryDrawer = (props) => {
  const { isOpen, onClose, data } = props;

  if (!data) return null;

  const panelData = data?.response || DEFAULT_DATA.questions;
  const ToolHistoryOutput = DRAWER_RENDERERS[data.toolId];

  const handleCopyToClipboard = () => {
    copyToClipboard(data, panelData);
  };

  const handleExportToCSV = () => {
    exportToCSV(data, panelData);
  };

  const renderHeader = () => (
    <Grid container direction="column" {...styles.headerGridProps}>
      <Grid item>
        <Typography {...styles.dateProps}>
          {moment(convertToUnixTimestamp(data?.createdAt))
            ?.toDate()
            ?.toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryTitleProps}>
          {data?.title || 'Default Title'}
        </Typography>
      </Grid>
      <Grid item>
        <Typography {...styles.categoryContentProps}>
          {data?.description || 'Default Description'}
        </Typography>
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    return (
      <Grid {...styles.containerGridProps}>
        <ToolHistoryOutput data={data} />
      </Grid>
    );
  };

  const renderFooterButtons = () => (
    <Grid container justifyContent="flex-start" sx={{ mt: 3, width: '100%' }}>
      <Button onClick={handleCopyToClipboard} {...styles.copyButton}>
        <ContentCopy {...styles.CopyIcon} />
        Copy
      </Button>
      <Button onClick={handleExportToCSV} {...styles.exportButton}>
        <FileDownload {...styles.downloadIcon} />
        Export
      </Button>
    </Grid>
  );

  return (
    <Drawer {...styles.drawerProps} open={isOpen} onClose={onClose}>
      <Grid {...styles.mainGridProps}>
        {renderHeader()}
        {renderContent()}
        {renderFooterButtons()}
      </Grid>
    </Drawer>
  );
};

export default ToolOutputHistoryDrawer;
