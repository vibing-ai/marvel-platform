import { useEffect, useState } from 'react';

import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { collection, query } from 'firebase/firestore';

import { useRouter } from 'next/router';
import { useFirestoreCollectionData } from 'reactfire';

import Notification from '../Notification/Notification';

import styles from './styles';

import ROUTES from '@/libs/constants/routes';

import { auth, firestore } from '@/libs/redux/store';

import { setReadStatus } from '@/libs/services/notifications/setReadStatus';

/**
 * Generates a list of notifications for the signed in user.
 *
 * @param {Function} notifications - The parent's setState function passed to set the number of notifications.
 * @return {JSX.Element} The JSX element representing the notifications list.
 */
const NotificationList = (props) => {
  const { notifications = () => {} } = props;

  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [hideRead, setHideRead] = useState(false);

  const notifCol = collection(
    firestore,
    `users/${auth.currentUser.uid}/notifications`
  );
  const notifQuery = query(notifCol);
  const { status, data: notifs } = useFirestoreCollectionData(notifQuery, {
    idField: 'id',
  });

  useEffect(() => {
    if (status !== 'loading') {
      notifs.sort((notif1, notif2) => {
        if (notif1.date.seconds === notif2.date.seconds) {
          return notif1.date.nanoseconds - notif2.date.nanoseconds;
        }
        return notif1.date.seconds - notif2.date.seconds;
      });
      setMessages(notifs);
      const unread = notifs.filter((notif) => {
        return !notif.isRead;
      });
      setUnreadMessages(unread);
      notifications(unread.length);
    }
  }, [notifs]);

  const displayUnread = () => {
    if (unreadMessages.length > 0) {
      return `Unread (${unreadMessages.length})`;
    }
    return 'Unread';
  };

  const showReadAlertButtons = () => {
    return (
      <Card {...styles.notificationFilterBackground}>
        <Button
          sx={{
            backgroundColor: hideRead ? 'transparent' : '#9D7BFF33',
            border: hideRead ? '0px' : '0.5px solid #9D7BFF',
            '&:hover': {
              background: hideRead ? 'transparent' : '#9D7BFF',
            },
            ...styles.filterButton.sx,
          }}
          onClick={() => {
            setHideRead(false);
          }}
          disableElevation
        >
          <Typography variant="Body 2">All</Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: !hideRead ? 'transparent' : '#9D7BFF33',
            border: !hideRead ? '0px' : '0.5px solid #9D7BFF',
            '&:hover': {
              background: !hideRead ? 'transparent' : '#9D7BFF',
            },
            ...styles.filterButton.sx,
          }}
          onClick={() => {
            setHideRead(true);
          }}
          disableElevation
        >
          <Typography variant="Body 2">{displayUnread()}</Typography>
        </Button>
      </Card>
    );
  };

  const notificationsList = () => {
    let msgs = messages;
    if (hideRead) {
      msgs = unreadMessages;
    }
    return (
      <Box {...styles.notificationListLimit}>
        {msgs.map((notif) => {
          return <Notification key={notif.id} notif={notif} />;
        })}
      </Box>
    );
  };

  const setAllRead = () => {
    messages.forEach((message) => {
      message.isRead = true;
    });
    setReadStatus(messages);
  };

  const globalButtons = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => {
            router.replace(ROUTES.NOTIFICATIONS);
          }}
          aria-label="toSettings"
          disableElevation
        >
          <Typography variant="Body 2" color="white">
            Go to Settings
          </Typography>
        </Button>
        <Button
          {...styles.glowingButton}
          onClick={setAllRead}
          variant="contained"
          aria-label="readAll"
          disableElevation
        >
          <Typography variant="Body 2">Mark all as read</Typography>
        </Button>
      </Box>
    );
  };

  return (
    <Box>
      {showReadAlertButtons()}
      <Divider {...styles.divider} />
      {notificationsList()}
      {globalButtons()}
    </Box>
  );
};

export default NotificationList;
