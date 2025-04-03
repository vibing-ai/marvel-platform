import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import BulletPoint from '@/assets/svg/BulletPoint.svg';
import CloudSave from '@/assets/svg/CloudSave.svg';

/**
 * LastSaved Component
 *
 * This component displays the last saved timestamp of the editor, formatted
 * as "Today, hh:mm AM/PM" or "Day, hh:mm AM/PM". It also includes icons 
 * indicating the saved status.
 *
 * @component
 * @returns {JSX.Element|null} A formatted timestamp with icons or `null` if no save history exists.
 */
const LastSaved = () => {
  const { editorState } = useSelector((state) => state.tools);

  /**
   * Formats a given timestamp into a readable string.
   *
   * @param {number|string} timestamp - The timestamp to format.
   * @returns {string|undefined} A formatted timestamp string or `undefined` if no timestamp is provided.
   */
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return;

    const date = new Date(timestamp);
    const now = new Date();

    // Check if the timestamp is today
    const isToday = date.toDateString() === now.toDateString();

    // Get the day of the week
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
    const dayLabel = isToday ? 'Today' : dayFormatter.format(date);

    // Format the time as 'hh:mm AM/PM'
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return `${dayLabel}, ${timeFormatter.format(date).toLowerCase()}`;
  };

  /**
   * Renders the last saved timestamp with icons.
   *
   * @returns {JSX.Element|null} A Grid container with save details or `null` if no save history exists.
   */
  const renderLastSaveTime = () => {
    const { editHistory } = editorState;
    const saveTime = editHistory[editHistory.length - 1]?.timestamp;

    return (
      saveTime && (
        <Grid container alignItems="center" spacing={0} sx={{ gap: '7px' }}>
          <Grid item><BulletPoint /></Grid>
          <Grid item><CloudSave /></Grid>
          <Grid item><span>Saved</span></Grid>
          <Grid item><BulletPoint /></Grid>
          <Grid item>{formatTimestamp(saveTime)}</Grid>
        </Grid>
      )
    );
  };

  return renderLastSaveTime();
};

export default LastSaved;
