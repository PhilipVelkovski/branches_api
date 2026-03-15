import { Request, Response, NextFunction } from 'express';
/**
 * Custom 404 response.
 * 
 * @param req Express Reqeust.
 * @param res Express Response.
 * @param next Express NextFunction.
 */
export default function NotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl,
  });
}
