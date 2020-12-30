const passport = require('passport');

// ts
import { RequestHandler } from 'express';

export const authMiddleware: RequestHandler[] = [
  passport.authenticate('jwt', { session: false }),
  (req, _, next) => {
    if (Object.keys(req.user as Object).length === 0) {
      req.user = undefined;
    }
    next();
  },
];
