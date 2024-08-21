'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { useState, useTransition } from 'react';
import SpinnerMini from './SpinnerMini';
import Modal from './Modal';

function DeleteReservation({ bookingId, onDelete }) {
	const [isPending, startTransition] = useTransition();
	const [isModalOpen, setIsModalOpen] = useState(false);

	function handleDelete() {
		setIsModalOpen(false);
		startTransition(() => onDelete(bookingId));
	}

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-red-600 transition-colors hover:text-primary-900"
			>
				{!isPending ? (
					<>
						<TrashIcon className="h-6 w-6 text-primary-600 group-hover:text-primary-800 transition-colors" />
						{/* <span className="mt-1">Delete</span> */}
					</>
				) : (
					<span className="mx-auto">
						<SpinnerMini />
					</span>
				)}
			</button>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={handleDelete}
				title="Confirm Deletion"
			>
				<p>Are you sure you want to delete this reservation?</p>
			</Modal>
		</>
	);
}

export default DeleteReservation;
