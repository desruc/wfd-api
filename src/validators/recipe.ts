import Joi from 'joi';

export const create = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().allow(null, ''),
  author: Joi.string().required(),
  public: Joi.boolean(),
  tags: Joi.array().items(Joi.string()),
  ingredients: Joi.array().items(
    Joi.object().keys({
      qty: Joi.string().allow(null, ''),
      name: Joi.string().required()
    })
  ),
  instructions: Joi.string(),
  prepTime: Joi.string().allow(null, ''),
  cookingTime: Joi.string().required(),
  originalUrl: Joi.string().uri().allow(null, ''),
  difficulty: Joi.string()
    .valid('easy', 'moderate', 'difficult')
    .allow(null, '')
});

export const rating = Joi.object().keys({
  score: Joi.number().required()
});

export const update = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().allow(null, ''),
  public: Joi.boolean(),
  tags: Joi.array().items(Joi.string()),
  ingredients: Joi.array().items(
    Joi.object().keys({
      qty: Joi.string().allow(null, ''),
      name: Joi.string().required()
    })
  ),
  instructions: Joi.string(),
  prepTime: Joi.string().allow(null, ''),
  cookingTime: Joi.string().required(),
  originalUrl: Joi.string().uri().allow(null, ''),
  difficulty: Joi.string()
    .valid('easy', 'moderate', 'difficult')
    .allow(null, '')
});

export default create;
