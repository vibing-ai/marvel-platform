const dotenv = require('dotenv');
dotenv.config();

const admin = require('firebase-admin');
const functionsTest = require('firebase-functions-test');

// Set up emulator environment variables before requiring firebase config
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';

const projectId = 'kai-ai-f63c8';

// Initialize the firebase-functions-test SDK using environment variables
const testEnv = functionsTest({
  projectId,
});

// Initialize admin SDK
let firebaseApp;
try {
  firebaseApp = admin.app();
} catch (error) {
  void error;
}

if (!admin.apps.length) {
  admin.initializeApp({
    projectId
  });
}

// Make the admin SDK and test SDK available globally
global.admin = admin;
global.functions = testEnv;

// Clean up after all tests
afterAll(async () => {
  if (admin.apps.length) {
    await admin.app().delete();
  }
  testEnv.cleanup();
});

module.exports = {
  admin,
  testEnv,
  firebaseApp
};
