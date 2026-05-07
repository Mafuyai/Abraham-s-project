import { Router } from 'express';
import { protect, requireRole } from '../guard/protect.guard';
import { listOfficers, getOfficer } from '../controller/officer.controller';

const router = Router();
router.use(protect, requireRole('admin'));

router.get('/', listOfficers);
router.get('/:id', getOfficer);

export default router;
