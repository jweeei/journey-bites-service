/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { z, ZodError } from 'zod';

import { createResponse } from '@/utils/http';
import ErrorCode from '@/exceptions/ErrorCode';

const validateData: (schema: z.ZodObject<any, any>) => RequestHandler = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));

        createResponse(res, {
          httpCode: 400,
          errorCode: ErrorCode.ILLEGAL_PAYLOAD,
          message: 'Invalid field',
          data: errorMessages,
        });
      } else {
        createResponse(res, {
          httpCode: 500,
          errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        });
      }
    }
  };
};

export default validateData;
