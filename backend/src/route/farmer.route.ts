import { Router } from 'express';
import { protect, requireRole } from '../guard/protect.guard';
import {
    registerFarmer,
    lookupByTag,
    listFarmers,
    getFarmer,
    updateFarmer,
    deactivateFarmer,
} from '../controller/farmer.controller';

const router = Router();
router.use(protect);

router.get('/', listFarmers);
router.post('/', requireRole('officer', 'admin'), registerFarmer);
router.get('/by-tag/:tag', lookupByTag);
router.get('/:id', getFarmer);
router.patch('/:id', requireRole('officer', 'admin'), updateFarmer);
router.delete('/:id', requireRole('admin'), deactivateFarmer);

export default router;
