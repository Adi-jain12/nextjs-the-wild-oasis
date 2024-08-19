import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCabins = async (req: Request, res: Response): Promise<void> => {
	try {
		const cabins = await prisma.cabins.findMany();

		res.json(cabins);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error getting cabins' });
	}
};

export const getCabin = async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;

	try {
		const cabin = await prisma.cabins.findUnique({
			where: { id: Number(id) },
		});

		res.json(cabin);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error loading cabin' });
	}
};

export const getCabinPrice = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;

	try {
		const cabin = await prisma.cabins.findUnique({
			where: { id: Number(id) },
			select: {
				regularPrice: true,
				Discount: true,
			},
		});

		res.json(cabin);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error getting cabin price' });
	}
};
