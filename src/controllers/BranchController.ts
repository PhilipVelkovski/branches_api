/**
 * Controller for handling Branch-related HTTP requests.
 * Provides endpoints to fetch all branches with optional filtering and pagination.
 */

import { Request, Response } from 'express';
import { ApiResponse } from '@/dto/ApiResponseDTO';
import { BranchDTO } from '@/dto/BranchDTO';
import { BranchService } from '@/services/BranchService';

export class BranchController {
  constructor(private service: BranchService) {}

  /**
   * GET /branches
   *
   * Fetch all branches with optional filtering by city and pagination.
   *
   * @param req - Express request object, expected to have validated query parameters.
   * @param res - Express Response Object.
   *
   * @returns JSON response with {@link BranchDTO} array type:
   *   - success: true, data: BranchDTO[] for the requested page and filter, HTTP 200
   *   - success: false, error message if something went wrong
   *   - includes pagination info: page, limit, total
   */
  async getBranches(req: Request, res: Response) {
    const { city, page, limit } = req.validatedQuery!;

    const branches = await this.service.fetchAllBranches(city, page, limit);

    const response: ApiResponse<BranchDTO[]> = {
      success: true,
      data: branches.data,
      page,
      limit,
      total: branches.total,
    };

    res.json(response);
  }

  /**
   * GET /branches/:id
   *
   * Fetch a single branch by its numeric ID.
   *
   * Expects the request to have validated parameters via middleware.
   *
   * @param req - Express request object, expected to have `validatedParams`.
   * @param res - Express Response Object.
   *
   * @returns JSON response with either:
   *   - success: true, data: {@link BranchDTO} for the found branch, HTTP 200
   *   - success: false, error message, HTTP 404 if branch not found
   */
  async getBranchById(req: Request, res: Response) {
    const { id } = req.validatedParams!;

    const branch = await this.service.fetchBranchById(id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        error: 'Branch not found',
      });
    }

    const response: ApiResponse<BranchDTO> = {
      success: true,
      data: branch,
    };

    res.json(response);
  }
}
