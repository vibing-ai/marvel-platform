import { Fragment, useEffect } from 'react';

import { Grid, Skeleton, Typography } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';

import fetchChat from '@/libs/redux/thunks/fetchChat';
import fetchHistory from '@/libs/redux/thunks/fetchHistory';

/**
 * Categorizes chat history into different time periods.
 *
 * @param {Array} history The chat history to categorize.
 * @return {Object} An object with properties representing different time periods and containing arrays of chat sessions within each period.
 */
const categorizeHistory = (history) => {
  // Get the start of the current day
  const today = moment().startOf('day');

  // Get the start of the day before today
  const yesterday = moment().subtract(1, 'days').startOf('day');

  // Get the start of the week before today
  const startOfWeek = moment().subtract(7, 'days').startOf('day');

  // Get the start of the month before today
  const startOfMonth = moment().subtract(30, 'days').startOf('day');

  // Initialize an object to hold the categorized chat history
  const categorizedHistory = {
    today: [],
    yesterday: [],
    thisWeek: [],
    thisMonth: [],
    older: [],
  };

  // Loop through each chat session in the history
  history.forEach((session) => {
    // Get the timestamp of the last update to the chat session
    const updatedAt = moment(session.updatedAt);

    // Determine the time period in which the chat session was last updated
    if (updatedAt.isSame(today, 'day')) {
      // The chat session was updated today
      categorizedHistory.today.push(session);
    } else if (updatedAt.isSame(yesterday, 'day')) {
      // The chat session was updated yesterday
      categorizedHistory.yesterday.push(session);
    } else if (updatedAt.isBetween(startOfWeek, today, null, '[]')) {
      // The chat session was updated within the past week
      categorizedHistory.thisWeek.push(session);
    } else if (updatedAt.isBetween(startOfMonth, today, null, '[]')) {
      // The chat session was updated within the past month
      categorizedHistory.thisMonth.push(session);
    } else {
      // The chat session was updated before the past month
      categorizedHistory.older.push(session);
    }
  });

  // Return the categorized chat history
  return categorizedHistory;
};

/**
 * ChatHistory component displays a list of chat entries.
 * @return {JSX.Element} The rendered ChatHistory component.
 */
const ChatHistory = () => {
  // The current chat session from the Redux store.
  const chat = useSelector((state) => state.chat.chat);

  // Get the current chat session ID from the Redux store. The ID of the current chat session.
  const currentChatSessionId = chat.id;

  // The ID of the user from the Redux store.
  const userId = useSelector((state) => state.user.data.id);

  // The dispatch function from Redux.
  const dispatch = useDispatch();

  // The state of whether the history is loaded from the Redux store.
  const historyLoaded = useSelector((state) => state.history?.historyLoaded);

  // The chat history from the Redux store.
  const chatHistory = useSelector((state) => state.history.history);

  // The error message indicating a failure to fetch history from the Redux store.
  const historyError = useSelector((state) => state.history.error);

  /**
   * Fetches the chat history when the component mounts.
   * It dispatches the fetchHistory thunk with the userId.
   */
  useEffect(() => {
    // Dispatch the fetchHistory thunk to fetch the chat history from the server.
    dispatch(fetchHistory(userId));
  }, []); // Empty dependency array means the effect runs only once, on mount.

  /**
   * Select a chat session by its document ID and update the local storage.
   *
   * @param {string} docId - The document ID of the chat session.
   * @return {void} No return value.
   */
  const selectChat = (docId) => {
    // Dispatch the fetch chat action to update the chat session in the Redux store.
    dispatch(fetchChat(docId));

    // Store the selected chat session's document ID in the local storage.
    localStorage.setItem('sessionId', docId);
  };

  /**
   * Render the chat history into a categorized list.
   *
   * @return {JSX.Element} The rendered chat history list.
   */
  const renderHistory = () => {
    // Categorize the chat history into different time periods
    const categorizedHistory = categorizeHistory(chatHistory);

    // Define the category names for the different time periods
    const categoryName = {
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      thisMonth: 'This month',
      older: 'Older',
    };

    return (
      <Grid {...styles.chatHistoriesGrid}>
        {
          /* Iterate over the categorized history */
          Object.entries(categorizedHistory).map(
            // For each category
            ([categoryKey, categorySessions]) =>
              // If the category has items
              categorySessions.length !== 0 ? (
                <Fragment key={categoryKey}>
                  <Grid {...styles.underline} />
                  <Grid {...styles.chatHistoryCategorizedContainer}>
                    {/* Set the subheader for the category */}
                    <Grid {...styles.categoryTitle}>
                      <Typography {...styles.categoryTitleText}>
                        {categoryName[categoryKey]}
                      </Typography>
                    </Grid>

                    {/* Map over the items in the category */}
                    {categorySessions.map((session) => (
                      <Grid
                        key={session.id}
                        {...styles.chatHistoryTitle}
                        onClick={() => selectChat(session.id)}
                      >
                        <Typography
                          {...styles.chatHistoryTitleText(
                            currentChatSessionId === session.id
                          )}
                        >
                          {session.title}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Fragment>
              ) : null
          )
        }
      </Grid>
    );
  };

  /**
   * Render a NoChatHistory component if the history array is empty.
   * @return {JSX.Element} The rendered NoChatHistory component.
   */
  const NoChatHistory = () => (
    // Grid container to center the component
    (<Grid {...styles.centerChatMessage}>
      {/* Typography component to display the message */}
      <Typography variant="h5">
        {/* Display the message */}
        No Chat History
      </Typography>
    </Grid>)
  );

  /**
   * Render a ErrorMessage component with an error message.
   *
   * @param {string} errorMessage The error message to display.
   * @return {JSX.Element} The rendered ErrorMessage component.
   */
  const ErrorMessage = (errorMessage) => (
    <Grid {...styles.centerChatMessage}>
      {/* Typography component to display the error message */}
      <Typography>{errorMessage}</Typography>
    </Grid>
  );

  /**
   * Generates a skeleton component to be displayed while the chat history is being loaded.
   * @return {JSX.Element} A Grid container containing Skeleton components.
   */
  const skeleton = () => (
    // Grid container with 100% height
    (<Grid container height="100%" flexDirection="column">
      {/* Map over an array of length 5 */}
      {Array.from({ length: 5 }).map((_, index) => (
        // Skeleton component with specified props
        (<Skeleton key={index} animation="wave" width="100%" height="10%" />)
      ))}
    </Grid>)
  );

  // Handles rendering of chat history, error messages, and skeleton loader
  if (historyLoaded) {
    if (historyError) {
      // If there's an error, display the error message
      return ErrorMessage(historyError);
    }

    // Render the chat history component if the history is loaded
    if (chatHistory.length === 0) {
      // If there's no chat history, display "No Chat History".
      return NoChatHistory();
    }

    // Otherwise, render the chat history component
    return renderHistory();
  }

  // Render the skeleton loader if the history is not loaded
  return skeleton();
};

export default ChatHistory;
