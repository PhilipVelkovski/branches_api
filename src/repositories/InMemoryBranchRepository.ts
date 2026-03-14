import { BranchRepository } from '@/repositories/BranchRepository';
import { BranchDTO } from '@/dto/BranchDTO';
import branches from '@/data/branches.json';
import { BranchList } from '@/types/BranchServiceTypes';

/**
 * In-memory implementation of the BranchRepository.
 * Stores branch data in memory using a static JSON dataset.
 * Suitable for development, testing, or mock purposes.
 */
export class InMemoryBranchRepository implements BranchRepository {
  /** Internal in-memory storage for branch data */
  private data: BranchDTO[] = branches;

  /**
   * Fetch branches optionally filtered by city, with pagination.
   *
   * @param city - Optional city name to filter branches (case-insensitive).
   * @param page - Page number for pagination (default is 1).
   * @param limit - Number of branches per page (default is 10).
   *
   * @returns A Promise resolving to a {@link BranchList} object containing:
   *   - `data`: Array of BranchDTO objects for the requested page and filter.
   *   - `total`: Total number of branches matching the filter (before pagination).
   */
  async getBranches(
    city?: string,
    page = 1,
    limit = 10,
  ): Promise<BranchList> {
    let filtered = this.data;
    if (city) {
      filtered = this.data.filter((b) => b.city.toLowerCase() === city.toLowerCase());
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: filtered.slice(start, end),
      total,
    };
  }

  /**
   * Fetch a single branch by its ID.
   *
   * @param id - Unique identifier of the branch.
   * @returns A Promise resolving to the {@link BranchDTO} if found, or undefined if no branch matches the ID.
   */
  async getBranchById(id: string): Promise<BranchDTO | undefined> {
    return this.data.find((b) => b.id === id);
  }
}