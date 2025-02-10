const notifCreate = require('../utils/createNotification');
const {
  onDocumentCreated,
  onDocumentUpdated,
} = require('firebase-functions/v2/firestore');

const { Timestamp } = require('firebase-admin/firestore');
const { logger } = require('firebase-functions/v1');

const DEBUG = notifCreate.DEBUG;

/**
 * Trigger that occurs when a new assistant is created. Creates a global
 * notification related to the assistant when triggered.
 *
 * @async
 * @function onNewAssistant
 */
exports.onNewAssistant = onDocumentCreated(
  'assistants/{newId}',
  async (event) => {
    const snapshot = event.data;

    if (!snapshot || !snapshot.exists) {
      DEBUG &&
        logger.log('Updated an empty assistant. No notification is created');
      return;
    }

    const assistant = snapshot.data();

    const notification = {
      id: 'Announcement ' + assistant.name,
      type: 'Announcement',
      title: 'New Assistant',
      description:
        assistant.name + ' has been created. Check it out from the main menu.',
      date: Timestamp.fromMillis(Date.now()),
      actionLink: assistant.name,
    };

    await notifCreate.createNewNotification(notification);
  }
);

/**
 * Trigger that occurs when an assistant is updated. Creates a global
 * notification related to the assistant when triggered.
 *
 * @async
 * @function onUpdatedAssistant
 */
exports.onUpdatedAssistant = onDocumentUpdated(
  'assistants/{id}',
  async (event) => {
    const assistant = event.data.after.data();

    if (!assistant) {
      DEBUG &&
        logger.log('Updated an empty assistant. No notification is created');
      return;
    }

    const notification = {
      id: 'Update ' + assistant.name,
      type: 'Update',
      title: 'Assistant Updated',
      description:
        assistant.name + ' has been updated. Check it out from the main menu.',
      date: Timestamp.fromMillis(Date.now()),
      actionLink: assistant.name,
    };

    await notifCreate.createNewNotification(notification);
  }
);
