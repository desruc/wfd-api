/* eslint-disable @typescript-eslint/await-thenable */
import { Request, Response } from 'express';

import * as dbHandler from '~/config/jest/dbHandler';

import Recipe from '~/models/recipe';
import User from '~/models/user';

import * as recipeController from '~/controllers/v1/recipe';

const mockObjectId = '5fff78ef380ebd3908936e62';

const testUser = {
  auth0Id: 'recipeController',
  firstName: 'recipeController',
  lastName: 'recipeController'
};

const testRecipe = {
  title: 'recipeController',
  description: 'recipeController',
  author: mockObjectId,
  cookingTime: 10,
  public: true
};

describe('Recipe Controller Tests', () => {
  let userId = '';
  let recipeId = '';

  let mockRequest: Partial<Request>;

  const mockResponse: Partial<Response> = {
    success: jest.fn().mockReturnValue(this)
  };

  const mockNext = jest.fn();

  beforeAll(async () => {
    await dbHandler.connect();
    const user = await new User(testUser).save();
    userId = user.id;

    const recipe = await new Recipe({ ...testRecipe, author: userId }).save();
    recipeId = recipe.id;
  });

  afterAll(async () => {
    await User.deleteMany({ auth0Id: testUser.auth0Id });
    await dbHandler.closeDatabase();
  });

  it('It should create a recipe', async () => {
    const newTitle = 'New recipe controller recipe';

    mockRequest = {
      user: {
        sub: testUser.auth0Id,
        id: userId
      },
      body: {
        ...testRecipe,
        title: newTitle,
        author: userId
      }
    };

    await recipeController.createRecipe(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);

    await Recipe.deleteMany({ title: newTitle });
  });

  it('It should update a recipe', async () => {
    const updatedTitle = 'Updated title recipe controller tests';

    mockRequest = {
      user: {
        sub: testUser.auth0Id,
        id: userId
      },
      params: {
        recipeId
      },
      body: {
        ...testRecipe,
        title: updatedTitle,
        author: userId
      }
    };

    await recipeController.updateRecipe(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);
  });

  it('It should get a recipe', async () => {
    mockRequest = {
      params: {
        recipeId
      }
    };

    await recipeController.getRecipe(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);
  });

  it('It should get paginated list of public recipes', async () => {
    mockRequest = {
      pagination: {
        limit: 10,
        skip: 0,
        page: 1
      }
    };

    await recipeController.getPublicList(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);
  });

  it('It should get auth user recipes', async () => {
    mockRequest = {
      user: {
        sub: testUser.auth0Id,
        id: userId
      },
      pagination: {
        limit: 10,
        skip: 0,
        page: 1
      }
    };

    await recipeController.getAuthUserRecipes(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);
  });

  it('It should get the specified users recipes', async () => {
    mockRequest = {
      user: {
        sub: testUser.auth0Id,
        id: userId
      },
      params: {
        userId
      },
      pagination: {
        limit: 10,
        skip: 0,
        page: 1
      }
    };

    await recipeController.getUserRecipes(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.success).toBeCalledTimes(1);
  });
});
