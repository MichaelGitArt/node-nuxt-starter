import './index';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} = process.env;

export const googleClientId = GOOGLE_CLIENT_ID as string;
export const googleClientSecret = GOOGLE_CLIENT_SECRET as string;
export const googleCallbackUrl = GOOGLE_CALLBACK_URL as string;
