import { Router } from 'express';
import {
	createBooking,
	deleteBooking,
	getAllBookings,
	getBookedDatesByCabinId,
	getBooking,
	updateBooking,
} from '../controllers/bookingController';

const router = Router();

router.get('/allBookings/:id', getAllBookings);
router.get('/:id', getBooking);
router.post('/', createBooking);
router.patch('/:id', updateBooking);
router.delete('/:id', deleteBooking);
router.get('/cabin/:id', getBookedDatesByCabinId);

export default router;
