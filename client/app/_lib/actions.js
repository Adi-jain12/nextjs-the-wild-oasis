'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';

import { redirect } from 'next/navigation';
import { getBookings } from './api-client';

export async function createBooking(bookingData, formData) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in');

	const newBooking = {
		...bookingData,
		guestId: session.user.guestId,
		numGuests: Number(formData.get('numGuests')),
		observations: formData.get('observations').slice(0, 1000),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: 'unconfirmed',
	};

	const response = await fetch(`${API_BASE_URL}/api/v1/booking`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newBooking),
	});

	if (!response.ok) {
		throw new Error('Booking could not be created');
	}

	revalidatePath(`/cabins/${bookingData.cabinId}`);

	redirect('/cabins/success');
}

export async function updateGuest(formData) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in');

	const nationalID = formData.get('nationalID');
	const [nationality, countryFlag] = formData.get('nationality').split('%');

	// regex for validaton in server side
	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
		throw new Error('Please provide a valid national ID');

	const updateData = { nationality, countryFlag, national_id: nationalID };

	const response = await fetch(
		`${API_BASE_URL}/api/v1/guest/${session.user.guestId}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateData),
		}
	);

	if (!response.ok) {
		throw new Error('Booking could not be updated');
	}

	revalidatePath('/account/profile');
}

export async function deleteBooking(bookingId) {
	const session = await auth();

	if (!session) throw new Error('You must be logged in');

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingIds.includes(bookingId))
		throw new Error('You are not allowed to delete this booking');

	const response = await fetch(`${API_BASE_URL}/api/v1/booking/${bookingId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) throw new Error('Booking could not be deleted');

	revalidatePath('/account/reservations');
}

export async function updateBooking(formData) {
	const bookingId = Number(formData.get('bookingId')); // getting bookingId from hidden input in form

	const session = await auth();
	if (!session) throw new Error('You must be logged in');

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingIds.includes(bookingId))
		throw new Error('You are not allowed to update this booking');

	const updateData = {
		numGuests: Number(formData.get('numGuests')),
		observations: formData.get('observations').slice(0, 1000), // using slice() method to get only 1000 words so that user wont be able to spam the text box with more than 1000 words
	};

	const response = await fetch(`${API_BASE_URL}/api/v1/booking/${bookingId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updateData),
	});

	if (!response.ok) {
		throw new Error('Booking could not be updated');
	}

	revalidatePath(`/account/reservations/edit/${bookingId}`);
	revalidatePath('/account/reservations');

	redirect('/account/reservations');
}

export const signInAction = async () => {
	await signIn('google', { redirectTo: '/account' });
};

export const signOutAction = async () => {
	await signOut({ redirectTo: '/' });
};
