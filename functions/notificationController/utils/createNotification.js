const admin = require('firebase-admin');
const { logger } = require('firebase-functions/v1');

const DEBUG = true;
exports.DEBUG = DEBUG;

/**
 * Helper function that takes a notification and adds it to the notification collection
 *
 * @async
 * @function
 * @param {Object} notification - The notification structure that is added to the database
 */
exports.createNewNotification = async (notification) => {
  try {
    await admin
      .firestore()
      .collection('notifications')
      .doc(notification.id)
      .set(notification);
    DEBUG && logger.log('New notification created');
  } catch (err) {
    DEBUG && logger.log('Failed to create a notification: ', err);
  }
};
