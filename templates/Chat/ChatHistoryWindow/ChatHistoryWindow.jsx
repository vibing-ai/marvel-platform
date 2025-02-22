import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import ChatHistoryButtonIcon from '@/assets/svg/ChatHistoryButtonIcon.svg';
import ChatIcon from '@/assets/svg/ChatIcon.svg';
import ChatIconFill from '@/assets/svg/ChatIconFill.svg';

import ChatHistory from '../ChatHistory/ChatHistory';

import styles from './styles';

/**
 * ChatHistoryWindow component displays a sidebar that contains chat history.
 * The sidebar is toggled by clicking on the toggle button.
 */
const ChatHistoryWindow = () => {
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => setShowHistory((prev) => !prev);

  return (
    <Grid {...styles.chatHistoryWindow} className={showHistory ? 'expanded' : ''}>
      <Grid 
        {...styles.chatHistoryHeader(showHistory)}
        onClick={toggleHistory}
      >
        <Grid {...styles.chatHistoryHeaderTitleContainer}>
          <Grid>{showHistory ? <ChatIconFill /> : <ChatIcon />}</Grid>
          <Typography {...styles.chatHistoryHeaderTitleText}>
            Chat History
          </Typography>
        </Grid>
        <Grid {...styles.chatHistoryHeaderButton(showHistory)}>
          <ChatHistoryButtonIcon />
        </Grid>
      </Grid>
      <Grid {...styles.chatHistoriesContainer(showHistory)}>
        {showHistory && <ChatHistory />}
      </Grid>
    </Grid>
  );
};

export default ChatHistoryWindow;
