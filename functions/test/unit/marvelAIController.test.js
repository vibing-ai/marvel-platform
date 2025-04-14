const { admin, testEnv } = require('../setup/jest.setup');
const { chat } = require('../../controllers/marvelAIController');
const axios = require('axios');

// Mock axios
jest.mock('axios');

describe('Marvel AI Controller Tests', () => {
  let wrapped;
  let testChatSessionId;

  beforeAll(() => {
    // Create a wrapped version of the function
    wrapped = testEnv.wrap(chat);

    // Mock environment variables
    process.env.MARVEL_API_KEY = 'dev';
    process.env.MARVEL_ENDPOINT = 'https://marvel-ai-backend-sandbox-297484662473.us-east1.run.app';
  });

  beforeEach(async () => {
    // Create a test chat session in Firestore
    testChatSessionId = 'test-chat-session-' + Date.now();
    
    const timestamp = admin.firestore.Timestamp.now();
    const chatSessionData = {
      id: testChatSessionId,
      user: {
        id: 'test-user-id',
        fullName: 'Test User',
        email: 'test@example.com'
      },
      type: 'chat',
      messages: [],
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await admin
      .firestore()
      .collection('chatSessions')
      .doc(testChatSessionId)
      .set(chatSessionData);

    // Mock axios response
    axios.post.mockResolvedValue({
      data: {
        data: [{
          type: 'text',
          role: 'ai',
          payload: {
            text: 'This is a test response'
          },
          timestamp: timestamp
        }]
      }
    });
  });

  afterEach(async () => {
    // Clean up the test chat session
    await admin
      .firestore()
      .collection('chatSessions')
      .doc(testChatSessionId)
      .delete();
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  it('should process a new message successfully', async () => {
    // Arrange
    const testMessage = {
      type: 'text',
      role: 'human',
      payload: {
        text: 'Hello, this is a test message'
      }
    };

    // Act
    const result = await wrapped({
      data: {
        id: testChatSessionId,
        message: testMessage
      }
    });

    // Assert
    // 1. Verify the chat session was updated
    const updatedSession = await admin
      .firestore()
      .collection('chatSessions')
      .doc(testChatSessionId)
      .get();
    
    const sessionData = updatedSession.data();
    
    // Check if messages array contains both user message and AI response
    expect(sessionData.messages).toHaveLength(2);
    expect(sessionData.messages[0]).toMatchObject({
      type: 'text',
      role: 'human',
      payload: {
        text: 'Hello, this is a test message'
      }
    });
    expect(sessionData.messages[1]).toMatchObject({
      type: 'text',
      role: 'ai',
      payload: {
        text: 'This is a test response'
      }
    });

    // 2. Verify axios was called with correct data
    expect(axios.post).toHaveBeenCalled();
    expect(axios.post.mock.calls[0][0]).toContain(process.env.MARVEL_ENDPOINT);
  });
});
