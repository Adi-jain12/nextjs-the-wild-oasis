import { Router } from 'express';
import { getSettings } from '../controllers/settingsController';

const router = Router();

router.get('/', getSettings);

export default router;
