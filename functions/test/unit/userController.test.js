const admin = require('firebase-admin');
const { https } = require('firebase-functions/v1');
const { signUpUser } = require('../../controllers/userController');

describe('User Controller Tests', () => {
  let wrapped;
  let mockSet;

  beforeEach(() => {
    // Create a wrapped version of the function
    wrapped = functions.wrap(signUpUser);

    // Mock Firestore's set method
    mockSet = jest.fn(() => Promise.resolve());
    
    // Mock Firestore document reference
    const mockDoc = jest.fn(() => ({
      set: mockSet
    }));
    
    // Mock Firestore collection reference
    const mockCollection = jest.fn(() => ({
      doc: mockDoc
    }));

    // Mock admin.firestore()
    jest.spyOn(admin, 'firestore').mockImplementation(() => ({
      collection: mockCollection
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user document successfully', async () => {
    // Arrange
    const testData = {
      email: 'test@example.com',
      fullName: 'Test User',
      uid: 'test-uid-123'
    };

    // Act
    const result = await wrapped(testData);

    // Assert
    expect(result).toEqual({
      status: 'success',
      message: 'User document created successfully'
    });
    expect(mockSet).toHaveBeenCalledWith({
      id: testData.uid,
      email: testData.email,
      fullName: testData.fullName,
      needsBoarding: true
    });
  });

  it('should throw an error when required fields are missing', async () => {
    // Arrange
    const testData = {
      email: 'test@example.com',
      // Missing fullName and uid
    };

    // Act & Assert
    await expect(wrapped(testData)).rejects.toThrow(https.HttpsError);
    expect(mockSet).not.toHaveBeenCalled();
  });
});
