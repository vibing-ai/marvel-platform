import { useEffect, useState } from 'react';

import { ClickAwayListener, Grid, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';

import { ACTION_TYPES } from '@/libs/constants/bots';

import {
  setActionType,
  setDisplayQuickActions,
  setInput,
} from '@/libs/redux/slices/chatSlice';

/**
 * QuickActions component that displays a list of quick actions that the user can select.
 * If displayQuickActions is true, the QuickActions component is rendered.
 * If displayQuickActions is false, null is returned.
 *
 * @param {function} handleSendMessage The function to handle sending a message when an action is selected.
 * @return {JSX.Element|null} The QuickActions component or null if displayQuickActions is false.
 */
const QuickActions = ({ handleSendMessage }) => {
  // Get the state variables from Redux store
  const { input, displayQuickActions } = useSelector((state) => state.chat);

  // State variable to track whether the action is ready to be sent
  const [readyToSend, setReadyToSend] = useState(false);

  // The function to dispatch Redux actions.
  const dispatch = useDispatch();

  // The list of quick action types.
  const quickActions = ACTION_TYPES;

  // Effect to handle sending the message when readyToSend is true
  useEffect(() => {
    if (readyToSend) {
      handleSendMessage();

      setReadyToSend(false);
    }
  }, [readyToSend]);

  /**
   * Handle action click event of the QuickActions component.
   * When an action is clicked, the QuickActions component is closed and the selected action is dispatched as input to the chat.
   *
   * @param {string} quickActionSelected The selected quick action.
   * @return {void}
   */
  const handleActionClick = (quickActionSelected) => {
    // Construct the new input string
    const newInput = `${input}\n\n${quickActionSelected.description}`;

    // Dispatch the selected action as input to the chat
    dispatch(setInput(newInput));

    // Dispatch the selected action as the current action type
    dispatch(setActionType(quickActionSelected.actionType));

    // Close the QuickActions component
    dispatch(setDisplayQuickActions(false));

    setReadyToSend(true);
  };

  /**
   * Handle close event of the QuickActions component.
   * Closes the QuickActions component by dispatching an action to Redux.
   *
   * @return {void}
   */
  const handleClose = () => {
    // Dispatch an action to Redux to hide the QuickActions component.
    dispatch(setDisplayQuickActions(false));
  };

  /**
   * Renders the QuickActions component if displayQuickActions is true.
   * If displayQuickActions is false, returns null.
   *
   * @return {JSX.Element|null} The QuickActions component or null.
   */
  return displayQuickActions ? (
    // Wrap the QuickActions component with ClickAwayListener to handle clicks outside the component
    // ClickAwayListener triggers the handleClose function when a click occurs outside the component
    (<ClickAwayListener onClickAway={handleClose}>
      <Grid {...styles.quickActionsMain}>
        {/* Render the Grid container for the QuickActions component */}
        <Grid {...styles.quickActionsGridContainer}>
          {/* Render each quick action as a Grid item */}
          {Object.values(quickActions).map((action, key) => {
            // Generate a quick action component for each action
            // The quick action component is a Grid item that triggers the handleActionClick function when clicked
            return (
              <Grid
                key={key}
                onClick={() => handleActionClick(action)}
                {...styles.quickAction}
              >
                {/* Render the name of the quick action */}
                <Typography {...styles.quickActionText}>
                  {action.actionType}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </ClickAwayListener>)
  ) : null;
};

export default QuickActions;
