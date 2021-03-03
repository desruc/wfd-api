/* eslint-disable @typescript-eslint/await-thenable */
import { Request, Response } from 'express';

import * as dbHandler from '~/config/jest/dbHandler';

import User from '~/models/user';

import * as usersController from '~/controllers/v1/users';

const testUser = {
  auth0Id: 'usersController',
  firstName: 'userController',
  lastName: 'userController'
};

describe('User Controller Tests', () => {
  let userId = '';

  let mockRequest: Partial<Request>;

  const mockResponse: Partial<Response> = {
    success: jest.fn().mockReturnValue(this)
  };

  const mockNext = jest.fn();

  beforeAll(async () => {
    await dbHandler.connect();
    const user = await new User(testUser).save();
    userId = user.id;
  });

  afterAll(async () => {
    await User.deleteMany({ auth0Id: testUser.auth0Id });
    await dbHandler.closeDatabase();
  });

  it('It should update a user', async () => {
    mockRequest = {
      user: {
        sub: testUser.auth0Id,
        id: userId
      },
      body: {
        firstName: 'UpdatedFirstName'
      }
    };

    await usersController.updateUser(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);
  });

  it('It should get a user', async () => {
    mockRequest = {
      user: {
        sub: testUser.auth0Id,
        id: userId
      },
      params: {
        userId
      }
    };

    await usersController.getUser(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);
  });

  it('It should get the auth user', async () => {
    mockRequest = {
      user: {
        sub: testUser.auth0Id,
        id: userId
      }
    };

    await usersController.getAuthUser(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);
  });
});
