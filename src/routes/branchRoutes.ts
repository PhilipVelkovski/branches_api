import { Router } from 'express';
import { getAllBranches, getBranchById } from '@/controllers/BranchController';

const router = Router();

// GET /api/branches
router.get('/', getAllBranches);

// GET /api/branches/:id
router.get('/:id', getBranchById);

export default router;