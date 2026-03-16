import { BranchRepository } from '@/repositories/BranchRepository';
import { BranchDTO } from '@/dto/BranchDTO';
import { BranchList } from '@/types/BranchServiceTypes';
/**
 *
 * Service class responsible for fetching branch data.
 * Acts as an intermediary between the controller and the repository layer.
 *
 */
export class BranchService {
  /**
   * @param repo - Repository instance for accessing branch data.
   */
  constructor(private repo: BranchRepository) {}
  /**
   * Fetch all branches, optionally filtered by city and paginated.
   *
   * @param city - Optional city name to filter branches (case-insensitive).
   * @param page - Page number for pagination (default is 1).
   * @param limit - Number of branches per page (default is 10).
   *
   * @returns An object {@link BranchList} containing:
   *   - data: Array of {@link BranchDTO} for the requested page and filter.
   *   - total: Total number of branches matching the filter (before pagination).
   *
   */
  async fetchAllBranches(city?: string, page = 1, limit = 10): Promise<BranchList> {
    return await this.repo.getBranches(city, page, limit);
  }

  /**
   *
   * Fetch a single branch by its ID.
   *
   * @param id - The numeric/string ID of the branch to fetch.
   *
   * @returns {Promise<{BranchDTO} | undefined>} The branch matching the given ID,
   * or undefined if no branch is found.
   *
   */
  async fetchBranchById(id: string): Promise<BranchDTO | undefined> {
    return await this.repo.getBranchById(id);
  }
}
