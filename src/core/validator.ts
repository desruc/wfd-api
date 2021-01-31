import { Schema } from 'joi';

import CustomError from '~/core/customError';

import { CORE_UNPROCESSABLE_ENTITY } from '~/errors/core';

/**
 * Validates the body of the request against the joi schema. Either returns a
 * sanitized body or throws a CustomError with the fields that failed validation
 * @param schema joi validation object
 * @param data The body of the request
 */
const validateData = (schema: Schema, data: { [key: string]: any }): any => {
  // joi package has explicit 'any' type on 'value' - safe to disable eslint
  /* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return */
  const { value, error: validationErrors } = schema.validate(data, {
    stripUnknown: true,
    abortEarly: false
  });

  if (validationErrors) {
    const computedErrors: { [key: string]: string[] } = {};

    validationErrors.details.forEach((e) => {
      const key = e.context?.key || 'noContext';
      computedErrors[key] = computedErrors[key]
        ? [...computedErrors[key], e.message]
        : [e.message];
    });

    throw new CustomError(CORE_UNPROCESSABLE_ENTITY, computedErrors);
  }
  return value;
};

export default validateData;
