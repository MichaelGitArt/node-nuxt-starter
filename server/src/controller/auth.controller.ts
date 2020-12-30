import passport from 'passport';

// config
import { webClientHost } from '../config/app.config';

// ts
import { RequestHandler } from 'express';
import { IGoogleUser, ITelegramUser } from '../model/passport/index';

// service
import {
  googleLoginOrRegister,
  telegramLoginOrRegister,
} from '../service/auth.service';

// helper
import { clearAccessToken, setAccessToken } from '../helper/cookie.helper';

const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
});

const googleAuthRedirect = passport.authenticate('google', {
  failureRedirect: webClientHost + '/auth/',
  session: false,
});

const googleAuthHandle: RequestHandler = async (req, res) => {
  const { accessToken } = await googleLoginOrRegister(req.user as IGoogleUser);
  setAccessToken(res, accessToken);

  res.redirect(webClientHost + '/auth/google-redirect');
};

const telegramAuth = passport.authenticate('telegram', {
  session: false,
});

const telegramAuthHandle: RequestHandler = async (req, res) => {
  const { accessToken } = await telegramLoginOrRegister(
    req.user as ITelegramUser
  );
  setAccessToken(res, accessToken);

  res.redirect(webClientHost);
};

const logout: RequestHandler = async (req, res) => {
  clearAccessToken(res);

  res.json({
    success: true,
  });
};

export default {
  googleAuth,
  googleAuthRedirect,
  googleAuthHandle,

  telegramAuth,
  telegramAuthHandle,

  logout,
};
