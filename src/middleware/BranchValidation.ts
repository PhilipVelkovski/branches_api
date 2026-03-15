import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

/**
 * Schema for validating query parameters on /api/branches
 */
const branchQuerySchema = z.object({
  city: z
    .string()
    .optional()
    .transform((s) => s?.trim() || undefined),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

/**
 * Schema for validating path parameter `id` on /api/branches/:id
 */
const branchIdSchema = z.object({
  id: z.string().trim().min(1, 'Branch ID is required'),
});

/**
 * Extend Express Request to include validated data
 */
declare module 'express-serve-static-core' {
  interface Request {
    /** Validated query parameters after passing validateBranchQuery */
    validatedQuery?: z.infer<typeof branchQuerySchema>;
    /** Validated path parameters after passing validateBranchId */
    validatedParams?: z.infer<typeof branchIdSchema>;
  }
}

/**
 * Middleware to validate query parameters for /api/branches
 * 
 * Usage:
 * app.get('/api/branches', validateBranchQuery, handler)
 * 
 * On success: attaches `req.validatedQuery` with parsed values
 * On failure: responds with 400 and first validation error
 */
export const validateBranchQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = branchQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ success: false, error: parsed.error.issues[0].message });
  }
  req.validatedQuery = parsed.data;
  next();
};

/**
 * Middleware to validate path parameter `id` for /api/branches/:id
 * 
 * Usage:
 * app.get('/api/branches/:id', validateBranchId, handler)
 * 
 * On success: attaches `req.validatedParams` with parsed values
 * On failure: responds with 400 and first validation error
 */
export const validateBranchId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = branchIdSchema.safeParse(req.params);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ success: false, error: parsed.error.issues[0].message });
  }
  req.validatedParams = parsed.data;
  next();
};