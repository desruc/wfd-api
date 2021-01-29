import { RequestHandler } from 'express';

const pagination: RequestHandler = (req, _res, next) => {
  const { page, limit } = req.query;

  const computedPage = Number(page || 0);
  const computedLimit = Number(limit) || 20;
  const skip = computedPage * computedLimit;
  /* eslint-disable no-param-reassign */
  req.pagination = {
    page: computedPage,
    skip,
    limit: computedLimit
  };
  next();
};

export default pagination;
