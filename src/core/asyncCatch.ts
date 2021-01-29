import { RequestHandler } from 'express';

const catchErrors = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next): Promise<any> => {
    try {
      return await requestHandler(req, res, next); // eslint-disable-line
    } catch (error) {
      next(error);
    }
  };
};

export default catchErrors;
