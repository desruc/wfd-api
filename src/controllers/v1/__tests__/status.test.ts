/* eslint-disable @typescript-eslint/await-thenable */
import { Request, Response } from 'express';

import * as statusController from '~/controllers/v1/status';

describe('Status Controller Tests', () => {
  let mockRequest: Partial<Request>;

  const mockResponse: Partial<Response> = {
    status: jest.fn().mockImplementation(() => mockResponse),
    json: jest.fn()
  };

  const mockNext = jest.fn();

  it('It should do a health check', async () => {
    await statusController.checkStatus(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toBeCalledTimes(1);
  });
});
