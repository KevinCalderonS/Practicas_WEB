import { Router } from 'express';
import { createDonante, getDonantes } from './controller';

const router = Router();

router.post('/', createDonante);
router.get('/', getDonantes);

export default router;