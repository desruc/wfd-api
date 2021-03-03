import { Request, Response } from 'express';

import errorHandler from '~/core/errorHandler';

import CustomError from '~/core/customError';
import { CORE_UNAUTHORIZED, CORE_FORBIDDEN } from '~/errors/core';

jest.mock('~/core/logger');

describe('Error Handler Tests', () => {
  let mockRequest: Partial<Request>;

  const mockResponse: Partial<Response> = {
    status: jest.fn().mockImplementation(() => mockResponse),
    json: jest.fn().mockImplementation(() => mockResponse),
    send: jest.fn().mockImplementation(() => mockResponse)
  };

  const mockNext = jest.fn();

  it('It should handle a custom error', () => {
    errorHandler(
      new CustomError(CORE_FORBIDDEN),
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toBeCalledTimes(1);
    expect(mockResponse.send).toBeCalledWith({
      error: {
        message: CORE_FORBIDDEN.message,
        code: CORE_FORBIDDEN.code,
        status: CORE_FORBIDDEN.status,
        errors: {}
      }
    });
  });

  it('It should handle core unauthorized thrown by auth0', () => {
    const e = new Error('Unauthorized');
    e.name = 'UnauthorizedError';

    errorHandler(e, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toBeCalledTimes(1);
    expect(mockResponse.json).toBeCalledWith({
      error: {
        message: CORE_UNAUTHORIZED.message,
        code: CORE_UNAUTHORIZED.code,
        status: CORE_UNAUTHORIZED.status
      }
    });
  });
});
