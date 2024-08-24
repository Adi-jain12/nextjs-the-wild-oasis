// routes/auth.js

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Sign-In route
router.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password are required' });
	}

	try {
		// Fetch the user from the database
		const user = await prisma.guests.findUnique({ where: { email } });

		if (user && user.password) {
			// Compare the provided password with the hashed password stored in the database
			const isMatch = await bcrypt.compare(password, user.password);

			if (isMatch) {
				// Generate JWT token
				const token = jwt.sign(
					{ userId: user.id },
					process.env.JWT_SECRET as string, // Ensure this environment variable is set
					{ expiresIn: '1d' }
				);

				// Set token in a cookie
				res.cookie('auth_token', token, {
					httpOnly: true,
					secure: true,
					maxAge: 86400000, // 1 day
				});

				// Respond with user ID
				return res.status(200).json({ id: user.id });
			} else {
				return res.status(401).json({ error: 'Invalid email or password' });
			}
		} else {
			return res.status(401).json({ error: 'Invalid email or password' });
		}
	} catch (error) {
		return res.status(500).json({ error: 'Internal server error' });
	}
});

// Sign-Up route
router.post('/signup', async (req, res) => {
	const { email, password, fullName } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.guests.create({
			data: {
				email,
				fullName,
				password: hashedPassword,
			},
		});

		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET as string,
			{ expiresIn: '1d' }
		);

		// Set token in a cookie
		res.cookie('auth_token', token, {
			httpOnly: true,
			secure: true,
			maxAge: 86400000, // 1 day
		});
		res.status(201).json({ token, user });
	} catch (error) {
		res.status(400).json({ error: 'User already exists' });
	}
});

export default router;
