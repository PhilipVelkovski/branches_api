import { BranchDTO } from '@/dto/BranchDTO';

export interface BranchList {
  data: BranchDTO[];
  total: number;
}