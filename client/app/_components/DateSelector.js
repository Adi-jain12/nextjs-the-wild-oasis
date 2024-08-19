'use client';

import {
	differenceInDays,
	isPast,
	isSameDay,
	isWithinInterval,
} from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useReservation } from '../_context/ReservationContext';

function isAlreadyBooked(range, datesArr) {
	return (
		range.from &&
		range.to &&
		datesArr.some((date) =>
			isWithinInterval(date, { start: range.from, end: range.to })
		)
	);
}

function DateSelector({ settings, cabin, bookedDates }) {
	const { range, handleSetRange, resetRange } = useReservation();

	const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

	const { regularPrice, Discount } = cabin;

	const numNights = differenceInDays(displayRange.to, displayRange.from);
	const cabinPrice = numNights * (regularPrice - Discount);

	const { minBookingLength, maxBookingLength } = settings;

	return (
		<div className="flex flex-col justify-between">
			<DayPicker
				className="rdp pt-8 place-self-center"
				mode="range"
				onSelect={(range) => {
					if (
						range &&
						range.from &&
						range.to &&
						isSameDay(range.from, range.to)
					) {
						return;
					}
					handleSetRange(range);
				}}
				selected={displayRange}
				min={minBookingLength - 1}
				max={maxBookingLength}
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 5}
				captionLayout="dropdown"
				numberOfMonths={1}
				disabled={
					(curDate) =>
						isPast(curDate) ||
						bookedDates.some((date) => isSameDay(date, curDate)) // using date-fns methods
				}
			/>

			<p className="flex justify-center">
				<span className="text-base font-bold underline underline-offset-4 mr-2">
					Please note:{' '}
				</span>
				The minimum stay for booking at this cabin is {minBookingLength} days.
			</p>

			<div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
				<div className="flex items-baseline gap-6">
					<p className="flex gap-2 items-baseline">
						{Discount > 0 ? (
							<>
								<span className="text-2xl">₹{regularPrice - Discount}</span>
								<span className="line-through font-semibold text-primary-700">
									₹{regularPrice}
								</span>
							</>
						) : (
							<span className="text-2xl">₹{regularPrice}</span>
						)}
						<span className="">/night</span>
					</p>
					{numNights ? (
						<>
							<p className="bg-accent-600 px-3 py-2 text-2xl">
								<span>&times;</span> <span>{numNights}</span>
							</p>
							<p>
								<span className="text-lg font-bold uppercase">Total</span>{' '}
								<span className="text-2xl font-semibold">₹{cabinPrice}</span>
							</p>
						</>
					) : null}
				</div>

				{range.from || range.to ? (
					<button
						className="border border-primary-800 py-2 px-4 text-sm font-semibold"
						onClick={resetRange}
					>
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
}

export default DateSelector;
