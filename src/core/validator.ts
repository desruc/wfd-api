import { Schema } from 'joi';
import { RequestHandler } from 'express';

import asyncCatch from './asyncCatch';
import CustomError from './customError';
import { CORE_UNPROCESSABLE_ENTITY } from '../errors/core';

/**
 * Validates the body of the request against the joi schema. Either returns a
 * sanitized body or throws a CustomError with the fields that failed validation
 * @param schema joi validation object
 * @param data The body of the request
 */
const validateData = (schema: Schema, data: { [key: string]: string }): any => {
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

export default (schema: Schema): RequestHandler =>
  asyncCatch((_req, _, next): void => {
    const { body } = _req;
    /**
     * Validation method strips unknown values so it is safe to reassign
     * _req.body to the sanitized payload (and disable eslint)
     */
    const validated = validateData(schema, body);
    _req.body = validated; // eslint-disable-line
    next();
  });
