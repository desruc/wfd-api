import { v4 as uuidv4 } from 'uuid';

import catchErrors from '../core/asyncCatch';

import Recipe from '../models/recipeModel';

export const createRecipe = catchErrors(async (req, res) => {
  const newRecipe = await new Recipe({ uuid: uuidv4(), ...req.body }).save();
  res.success({ message: 'Recipe created successfully!', data: newRecipe });
});

export const getRecipe = catchErrors(async (req, res) => {
  const { uuid } = req.params;
  const result = await Recipe.findOne({ uuid });
  res.success({ message: 'Recipe retrieved successfully', data: result });
});

export const getPublicList = catchErrors(async (req, res) => {
  const { page, skip, limit } = req.pagination;

  const filter = { public: true };

  const total = await Recipe.countDocuments(filter);
  const results = await Recipe.find(filter).skip(skip).limit(limit);

  res.success({
    message: 'Receipes retrieved successfully',
    data: results,
    meta: { page, limit, total }
  });
});
