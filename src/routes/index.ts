import { Router } from "express";
import branchRoutes from "@/routes/BranchRoutes";
// auth if needed can live here so all routes share same.   
const router = Router();

router.use("/branches", branchRoutes);
export default router;