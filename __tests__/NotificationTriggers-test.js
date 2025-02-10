/**
 * @jest-environment node
 */
import admin from 'firebase-admin';
import { Filter, Timestamp } from 'firebase-admin/firestore';

import { removeOldNotifs } from '@/functions/notificationController/triggers/notifications.triggers';
import firebaseConfig from '@/libs/firebase/config';

const firebase = require('@firebase/testing');

const id = firebaseConfig.projectId;

process.env.GCLOUD_PROJECT = id;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

const app = admin.initializeApp({ id });
const db = firebase.firestore(app);

const wait = (time) => {
  return new Promise((r) => {
    setTimeout(r, time);
  });
};

beforeAll(async () => {
  await db.collection('users').doc('jestTestUser').set({ id: 'jestTestUser' });
  await db
    .collection('notifications')
    .doc('testnotifications1')
    .set({ id: 'testnotifications1', date: Timestamp.fromMillis(Date.now()) });
  await db
    .collection('notifications')
    .doc('testnotifications2')
    .set({ id: 'testnotifications2' });
  await db
    .collection('notifications')
    .doc('testnotifications3')
    .set({
      id: 'testnotifications3',
      date: Timestamp.fromMillis(Date.now() - 86400 * 1000 * 70),
    });
  await db
    .collection('tools')
    .doc('tool1')
    .set({ id: 'tool1', name: 'Test Tool 1' });
  await db
    .collection('assistants')
    .doc('assistant1')
    .set({ id: 'assistant1', name: 'Test Assistant 1' });
  await wait(1000);
  await db
    .collection('tools')
    .doc('tool1')
    .set({ id: 'tool1', name: 'Test Tool 1' });
  await db
    .collection('assistants')
    .doc('assistant1')
    .set({ id: 'assistant1', name: 'Test Assistant 1' });
  await db.collection('notifications').doc('testnotifications2').delete();
  await removeOldNotifs(app);
}, [60000]);

afterAll(async () => {
  await db.collection('tools').doc('tool1').delete();
  await db.collection('notifications').doc('testnotifications1').delete();
  await db.collection('notifications').doc('testnotifications2').delete();
  await db.collection('assistants').doc('assistant1').delete();
  await db.collection('notifications').doc('Announcement Test Tool 1').delete();
  await db
    .collection('notifications')
    .doc('Announcement Test Assistant 1')
    .delete();
  await db.collection('notifications').doc('Update Test Tool 1').delete();
  await db.collection('notifications').doc('Update Test Assistant 1').delete();
  await wait(10000);
  await db.collection('users').doc('jestTestUser').delete();
}, [60000]);

describe('Unit Tests for Global Notification Triggers', () => {
  it(
    'Should create a personal notification copy for each ' +
      'user when a global notification is created',
    async () => {
      const testNotif = db
        .collection('users')
        .doc('jestTestUser')
        .collection('notifications');
      const filter = Filter.where('nid', '==', 'testnotifications1');
      let notifs = { docs: { length: 0 } };
      let counter = 0;
      while (counter < 60 && notifs.docs.length === 0) {
        await wait(500);
        notifs = await testNotif.where(filter).get();
        counter += 1;
      }
      expect(notifs.docs.length).toBeGreaterThan(0);
    },
    60000
  );

  it(
    'Should remove all personal notifications for a global notification ' +
      'when the global notification is removed',
    async () => {
      const filter = Filter.where('nid', '==', 'testnotifications2');
      const testNotif = db
        .collection('users')
        .doc('jestTestUser')
        .collection('notifications');
      let notifs = { docs: { length: 1 } };
      let counter = 0;
      counter = 0;
      while (counter < 60 && notifs.docs.length != 0) {
        await wait(500);
        notifs = await testNotif.where(filter).get();
        counter += 1;
      }
      expect(notifs.docs.length).toBe(0);
    },
    60000
  );
});

/* Tests assume that a file is added or changed to /tools when a new tool is relased
 * and a file is added or changed to /assistants when a new assistant is released
 */
describe('Unit Tests for Tool and Assistant Notification Triggers', () => {
  it('Should create a notification when a new tool is added', async () => {
    const ref = db.collection('notifications').doc('Announcement Test Tool 1');
    let notification = {
      data: () => {
        return null;
      },
    };
    let counter = 0;
    while (counter < 60 && notification.data() === null) {
      await wait(500);
      notification = await ref.get();
      counter += 1;
    }

    const notifData = notification.data();
    expect(notifData.type).toBe('Announcement');
    expect(notifData.title).toBe('New Tool');
  }, 60000);

  it('Should create a notification when a tool is updated', async () => {
    const ref = db.collection('notifications').doc('Update Test Tool 1');
    let notification = {
      data: () => {
        return null;
      },
    };
    let counter = 0;
    while (counter < 60 && notification.data() === null) {
      await wait(500);
      notification = await ref.get();
      counter += 1;
    }

    const notifData = notification.data();
    expect(notifData.type).toBe('Update');
    expect(notifData.title).toBe('Tool Updated');
  }, 60000);

  it('Should create a notification when a new assistant is added', async () => {
    const ref = db
      .collection('notifications')
      .doc('Announcement Test Assistant 1');
    let notification = {
      data: () => {
        return null;
      },
    };
    let counter = 0;
    while (counter < 60 && notification.data() === null) {
      await wait(500);
      notification = await ref.get();
      counter += 1;
    }

    const notifData = notification.data();
    expect(notifData.type).toBe('Announcement');
    expect(notifData.title).toBe('New Assistant');
  }, 60000);

  it('Should create a notification when an assistant is updated', async () => {
    const ref = db.collection('notifications').doc('Update Test Assistant 1');
    let notification = {
      data: () => {
        return null;
      },
    };
    let counter = 0;
    while (counter < 60 && notification.data() === null) {
      await wait(500);
      notification = await ref.get();
      counter += 1;
    }

    const notifData = notification.data();
    expect(notifData.type).toBe('Update');
    expect(notifData.title).toBe('Assistant Updated');
  }, 60000);
});

/* Tests only test the results of the function call. The scheduler cannot be run locally,
 * so there are not tests for the correct timing
 */
describe('Unit Tests for Notification Cleanup', () => {
  it('Should remove global notifications older than 60 days', async () => {
    const filter = Filter.where('id', '==', 'testnotifications3');
    const testNotif = db.collection('notifications');
    let notifs = { docs: { length: 1 } };
    let counter = 0;
    counter = 0;
    while (counter < 60 && notifs.docs.length != 0) {
      await wait(500);
      notifs = await testNotif.where(filter).get();
      counter += 1;
    }
    expect(notifs.docs.length).toBe(0);
  }, 60000);

  it('Should remove personal notifications older than 60 days', async () => {
    const filter = Filter.where('nid', '==', 'testnotifications3');
    const testNotif = db
      .collection('users')
      .doc('jestTestUser')
      .collection('notifications');
    let notifs = { docs: { length: 1 } };
    let counter = 0;
    counter = 0;
    while (counter < 60 && notifs.docs.length != 0) {
      await wait(500);
      notifs = await testNotif.where(filter).get();
      counter += 1;
    }
    expect(notifs.docs.length).toBe(0);
  }, 60000);
});
