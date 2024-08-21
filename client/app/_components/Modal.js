'use client';

import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-accent-500 rounded-lg shadow-lg w-[30rem] p-12">
				<h2 className="text-2xl font-semibold mb-4 text-black">{title}</h2>
				<div className="mb-4 text-black text-md">{children}</div>
				<div className="flex justify-end gap-4">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
