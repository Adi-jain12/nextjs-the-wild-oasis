'use client';

import { differenceInDays } from 'date-fns';
import { useReservation } from '../_context/ReservationContext';
import { createBooking } from '../_lib/actions';
import SubmitButton from './SubmitButton';

function ReservationForm({ cabin, user }) {
	const { range, resetRange } = useReservation();

	const { maxCapacity, regularPrice, Discount, id } = cabin;

	const startDate = range.from;
	const endDate = range.to;

	const numNights = differenceInDays(endDate, startDate);

	const cabinPrice = numNights * (regularPrice - Discount);

	const bookingData = {
		startDate,
		endDate,
		numNights,
		cabinPrice,
		cabinId: id,
	};

	// In bind method on createBooking server action the first argument will always be the second argument in below bind method.
	// So even the first argument in bind method is null and second is bookingData, the first argument in server action i.e createBooking will receive bookingData as the first argument and then in last the formData. Thus ignoring the null
	const createBookingWithData = createBooking.bind(null, bookingData);

	return (
		<div>
			<div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
				<p>Logged in as</p>

				<div className="flex gap-4 items-center">
					{/* <img
						// Important to display google profile images
						referrerPolicy="no-referrer"
						className="h-8 rounded-full"
						src={user.image}
						alt={user.name}
					/> */}
					<p>{user.name}</p>
				</div>
			</div>

			<form
				action={async (formData) => {
					await createBookingWithData(formData);
					resetRange();
				}}
				className="bg-primary-900 py-20 px-16 text-lg flex gap-8 flex-col"
			>
				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="numGuests"
						id="numGuests"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						required
					>
						<option value="" key="">
							Select number of guests...
						</option>
						{Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
							<option value={x} key={x}>
								{x} {x === 1 ? 'guest' : 'guests'}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label htmlFor="observations">
						Anything we should know about your stay?
					</label>
					<textarea
						name="observations"
						id="observations"
						required
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						placeholder="Any pets, allergies, special requirements, etc.?"
					/>
				</div>

				<div className="flex justify-end items-center gap-6">
					{!(startDate && endDate) ? (
						<p className="text-primary-300 text-base px-8 py-4">
							Start by selecting dates
						</p>
					) : (
						<SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
					)}
				</div>
			</form>
		</div>
	);
}

export default ReservationForm;
