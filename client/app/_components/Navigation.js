import Link from 'next/link';
import { auth } from '../_lib/auth';
import ProfileDropdown from './ProfileDropdown';

const Navigation = async () => {
	const session = await auth();

	return (
		<nav className="z-10 text-xl">
			<ul className="flex gap-16 items-center">
				<li>
					<Link
						href="/cabins"
						className="hover:text-accent-400 transition-colors"
					>
						Cabins
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-accent-400 transition-colors"
					>
						About
					</Link>
				</li>

				{session?.user && (
					<li>
						<Link
							href="/account"
							className="hover:text-accent-400 transition-colors flex items-center gap-4"
						>
							<span>Guest area</span>
						</Link>
					</li>
				)}

				<li>
					<ProfileDropdown session={session} />
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
