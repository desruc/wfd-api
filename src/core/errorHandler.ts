import { ErrorRequestHandler } from 'express';
import { pick } from 'lodash';

import logger from './logger';

import CustomError from './customError';

import { CORE_UNAUTHORIZED } from '~/errors/core';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error(error);

  const isErrorSafeForClient = error instanceof CustomError;

  /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
  if (error.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({ error: pick(CORE_UNAUTHORIZED, 'message', 'code', 'status') });
  } else {
    const clientError = isErrorSafeForClient
      ? pick(error, ['message', 'code', 'status', 'data', 'errors'])
      : {
          message: 'Something went wrong, please contact our support.',
          code: 'INTERNAL_ERROR',
          status: 500,
          data: {}
        };

    res.status(clientError.status).send({ error: clientError });
  }
};

export default errorHandler;
