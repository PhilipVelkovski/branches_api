import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Query schema
const branchQuerySchema = z.object({
  city: z
    .string()
    .optional()
    .transform((s) => s?.trim() || undefined),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

// Path param schema
const branchIdSchema = z.object({
  id: z.string().min(1, 'Branch ID is required'),
});

// Extend Express Request to include validated data
declare module 'express-serve-static-core' {
  interface Request {
    validatedQuery?: z.infer<typeof branchQuerySchema>;
    validatedParams?: z.infer<typeof branchIdSchema>;
  }
}

// Middleware for query params
export const validateBranchQuery = (req: Request, res: Response, next: NextFunction) => {
  const parsed = branchQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error.issues[0].message });
  }
  req.validatedQuery = parsed.data;
  next();
};

// Middleware for path params
export const validateBranchId = (req: Request, res: Response, next: NextFunction) => {
  const parsed = branchIdSchema.safeParse(req.params);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error.issues[0].message });
  }
  req.validatedParams = parsed.data;
  next();
};
