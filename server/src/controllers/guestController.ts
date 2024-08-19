import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getGuest = async (req: Request, res: Response): Promise<void> => {
	const email = req.query.email as string | undefined;

	try {
		const guest = await prisma.guests.findUnique({
			where: {
				email: email,
			},
		});

		if (!guest) throw new Error('Error fetching guest');

		res.json(guest);
	} catch (error) {
		res.status(500).json({ message: 'Error getting guest' });
	}
};

export const createGuest = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { email, fullName } = req.body;

		const guest = await prisma.guests.create({
			data: {
				email,
				fullName,
			},
		});

		res.status(201).json(guest);
	} catch (error) {
		res.status(500).json({ message: 'Error creating product' });
	}
};

export const updateGuest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;
	const updatedFields = req.body;

	try {
		const guest = await prisma.guests.update({
			where: { id: Number(id) },
			data: updatedFields,
		});

		res.json(guest);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Guest could not be updated' });
	}
};
