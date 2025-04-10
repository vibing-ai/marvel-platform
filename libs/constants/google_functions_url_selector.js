import { EMULATOR_FUNCTIONS, PRODUCTION_FUNCTIONS } from "./functions"

const functions_urls = ()=> process.env.NEXT_PUBLIC_FIREBASE_DEPLOYMENT_MODE == "dev" ? EMULATOR_FUNCTIONS : PRODUCTION_FUNCTIONS;
export default functions_urls;