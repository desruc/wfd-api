import Joi from 'joi';

import validateData from '~/core/validator';

describe('Validate Tests', () => {
  const testSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'You must supply an email.'
    })
  });

  /* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */

  it('It should validate and return the email', () => {
    const result = validateData(testSchema, { email: 'email@email.com' });
    expect(result?.email).toBe('email@email.com');
  });

  it('It should throw a custom error with invalid email', () => {
    try {
      validateData(testSchema, { email: 'email' });
    } catch (e) {
      const { errors } = e;
      expect(errors?.email[0]).toEqual('"email" must be a valid email');
    }
  });

  it('It should throw a custom error with email required', () => {
    try {
      validateData(testSchema, {});
    } catch (e) {
      const { errors } = e;
      expect(errors?.email[0]).toEqual('You must supply an email.');
    }
  });
});
