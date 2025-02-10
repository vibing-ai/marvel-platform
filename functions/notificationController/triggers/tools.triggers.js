const notifCreate = require('../utils/createNotification');
const {
  onDocumentCreated,
  onDocumentUpdated,
} = require('firebase-functions/v2/firestore');

const { Timestamp } = require('firebase-admin/firestore');
const { logger } = require('firebase-functions/v1');

const DEBUG = notifCreate.DEBUG;

/**
 * Trigger that occurs when a new tool is created. Creates a global
 * notification related to the tool when triggered.
 *
 * @async
 * @function onNewTool
 */
exports.onNewTool = onDocumentCreated('tools/{newId}', async (event) => {
  const snapshot = event.data;
  if (!snapshot || !snapshot.exists) {
    DEBUG && logger.log('Created an empty tool. No notification is crreated');
    return;
  }
  const tool = snapshot.data();

  const notification = {
    id: 'Announcement ' + tool.name,
    type: 'Announcement',
    title: 'New Tool',
    description:
      tool.name + ' has been created. Check it out on the main menu.',
    date: Timestamp.fromMillis(Date.now()),
    actionLink: tool.name,
  };

  await notifCreate.createNewNotification(notification);
});

/**
 * Trigger that occurs when a tool is updated. Creates a global
 * notification related to the tool when triggered.
 *
 * @async
 * @function onUpdatedTool
 */
exports.onUpdatedTool = onDocumentUpdated('tools/{id}', async (event) => {
  const tool = event.data.after.data();
  if (!tool) {
    DEBUG && logger.log('Updated an empty tool. No notification is created');
    return;
  }
  const notification = {
    id: 'Update ' + tool.name,
    type: 'Update',
    title: 'Tool Updated',
    description:
      tool.name + ' has been updated. Check it out on the main menu.',
    date: Timestamp.fromMillis(Date.now()),
    actionLink: tool.name,
  };

  await notifCreate.createNewNotification(notification);
});
