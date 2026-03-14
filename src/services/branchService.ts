import branches from '@/data/branches.json';
import { Branch } from '@/models/Branch';

export const fetchAllBranches = (): Branch[] => {
  return branches;
};

export const fetchBranchById = (id: string): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};