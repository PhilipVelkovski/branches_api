import { Request, Response } from 'express';
import { ApiResponse } from '@/types/ApiResponse';
import { Branch } from '@/models/Branch';
import { fetchAllBranches, fetchBranchById } from '@/services/branchService';
import { z } from 'zod';

const branchIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Branch ID must be numeric'),
});

export const getAllBranches = (req: Request, res: Response): Response => {
  const { city, page = '1', limit = '10' } = req.query;

  let branches = fetchAllBranches();

  // filtering
  if (city && typeof city === 'string') {
    branches = branches.filter((branch) => branch.city.toLowerCase() === city.toLowerCase());
  }

  // pagination
  const pageNumber = parseInt(page as string);
  const limitNumber = parseInt(limit as string);

  const start = (pageNumber - 1) * limitNumber;
  const end = start + limitNumber;

  const paginatedBranches = branches.slice(start, end);

  const response: ApiResponse<Branch[]> = {
    success: true,
    data: paginatedBranches,
  };

  return res.json(response);
};
export const getBranchById = (req: Request, res: Response): Response => {
  const validation = branchIdSchema.safeParse(req.params);

  if (!validation.success) {
    const response: ApiResponse<null> = {
      success: false,
      error: validation.error.issues[0].message,
    };

    return res.status(400).json(response);
  }

  const branch = fetchBranchById(req.params.id.toString());

  if (!branch) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Branch not found',
    };

    return res.status(404).json(response);
  }

  const response: ApiResponse<Branch> = {
    success: true,
    data: branch,
  };

  return res.json(response);
};
