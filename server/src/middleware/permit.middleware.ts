import { RequestHandler } from 'express';
import { webClientHost } from '../config/app.config';
import { UserRole } from '../config/constants/user/user-role';
import { errorCodes, HttpError } from '../helper/error/HttpError';
import { IUser } from '../model/User/IUser';
import { IPermissionRole } from '../model/User/IUserRole';

const Role: IPermissionRole = {
  ALL: 'ALL',
  ANONYMOUS: 'ANONYMOUS',
  AUTHORIZED: 'AUTHORIZED',
  ...UserRole,
} as const;

export const premit = (
  allowedRoles: (keyof IPermissionRole)[],
  redirect?: string
): RequestHandler => {
  return (req, res, next) => {
    const user = req.user as IUser | undefined;
    let allowContinue: boolean;

    let error;

    // If allowed to all
    if (allowedRoles.includes(Role.ALL)) {
      allowContinue = true;
    } else if (user) {
      allowContinue =
        // allow if route need any user
        allowedRoles.includes(Role.AUTHORIZED) ||
        // allow if the user has an allowed role
        allowedRoles.some((role) => {
          return user.role === role;
        });
      error = errorCodes.FORBIDDEN;
    } else {
      // allowed only for anonymouses
      allowContinue = allowedRoles.includes(Role.ANONYMOUS);
      error = errorCodes.UNAUTHORIZED;
    }

    if (allowContinue) {
      next();
    } else if (redirect) {
      res.redirect(webClientHost + redirect);
    } else {
      next(HttpError.createError(error));
    }
  };
};
