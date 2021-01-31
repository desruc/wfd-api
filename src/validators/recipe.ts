import Joi from 'joi';

export const create = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().allow(null, ''),
  author: Joi.string().required(),
  public: Joi.boolean(),
  tags: Joi.array().items(Joi.string()),
  ingredients: Joi.array().items(Joi.string()),
  instructions: Joi.array().items(Joi.string()),
  time: Joi.string().required()
});

export default create;