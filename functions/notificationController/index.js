const assistantTriggers = require('./triggers/assistants.triggers');
const personalNotifTriggers = require('./triggers/notifications.triggers');
const toolTriggers = require('./triggers/tools.triggers');

module.exports = {
  /* Notification Removal Scheduler */
  onScheduleDeletion: personalNotifTriggers.autoRemoveOldNotifs,

  /* Global notification propogation */
  onNewNotification: personalNotifTriggers.onNewNotification,
  onRemovedNotification: personalNotifTriggers.onRemovedNotification,

  /* Tool notifications */
  onNewTool: toolTriggers.onNewTool,
  onUpdatedTool: toolTriggers.onUpdatedTool,

  /* Assistant notifications */
  onNewAssistant: assistantTriggers.onNewAssistant,
  onUpdatedAssistant: assistantTriggers.onUpdatedAssistant,
};
