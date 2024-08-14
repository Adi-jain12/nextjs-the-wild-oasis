'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { getBookings } from './data-service';
import { redirect } from 'next/navigation';

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

	const { error } = await supabase.from('bookings').insert([newBooking]);

	if (error) throw new Error('Booking could not be created');

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

	console.log(updateData);

	const { data, error } = await supabase
		.from('guests')
		.update(updateData)
		.eq('id', session.user.guestId);

	if (error) throw new Error('Guest could not be updated');

	revalidatePath('/account/profile');
}

export async function deleteBooking(bookingId) {
	const session = await auth();
	if (!session) throw new Error('You must be logged in');

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingIds.includes(bookingId))
		throw new Error('You are not allowed to delete this booking');

	const { error } = await supabase
		.from('bookings')
		.delete()
		.eq('id', bookingId);

	if (error) throw new Error('Booking could not be deleted');

	revalidatePath('/account/reservations');
}

export async function updateReservation(formData) {
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

	const { error } = await supabase
		.from('bookings')
		.update(updateData)
		.eq('id', bookingId)
		.select()
		.single();

	if (error) throw new Error('Booking could not be updated');

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
