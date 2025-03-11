import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { wrapHttpResponse } from '../../common/helpers/wrap-http-response';

/**
 * Middleware to validate the request body/params using express-validator
 * and return a 400 response if the validation fails
 * @param req
 * @param res
 * @param next
 */

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    res.status(400).json(wrapHttpResponse({}, 'Fields validation failed'));
    return;
  }
};
