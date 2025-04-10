require('dotenv').config({ path: '../.env' }); // Ensure this is at the top
const { https } = require('firebase-functions/v2');
const admin = require('firebase-admin');

const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


// Verify if Firebase front-end/back-end is deployed in production or development mode
if(process.env.NEXT_PUBLIC_FIREBASE_DEPLOYMENT_MODE === "dev")
{
    admin.initializeApp();
}
else
{
    // If the app is deployed in production mode authenticate with the `Firebase Admin SDK` private key.
    // Generate the key by pressing the `Generate new private key` button at `Project settings\Account settings\Service accounts`
    // within your Firebase project and add the generated file in the `controllers` directory.
    const serviceAccount = require("./controllers/marvel-platform-c3a0b-firebase-adminsdk-kplbb-dc41163a3e.json");
    admin.initializeApp({credential:admin.credential.cert(serviceAccount)});
}

const userController = require('./controllers/userController');
const marvelAIController = require('./controllers/marvelAIController');
const { seedDatabase } = require('./cloud_db_seed');

seedDatabase();


// Server functions served as a CRUD API interface
//
// [BEGIN]

app.get('/signUpUser', async (req, res) => {
    res.json(await userController.signUpUser(req.query));
});

app.post('/createChatSession', async(req, res)=>{
    res.json(await marvelAIController.createChatSession(req.body));
});

app.post('/chat', async(req, res)=>{
    res.json(await marvelAIController.chat(req.body));
});

// [END]


/* Migration Scripts */
// const {
// } = require("./migrationScripts/modifyChallengePlayersData");
const migrationScripts = {};

// Serve all the functions as a single Google Cloud Function in order to 
// enable 'CORS'(Cross-origin resource sharing) by passing an 'Express' 
// CORS enabled API app object, to the 'onRequest' firebase function. 
// This must be done because the front-end web-app and the server app
// are served at 2 different URLs (origins), and the server must be 
// configured to accept requests from different origins.
module.exports.functions = https.onRequest(app);
