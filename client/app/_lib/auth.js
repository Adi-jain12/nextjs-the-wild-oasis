import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
	createGuest,
	getGuest,
	signInCredentials,
	signUpCredentials,
} from './api-client';

const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),

		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				name: { label: 'Name', type: 'text' },
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { name, email, password } = credentials;

				try {
					const existingGuest = await getGuest(email);

					if (existingGuest) {
						// Call the backend API for sign-in
						const user = await signInCredentials({ email, password });

						// If sign-in is successful, return user data
						if (user) {
							return user;
						}

						// If sign-in fails, return null
						return null;
					} else {
						// If guest doesn't exist, sign up the user
						const newUser = await signUpCredentials({ name, email, password });

						// If sign-up is successful, return new user data
						if (newUser) {
							return newUser;
						}

						// If sign-up fails, return null
						return null;
					}
				} catch (error) {
					// Handle any unexpected errors
					console.error('Error in authorize function:', error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
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
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			// Ensure session contains user information
			if (token) {
				session.user.id = token.id;

				// Fetch the guest information and attach it to the session
				try {
					const guest = await getGuest(session.user.email);
					if (guest) {
						session.user.guestId = guest.id;
					}
				} catch (error) {
					console.error('Failed to fetch guest information:', error);
				}
			}
			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
