const notifCreate = require('../utils/createNotification');

const admin = require('firebase-admin');
const {
  onDocumentCreated,
  onDocumentDeleted,
} = require('firebase-functions/v2/firestore');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { Filter } = require('firebase-admin/firestore');
const { logger } = require('firebase-functions/v1');

const DEBUG = notifCreate.DEBUG;

// Timing Constants

/* eslint-disable no-unused-vars */
// Number of seconds in a day
const DAY = 86400;
// Sunday at midnight
const WEEKLY = '0 0 * * 0';
// Daily at midnight
const DAILY = '0 0 * * *';
// Every minute
const ALWAYS = '* * * * *';
/* eslint-disable no-unused-vars */

/**
 * Asynchronous function that removes all notifications that are older than 60 days
 *
 * @async
 * @function removeOldNotifs
 * @param {Object} adminAlter - Alternative admin instance to be used(Only set for Unit Testing)
 */
const removeOldNotifs = async (adminAlter = null) => {
  try {
    const admin = adminAlter ? adminAlter : admin;
    const users = await admin.firestore().collection('users').get();
    users.docs.forEach(async (userdoc) => {
      const notifications = await admin
        .firestore()
        .collection('users')
        .doc(userdoc.data().id)
        .collection('notifications')
        .get();
      notifications.docs.forEach(async (notifdoc) => {
        if (notifdoc.data().date) {
          const timeDiff = Date.now() / 1000 - notifdoc.data().date.seconds;
          if (timeDiff / DAY >= 60) {
            await admin
              .firestore()
              .collection('users')
              .doc(userdoc.data().id)
              .collection('notifications')
              .doc(notifdoc.data().id)
              .delete();
          }
        }
      });
    });
    const globalNotifs = await admin
      .firestore()
      .collection('notifications')
      .get();
    globalNotifs.docs.forEach(async (notifdoc) => {
      if (notifdoc.data().date) {
        const timeDiff = Date.now() / 1000 - notifdoc.data().date.seconds;
        if (timeDiff / DAY >= 60) {
          await admin
            .firestore()
            .collection('notifications')
            .doc(notifdoc.data().id)
            .delete();
        }
      }
    });
  } catch (err) {
    DEBUG && logger.log('Failed to remove older notifications:', err);
  }
};
exports.removeOldNotifs = removeOldNotifs;

/**
 * Scheduled function that removes notifications older than
 * 60 days at every selected interval.
 *
 * @async
 * @function autoRemoveOldNotifs
 */
exports.autoRemoveOldNotifs = onSchedule(ALWAYS, removeOldNotifs);

/**
 * Trigger that creates a personal copy of a global notification for every user
 * when a global notification is created
 *
 * @async
 * @function onNewNotification
 */
exports.onNewNotification = onDocumentCreated(
  'notifications/{newId}',
  async (event) => {
    const snapshot = event.data;
    if (!snapshot || !snapshot.exists) {
      DEBUG &&
        logger.log(
          'No data in notification. Trigger will not generate new notifications'
        );
      return;
    }
    const newNotification = snapshot.data();
    try {
      const users = await admin.firestore().collection('users').get();

      users.docs.forEach((userdoc) => {
        const id = crypto.randomUUID();
        const personalNotification = admin
          .firestore()
          .collection('users')
          .doc(userdoc.data().id)
          .collection('notifications')
          .doc(newNotification.id + ' ' + id);
        const notification_read = { ...newNotification };
        notification_read.isRead = false;
        notification_read.nid = newNotification.id;
        notification_read.id = newNotification.id + ' ' + id;
        notification_read.user = userdoc.data().id;

        personalNotification.set(notification_read).catch((error) => {
          DEBUG &&
            logger.log(
              'Failed to create personal notification:',
              event.params.newId,
              'for user:',
              userdoc.data().id
            );
        });
      });
    } catch (err) {
      DEBUG && logger.log('Failed to generate personal notifications:', err);
    }
  }
);

/**
 *
 * Trigger that removes all personal copies of a global notification
 * when the global notification is removed
 *
 * @async
 * @function onRemovedNotification
 */
exports.onRemovedNotification = onDocumentDeleted(
  'notifications/{id}',
  async (event) => {
    try {
      const users = await admin.firestore().collection('users').get();
      users.docs.forEach(async (userdoc) => {
        const notifRef = admin
          .firestore()
          .collection('users')
          .doc(userdoc.data().id)
          .collection('notifications');

        const filter = Filter.where('nid', '==', event.params.id);
        const personalNotifications = await notifRef.where(filter).get();
        for (let i = 0; i < personalNotifications.docs.length; i++) {
          const info = personalNotifications.docs.at(i).data();
          await admin
            .firestore()
            .collection('users')
            .doc(userdoc.data().id)
            .collection('notifications')
            .doc(info.id)
            .delete();
        }
      });
    } catch (err) {
      DEBUG && logger.log('Could not remove personal notifications: ', err);
    }
  }
);
