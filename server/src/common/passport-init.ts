import { Request } from 'express';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import passportJwt from 'passport-jwt';
import { TelegramStrategy } from 'passport-telegram-official';

// query
import userQuery from '../db/queries/user.query';

// config
import {
  googleClientSecret,
  googleClientId,
  googleCallbackUrl,
} from '../config/google.config';
import { secretKey } from '../config/jwt.config';
import { telegramBotToken } from '../config/telegram.config';

// helper
import { createDummyJwt, verifyJwt } from '../helper/jwt.helper';

const JwtStrategy = passportJwt.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new TelegramStrategy(
    {
      botToken: telegramBotToken,
    },
    function (profile: any, cb: any) {
      cb(undefined, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackUrl,
    },
    function (_, __, profile, cb) {
      cb(undefined, profile);
    }
  )
);

function jwtFromRequest(req: Request): string {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return createDummyJwt();
  }

  const jwt = accessToken;
  try {
    verifyJwt(jwt);
    return jwt;
  } catch (err) {
    console.error('Jwt token is not verified');
    return createDummyJwt();
  }
}

const jwtOptions: passportJwt.StrategyOptions = {
  jwtFromRequest,
  secretOrKey: secretKey,
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const { sub: id } = jwtPayload;
      const userById = id ? (await userQuery.findById(id)) || {} : {};
      done(null, userById);
    } catch (err) {
      done(err);
    }
  })
);
