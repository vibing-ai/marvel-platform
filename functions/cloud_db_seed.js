const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

const db = admin.firestore();

const seedDatabase = async () => {
  const data = require('./seed_data.json');
  const auth = getAuth();

  try {
    const global = await db.collection('global').doc('config').get();

    if (global.exists) {
      console.log('Marvel AI is ready to go!');
      return;
    }

    // Create initial configuration
    await db
      .collection('global')
      .doc('config')
      .set({ dbSeeded: true, updatedAt: Timestamp.fromMillis(Date.now()) });

    // Create initial user in Authentication
    try {
      const userCredential = await auth.createUser({
        email: 'user@test.com',
        password: 'Test@123', // This should be changed on first login
      });

      // Verify the user's email
      await auth.updateUser(userCredential.uid, {
        emailVerified: true,
      });

      // Create user document in Firestore
      const userData = {
        bio: null,
        email: 'user@test.com',
        fullName: 'Test User',
        id: userCredential.uid,
        needsBoarding: true,
        occupation: null,
        profileImage: null,
        socialMedia: {
          facebook: null,
          linkedin: null,
          xHandle: null,
        },
        createdAt: Timestamp.fromMillis(Date.now()),
        updatedAt: Timestamp.fromMillis(Date.now()),
      };

      await db.collection('users').doc(userCredential.uid).set(userData);
      console.log(`Initial user created with ID: ${userCredential.uid}`);
    } catch (userError) {
      console.error('Error creating initial user:', userError);
    }

    // Seed tools collection
    Object.values(data).forEach(async (doc) => {
      await db.collection('tools').doc(doc.id.toString()).set(doc);
      console.log(`Document with ID ${doc.id} added to the Tools collection`);
    });

    // Show final success message with a non-blocking delay
    setTimeout(() => {
      console.log('\n=== Marvel AI Setup Complete ===');
      console.log('Access the application at: http://localhost:3000');
      console.log('Login Credentials:');
      console.log('Email: user@test.com');
      console.log('Password: Test@123');
      console.log('===============================\n');
    }, 1000);

    console.log(
      'Marvel AI installed successfully to firebase and is ready to go!'
    );
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = { seedDatabase };
