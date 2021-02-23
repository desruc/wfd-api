import Joi from 'joi';

export const update = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
});

export default update;
