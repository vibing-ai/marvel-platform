import axios from 'axios';

import { logger } from 'firebase-functions/v1';

const P_VALUE = 0.5;

const handler = async (req, res) => {
  const { gRecaptchaToken } = req.body;

  // if no token sent with request terminate api call
  if (!gRecaptchaToken) {
    logger.log('Missing reCAPTCHA token on user submit.');
    return res.status(400).json({
      success: false,
      message: 'Missing reCAPTCHA token',
    });
  }

  const formData = `secret=${process.env.RECAPTCHA_SECRET}&response=${gRecaptchaToken}`;
  const googleEndpoint = 'https://www.google.com/recaptcha/api/siteverify';
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  // verify recaptcha token to google api
  try {
    const googleRes = await axios.post(googleEndpoint, formData, { headers });
    if (
      googleRes &&
      googleRes.data?.success &&
      googleRes.data?.success > P_VALUE
    ) {
      return res.status(200).json({
        success: true,
        message: 'reCAPTCHA verified',
      });
      // eslint-disable-next-line no-else-return
    } else {
      logger.log('reCAPTCHA verification failed', googleRes.data);
      return res.status(401).json({
        success: false,
        message: 'Unauthorized, reCAPTCHA not verified',
      });
    }
  } catch (error) {
    logger.log('reCAPTCHA verification failed', error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default handler;