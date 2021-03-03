import { Request, Response, NextFunction } from 'express';

export const mockedAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const id = req.headers.authorization as string;

  req.user = {
    sub: 'sub',
    id
  };

  next();
};

export const ensureAuthenticated = mockedAuth;

export const checkAuthenticated = mockedAuth;
