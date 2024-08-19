'use client';

import { useOptimistic } from 'react';
import { deleteBooking } from '../_lib/actions';
import ReservationCard from './ReservationCard';

const ReservationList = ({ bookings }) => {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(prevBookings, bookingId) => {
			return prevBookings.filter((booking) => booking.id !== bookingId);
		}
	);

	const handleDeleteReservation = async (bookingId) => {
		optimisticDelete(bookingId);
		await deleteBooking(bookingId);
	};

	return (
		<ul className="space-y-6">
			{optimisticBookings.map((booking) => (
				<ReservationCard
					booking={booking}
					key={booking.id}
					onDelete={handleDeleteReservation}
				/>
			))}
		</ul>
	);
};

export default ReservationList;
