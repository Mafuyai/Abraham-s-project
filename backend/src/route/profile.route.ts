import { Router } from 'express';
import { protect } from '../guard/protect.guard';
import { getProfile, updateProfile } from '../controller/profile.controller';

const router = Router();
router.use(protect);
router.get('/', getProfile);
router.patch('/', updateProfile);

export default router;
