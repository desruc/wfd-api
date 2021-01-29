import Joi from 'joi';

export const login = Joi.object().keys({
  email: Joi.string().email().required().messages({
    'any.required': 'You must supply an email.'
  }),
  password: Joi.string().required().messages({
    'any.required': 'You must supply a password.'
  })
});

export default login;
