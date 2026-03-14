import { Router } from 'express';
import { BranchController } from '@/controllers/BranchController';
import { BranchService } from '@/services/BranchService';
import { InMemoryBranchRepository } from '@/repositories/InMemoryBranchRepository';
import { validateBranchQuery, validateBranchId } from '@/middleware/BranchValidation';

const router = Router();

/* Setup */
const repo = new InMemoryBranchRepository();
const service = new BranchService(repo);
const controller = new BranchController(service);

// GET /api/branches?city=&page=&limit=
router.get('/', validateBranchQuery, (req, res) => controller.getBranches(req, res));

// GET /api/branches/:id
router.get('/:id', validateBranchId, (req, res) => controller.getBranchById(req, res));

export default router;