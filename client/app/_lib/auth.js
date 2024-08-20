import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './api-client';

const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized({ auth, request }) {
			return !!auth?.user;
		},
		async signIn({ user, account, profile }) {
			try {
				const existingGuest = await getGuest(user.email);

				if (!existingGuest)
					await createGuest({ email: user.email, fullName: user.name });

				// If getGuest() returns a guest from database i.e existing guest in database, then this func signIn will return true
				return true;
			} catch {
				// If getGuest() returns null i.e no existing guest in database, then this func signIn will return false
				return false;
			}
		},
		async session({ session, user }) {
			const guest = await getGuest(session.user.email);
			session.user.guestId = guest.id; // creating new property in session and assigning the guest id coming from database to it
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export const {
	auth,
	signIn,
	signOut,
	// handlers: { GET, POST },
} = NextAuth(authConfig);
