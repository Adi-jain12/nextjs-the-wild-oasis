import { Router } from 'express';
import {
	createGuest,
	getGuest,
	updateGuest,
} from '../controllers/guestController';

const router = Router();

router.post('/getGuest', getGuest);
router.post('/', createGuest);
router.patch('/:id', updateGuest);

export default router;
