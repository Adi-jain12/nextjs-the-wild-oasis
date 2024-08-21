import { auth } from '../_lib/auth';

export const metadata = {
	title: 'Guest area',
};

export default async function Page() {
	const session = await auth();

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">
				Welcome, {session.user.name}
			</h2>

			<p className="flex flex-col gap-4 text-lg">
				We&apos;re delighted to have you explore our website. Take your time to
				discover our luxurious accommodations, exceptional amenities, and
				exclusive offers. We hope you find everything you’re looking for and
				more. Enjoy your exploration, and we look forward to welcoming you in
				person!
				<span>Enjoy your visit!</span>
				<span className="flex flex-col mt-6">
					Best wishes,
					<span className="text-accent-400 font-semibold">
						The Wild Oasis Team
					</span>
				</span>
			</p>
		</div>
	);
}
