import { Request, Response, NextFunction } from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

import { ensureLocalRecordExists } from '~/services/user';

/* eslint-disable @typescript-eslint/restrict-template-expressions */
const commonJwtOptions = {
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${process.env.AUTH0_ISSUER}`,
  algorithms: ['RS256']
};

const credentialsRequired = jwt({
  ...commonJwtOptions
});

const credentialsOptional = jwt({
  ...commonJwtOptions,
  credentialsRequired: false
});

/**
 * The user must be authenticated
 */
export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void =>
  credentialsRequired(req, res, async () => {
    const { sub } = req.user;

    const userRecord = await ensureLocalRecordExists(sub);

    req.user.id = userRecord.id;

    next();
  });

/**
 * Add user information to request if it exists
 */
export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void =>
  credentialsOptional(req, res, async () => {
    if (req.user) {
      const { sub } = req.user;

      const userRecord = await ensureLocalRecordExists(sub);

      req.user.id = userRecord.id;

      next();
    } else next();
  });
