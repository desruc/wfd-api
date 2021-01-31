import { Schema } from 'joi';
import { RequestHandler } from 'express';

import asyncCatch from '~/core/catchErrors';

import validator from '~/core/validator';

export default (schema: Schema): RequestHandler =>
  asyncCatch((req, _, next): void => {
    /**
     * Validation method strips unknown values so it is safe to reassign
     * req.body to the sanitized payload (and disable eslint)
     */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return */
    const validated = validator(schema, req.body);
    req.body = validated; // eslint-disable-line
    next();
  });
