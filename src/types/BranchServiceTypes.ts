import { BranchDTO } from '@/dto/BranchDTO';

/**
 * Return type of `getBranches` method in {@link BranchRepository}.
 *
 * Represents a paginated list of branches.
 */
export interface BranchList {
  /** Array of branch data objects for the current page */
  data: BranchDTO[];
  /** Total number of branches matching the filter (ignoring pagination) */
  total: number;
}
