import { BranchDTO } from '@/dto/BranchDTO';
import { BranchList } from '@/types/BranchServiceTypes';

/**
 * Interface representing a repository for accessing branch data.
 * Implementations may fetch data from memory, JSON files, databases, etc.
 */
export interface BranchRepository {
  /**
   * Fetch branches optionally filtered by city, with pagination.
   *
   * @param city - Optional city name to filter branches (case-insensitive).
   * @param page - Page number for pagination (default is 1 if omitted).
   * @param limit - Number of branches per page (default is 10 if omitted).
   *
   * @returns A Promise resolving to a {@link BranchList} object containing:
   *   - `data`: Array of BranchDTO for the requested page and filter.
   *   - `total`: Total number of branches matching the filter (before pagination).
   */
  getBranches(city?: string, page?: number, limit?: number): Promise<BranchList>;

  /**
   * Fetch a single branch by its ID.
   *
   * @param id - The unique identifier of the branch.
   * @returns A Promise resolving to the BranchDTO if found, or undefined if not.
   */
  getBranchById(id: string): Promise<BranchDTO | undefined>;
}
