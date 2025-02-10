import NotificationsIcon from '@mui/icons-material/Notifications';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { Box, Button, Divider, Typography } from '@mui/material';

import styles from './styles';

import { setReadStatus } from '@/libs/services/notifications/setReadStatus';

/**
 * A component that displays a notification message.
 *
 * @param {Object} notif - The notification object
 * @param {string} notif.id - The id of the message
 * @param {string} notif.type - The type of message.
 * @param {string} notif.title - The title of the message.
 * @param {Date} notif.date - The date of the message.
 * @param {string} notif.description - The contents of the message.
 * @param {string} notif.isRead - The read status of the message.
 * @param {string} notif.user - The user id the message is assigned to.
 * @param {string} notif.nid - The global notification(optional).
 * @param {string} notif.actionLink - The link to the action associated with the notification.
 * @return {JSX.Element} The JSX element representing the notifcation component.
 */

const Notification = (props) => {
  const { notif } = props;
  const messageIcon = () => {
    if (notif.isRead) {
      return <NotificationsNoneIcon {...styles.notifIcon} />;
    }
    return (
      <NotificationsIcon
        fontSize="large"
        aria-label="unreadIcon"
        sx={{
          padding: '2px',
          borderRadius: '50%',
          border: '3px solid #9D7BFF',
          margin: '5px 15px 5px 5px',
          color: '#9D7BFF',
        }}
      />
    );
  };

  const notificationTitle = () => {
    return (
      <Typography {...styles.notifTitle}>
        {notif.type} - {notif.title}
      </Typography>
    );
  };

  const convertDateToTime = (notificate) => {
    const milliseconds =
      notificate.date.seconds * 1000 +
      Math.floor(notificate.date.nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const ampm = Math.floor(date.getHours() / 12) < 1 ? ' AM' : ' PM';
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const hours = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
    const timeOfDay = `${hours}:${minutes}${ampm}`;
    const year = date.getFullYear() % 100;
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const dayOfYear = `${month}/${dayOfMonth}/${year}`;
    return `${dayOfYear} - ${timeOfDay}`;
  };

  const notificationDate = () => {
    return (
      <Typography {...styles.notifDate}>{convertDateToTime(notif)}</Typography>
    );
  };

  const toggleRead = () => {
    const message = notif;
    message.isRead = !message.isRead;
    setReadStatus([message]);
  };

  const toggleReadButton = () => {
    return (
      <Button onClick={toggleRead} aria-label="toggleRead">
        <Typography variant="Body 2" color="white">
          {notif.isRead ? 'Mark As Unread' : 'Mark As Read'}
        </Typography>
      </Button>
    );
  };

  const viewNotification = () => {
    // eslint-disable-next-line no-console
    console.log('Placeholder. Going to message details');
  };

  const actionButtons = () => {
    return (
      <Box>
        <Button {...styles.notifViewButton} onClick={viewNotification}>
          <Typography variant="Body 2" color="white">
            View Details
          </Typography>
        </Button>
        {toggleReadButton()}
      </Box>
    );
  };

  const displayNotification = () => {
    return (
      <Box id={notif.id} sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {messageIcon()}
        <Box>
          {notificationTitle()}
          {notificationDate()}
          {actionButtons()}
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {displayNotification()}
      <Divider {...styles.divider} />
    </Box>
  );
};

export default Notification;
