import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { eachDayOfInterval } from 'date-fns';

const prisma = new PrismaClient();

export const getAllBookings = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;
	try {
		const bookings = await prisma.bookings.findMany({
			where: { guestId: Number(id) },
			select: {
				id: true,
				created_at: true,
				startDate: true,
				endDate: true,
				numNights: true,
				numGuests: true,
				totalPrice: true,
				guestId: true,
				cabinId: true,
				cabin: {
					select: {
						name: true,
						image: true,
					},
				},
			},
			orderBy: {
				startDate: 'asc',
			},
		});

		res.json(bookings);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Bookings could not be loaded' });
	}
};

export const getBooking = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;
		const bookings = await prisma.bookings.findMany({
			where: {
				id: Number(id),
			},
		});

		res.json(bookings);
	} catch (error) {
		res.status(500).json({ message: 'Error getting bookings' });
	}
};

export const getBookedDatesByCabinId = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;

	let today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	const todayISOString = today.toISOString();

	try {
		const bookings = await prisma.bookings.findMany({
			where: {
				cabinId: Number(id),
				OR: [
					{
						startDate: {
							gte: todayISOString,
						},
					},
					{
						status: 'Confirmed',
					},
				],
			},
		});

		const bookedDates = bookings
			.map((booking) => {
				return eachDayOfInterval({
					start: new Date(booking.startDate),
					end: new Date(booking.endDate),
				});
			})
			.flat();

		res.json(bookedDates);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error getting cabin booked dates' });
	}
};

export const createBooking = async (
	req: Request,
	res: Response
): Promise<void> => {
	const newBooking = req.body;

	try {
		const booking = await prisma.bookings.create({
			data: newBooking,
		});

		res.status(201).json(booking);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Booking not be created' });
	}
};

export const updateBooking = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updatedFields = req.body;

	try {
		const booking = await prisma.bookings.findUnique({
			where: { id: Number(id) },
		});

		if (!booking) {
			return res.status(404).json({ error: 'Booking not found' });
		}

		const updatedBooking = await prisma.bookings.update({
			where: { id: Number(id) },
			data: updatedFields,
		});

		res.json(updatedBooking);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Booking could not be updated' });
	}
};

export const deleteBooking = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;

	try {
		const deletedBooking = await prisma.bookings.delete({
			where: { id: Number(id) },
		});

		res.json(deletedBooking);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Booking could not be deleted' });
	}
};
