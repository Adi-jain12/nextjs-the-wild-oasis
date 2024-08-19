import { Router } from 'express';
import {
	getCabin,
	getCabinPrice,
	getCabins,
} from '../controllers/cabinController';

const router = Router();

router.get('/', getCabins);
router.get('/:id', getCabin);
router.get('/price/:id', getCabinPrice);

export default router;
