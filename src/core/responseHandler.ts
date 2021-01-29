import { RequestHandler } from 'express';

const responseHandler: RequestHandler = (_req, res, next) => {
  res.success = (payload: {
    data?: any;
    status?: number;
    message?: string;
  }): void => {
    res
      .status(payload.status || 200)
      .json({ message: 'Success', data: null, meta: null, ...payload });
  };
  next();
};

export default responseHandler;
