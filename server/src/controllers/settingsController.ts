import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSettings = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const settings = await prisma.settings.findFirst();

		if (!settings) {
			throw new Error('Settings could not be found');
		}

		res.json(settings);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error getting settings' });
	}
};
