import { Router } from 'express';
import { protect, requireRole } from '../guard/protect.guard';
import {
    createDistribution,
    listDistributions,
    getDistribution,
    farmerHistory,
} from '../controller/distribution.controller';

const router = Router();
router.use(protect);

router.get('/', listDistributions);
router.post('/', requireRole('officer', 'admin'), createDistribution);
router.get('/farmer/:farmerId', farmerHistory);
router.get('/:id', getDistribution);

export default router;
