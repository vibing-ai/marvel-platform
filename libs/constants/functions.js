const EMULATOR_HOST = 'localhost';

export const EMULATOR_FUNCTIONS ={
    signUpUser:`http://${EMULATOR_HOST}:5001/${process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID}/us-central1/functions/signUpUser/`,
    chat:`http://${EMULATOR_HOST}:5001/${process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID}/us-central1/functions/chat/`,
    createChatSession:`http://${EMULATOR_HOST}:5001/${process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID}/us-central1/functions/createChatSession/`
}

export const PRODUCTION_FUNCTIONS ={
    signUpUser:`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_FUNCTIONS_URL}/signUpUser/`,
    chat:`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_FUNCTIONS_URL}/chat/`,
    createChatSession:`${process.env.NEXT_PUBLIC_GOOGLE_CLOUD_FUNCTIONS_URL}/createChatSession/`
}