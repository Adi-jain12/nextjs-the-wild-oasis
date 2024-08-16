'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SignOutButton from './SignOutButton';
import userImage from '../../public/user.png';
import Image from 'next/image';

const ProfileDropdown = ({ session }) => {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownRef = useRef(null);

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative inline-block text-left" ref={dropdownRef}>
			<button
				onClick={toggleDropdown}
				className="flex items-center gap-4 p-2 w-24 h-12 bg-accent-500 rounded-full hover:bg-accent-600 shadow-lg transition-all"
			>
				<Menu className="text-black ml-1" />
				{!session ? (
					<div className="relative w-8 h-8">
						<Image
							src={userImage}
							fill
							className="rounded-full h-full object-cover"
							alt="Profile photo"
						/>
					</div>
				) : (
					<img
						className="h-8 rounded-full"
						src={session.user.image}
						alt={session.user.name}
						referrerPolicy="no-referrer"
					/>
				)}
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 font-semibold bg-accent-500 border border-accent-500 rounded-md shadow-lg z-10">
					<div className="py-1">
						{session ? (
							<>
								<Link
									href="/notifications"
									onClick={() => setIsOpen(false)}
									className="block w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-accent-200"
								>
									Notifications
								</Link>
								<SignOutButton handleIsOpen={() => setIsOpen(false)} />
							</>
						) : (
							<>
								<Link
									href="/notifications"
									onClick={() => setIsOpen(false)}
									className="block w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-accent-200"
								>
									Notifications
								</Link>
								<Link
									href="/login"
									onClick={() => setIsOpen(false)}
									className="block w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-accent-200"
								>
									Signin
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileDropdown;
