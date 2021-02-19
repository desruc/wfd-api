import { Request, Response, NextFunction } from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

import { ensureLocalRecordExists } from '~/services/user';

/* eslint-disable @typescript-eslint/restrict-template-expressions */
const checkJwt = jwt({
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
});

const checkAuth = (req: Request, res: Response, next: NextFunction): void =>
  checkJwt(req, res, async () => {
    const { sub } = req.user;

    await ensureLocalRecordExists(sub);

    next();
  });

export default checkAuth;
