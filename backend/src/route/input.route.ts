import { Router } from 'express';
import { protect, requireRole } from '../guard/protect.guard';
import {
    listInputs,
    getInput,
    createInput,
    updateInput,
    adjustStock,
} from '../controller/input.controller';

const router = Router();
router.use(protect);

router.get('/', listInputs);
router.get('/:id', getInput);
router.post('/', requireRole('admin'), createInput);
router.patch('/:id', requireRole('admin'), updateInput);
router.post('/:id/stock', requireRole('admin'), adjustStock);

export default router;
