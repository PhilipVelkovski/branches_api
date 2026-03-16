import { Request, Response, NextFunction } from 'express';
/**
 * Custom 500 response.
 * Logs errors to STDOUT.
 *
 * @param req Express Reqeust.
 * @param res Express Response.
 * @param next Express NextFunction.
 */
export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
}
