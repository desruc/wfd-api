/* eslint-disable @typescript-eslint/await-thenable */
import { Request, Response } from 'express';

import * as dbHandler from '~/config/jest/dbHandler';

import RecipeRating from '~/models/recipeRating';
import User from '~/models/user';

import * as recipeRatingController from '~/controllers/v1/recipeRating';

jest.mock('~/services/recipe');

const mockObjectId = '5fff78ef380ebd3908936e62';

const testUser = {
  auth0Id: 'recipeRatingController',
  firstName: 'recipeRatingController',
  lastName: 'recipeRatingController'
};

describe('Recipe Rating Controller Tests', () => {
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

  it('It should create a recipe rating', async () => {
    mockRequest = {
      user: {
        sub: testUser.auth0Id,
        id: mockObjectId
      },
      params: {
        recipeId: mockObjectId
      },
      body: {
        score: 5
      }
    };

    await recipeRatingController.createRecipeRating(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);

    await RecipeRating.deleteMany({ user: mockObjectId });
  });

  it('It should get a recipe rating', async () => {
    mockRequest = {
      user: {
        sub: testUser.auth0Id,
        id: userId
      },
      params: {
        recipeId: mockObjectId
      }
    };

    await recipeRatingController.getUserRating(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);
  });
});
