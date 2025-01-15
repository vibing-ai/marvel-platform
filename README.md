![image](https://github.com/user-attachments/assets/04e5f5a4-9ba7-4887-a158-bca181f7391c)


# Marvel AI Platform
Marvel AI is an open-source project by Reality AI, designed to provide smart tools and chatbots to assist teachers in education. The platform leverages Firebase, Next.js, and various AI components to create a seamless learning experience.

![Next.js](https://img.shields.io/badge/Next.js-12.3.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-%5E1.9.5-purple)
![Emotion](https://img.shields.io/badge/Emotion-%5E11.11.0-pink)
![MUI](https://img.shields.io/badge/MUI-%5E5.13.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-%5E9.22.0-orange)
![Axios](https://img.shields.io/badge/Axios-%5E1.4.0-brightgreen)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%5E7.43.9-lightgrey)
![Remark](https://img.shields.io/badge/Remark-%5E15.0.1-yellow)
![ESLint](https://img.shields.io/badge/ESLint-%5E8.40.0-blue)
![Prettier](https://img.shields.io/badge/Prettier-%5E2.8.8-ff69b4)
![Husky](https://img.shields.io/badge/Husky-%5E9.0.11-yellow)

## Table of Contents

- [Architecture](#Architecture)
- [Folder Structure](#folder-structure)
- [Setup](#Setup)
- - [Local Development](#local-development)
- - [Cloud Deployment](#cloud-deployment)
- [Contributing](#Contributing)
- [License](#license)

## Architecture
The "Marvel" platform is structured into two main components: Firebase and AI. The Firebase side, detailed in this repository, encompasses both the frontend, developed with NextJS and hosted on Firebase Hosting, and the backend, which includes user management and session handling via Firebase Functions like `signUpUser` and `createChatSession`. The `communicator` function acts as a proxy for chat interactions between the Firebase infrastructure and the AI services. Tool requests (like "Quizify" and "YouTube Flashcard Generator") are sent directly from the frontend to the AI endpoints. Firestore DB is utilized for data storage. The AI endpoints are housed in a separate repository, including a chatbot and tools like "Quizify" and "Flashcard Generator."


### Folder Structure
## Folder Structure Overview

- **`/`**:
  Standard firebase project structure, having frontend, NEXTJS files in the root and backend in the functions folder.

- **`/functions`**:
  Houses the Firebase Functions, which are serverless functions responsible for backend processes such as AI chatbot and user signup. Any operation which is sensitive or compute intensive or background tasks should be placed in functions.

## Key Files
- **`firebase.json`**:
  Contains configuration settings for Firebase services such as hosting and rules.

- **`firestore.indexes.json`**:
  Manages custom indexing for Firestore to optimize query performance.

- **`firestore.rules`**:
  Security rules for Firestore database, defining read/write permissions.

- **`package.json`** & **`package-lock.json`**:
  Defines the project’s frontend dependencies

## Prerequisites
- Node.js (v18 or later)
- Firebase CLI (v9.10.0 or later)
- Google Firebase Account

## Setup
To set up the project, follow these steps:

## Local Development


1. Clone the repository: `git clone https://github.com/marvelai-org/marvel-platform`

2. Create your firebase project on Google Firebase Console

3. Setup Firestore Database **(optional)**: If you don't have a Firestore database instance, you can create one in the Firebase Console. This step is only necessary if you want to use your own Firestore database for development option #1.

4. Get Firebase Config **(optional)**: If you want to use your own Firebase project for development, you can get the Firebase config from the Firebase project settings in the Firebase Console and update the `.env` file accordingly. Otherwise, you can skip this step and use the default config values.

5. Create a `.env` file in the root of the project using `sample.env` as a template: Update the values in `.env` according to your needs.

6. Install Firebase CLI by running the following in terminal: `npm install -g firebase-tools`

7. Login to firebase CLI by running the following command: `firebase login`

8. Install all dependencies by running: `npm run install:all`

### Development Options
You have two options to run the development environment:

#### Option 1: Frontend with Production Backend
```bash
npm run dev
```
This will start the frontend on localhost:3000 and connect to your deployed Firebase backend (Functions and Firestore). Use this option when you want to:
- Test frontend changes against the production backend
- Don't need to modify backend functionality

#### Option 2: Full Local Development Environment (RECOMMENDED)
```bash
npm run dev:all
```
This starts both the frontend and Firebase emulators locally, providing a completely isolated development environment. Use this option when you want to:
- Test full-stack changes locally
- Develop and test Firebase Functions
- Work with a seeded local Firestore database
- Avoid affecting production data

### Accessing the Application
1. Once the development server is running, visit: `http://localhost:3000/`
2. Login using the following credentials:
   - Email: `user@test.com`
   - Password: `Test@123`
3. After logging in, you'll be required to complete the onboarding process.
4. Once the onboarding is complete, you can start using the application.

Note: If you experience any issues with hanging emulator processes after stopping the development server, you can clean them up by running:
```bash
npm run kill-emulators
```
Important: With this method, it is not necessary to have your Firebase project set up. The default environment configurations will work fine, allowing you to start developing without needing to configure Firebase locally.

## Cloud Deployment
Before deploying, ensure you have the correct Firebase project setup:

1. Login to Firebase if you haven't already:
```bash
firebase login
```

2. List your Firebase projects to verify you're on the correct one:
```bash
firebase projects:list
```

3. If needed, select the correct project:
```bash
firebase use <project-id>
```

Once your Firebase project is properly configured:
1. Install all dependencies: `npm run install:all`
2. Deploy the project (frontend and functions): `npm run deploy`
*In case your env file is not being picked at the deployment time, duplicate the .env file in /functions folder

## Contributing
1. Fork the Repository: Create a personal fork of the repository to work on.
2. Create a Branch: For each new feature or bug fix, create a new branch from the develop branch.
3. Implement Changes: Make your changes, ensuring they adhere to the project’s coding standards.
4. Commit Changes: Commit your changes with clear, descriptive messages.
5. Push to Your Fork: Push your changes to your forked repository.
6. Open a Pull Request: Navigate to the original repository and open a pull request from your branch to the develop branch.
7. Code Review: Engage in the code review process, addressing any feedback provided.
8. Merge: Once approved, your changes will be merged into the develop branch.

For detailed instructions, refer to the [CONTRIBUTING.md](https://github.com/marvelai-org/marvel-platform/blob/2400bf1b10af77b57976778a108f3f2296aa5215/contributing.md) file in the repository.

## License

This project is licensed under the [MIT License](LICENSE.md).
