/* eslint-disable @typescript-eslint/await-thenable */
import { Request, Response } from 'express';

import * as dbHandler from '~/config/jest/dbHandler';

import CustomError from '~/core/customError';
import { CORE_FORBIDDEN } from '~/errors/core';

import Recipe from '~/models/recipe';
import User from '~/models/user';

import { canModifyRecipe } from '../recipes';

const mockObjectId = '5fff78ef380ebd3908936e62';

const testUser = {
  auth0Id: 'recipeMiddleware',
  firstName: 'recipeMiddleware',
  lastName: 'recipeMiddleware'
};

const testRecipe = {
  title: 'recipeMiddleware',
  description: 'recipeMiddleware',
  author: '',
  cookingTime: 10,
  public: true
};

describe('Recipe Middleware Tests', () => {
  let userId = '';

  let recipeId = '';

  let mockRequest: Partial<Request>;

  let mockResponse: Partial<Response>;

  const nextFunction = jest.fn();

  beforeAll(async () => {
    await dbHandler.connect();

    const user = await new User(testUser).save();
    userId = user.id;

    const recipe = await new Recipe({ ...testRecipe, author: userId }).save();
    recipeId = recipe.id;
  });

  afterAll(async () => {
    await dbHandler.closeDatabase();
  });

  beforeEach(async () => {
    await User.deleteMany({ _id: userId });
    nextFunction.mockClear();
  });

  it('The auth user passes the modify recipe middleware', async () => {
    mockRequest = {
      user: {
        id: userId,
        sub: testUser.auth0Id
      },
      params: {
        recipeId
      }
    };

    await canModifyRecipe(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
  });

  it('The auth user fails the modify recipe middleware', async () => {
    mockRequest = {
      user: {
        id: mockObjectId,
        sub: testUser.auth0Id
      },
      params: {
        recipeId: mockObjectId
      }
    };

    await canModifyRecipe(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(new CustomError(CORE_FORBIDDEN));
  });
});
