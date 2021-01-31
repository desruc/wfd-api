import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchErrors = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    /* eslint-disable-next-line */
    const fnReturn = fn(req, res, next);

    return Promise.resolve(fnReturn).catch(next);
  };
};

export default catchErrors;
