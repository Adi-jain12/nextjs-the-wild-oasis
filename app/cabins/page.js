import Spinner from '@/app/_components/Spinner';
import { Suspense } from 'react';
import CabinsList from '../_components/CabinsList';
import Filter from '../_components/Filter';
import ReservationReminder from '../_components/ReservationReminder';

// export const revalidate = 0;

export const metadata = {
	title: 'Cabins',
};

const Page = ({ searchParams }) => {
	const filter = searchParams?.capacity ?? 'all';

	return (
		<div>
			<h1 className="text-4xl mb-5 text-accent-400 font-medium">
				Our Luxury Cabins
			</h1>
			<p className="text-primary-200 text-lg mb-10">
				Cozy yet luxurious cabins, located right in the heart of the Italian
				Dolomites. Imagine waking up to beautiful mountain views, spending your
				days exploring the dark forests around, or just relaxing in your private
				hot tub under the stars. Enjoy nature&apos;s beauty in your own little
				home away from home. The perfect spot for a peaceful, calm vacation.
				Welcome to paradise.
			</p>

			<div className="flex justify-end mb-8">
				<Filter />
			</div>

			{/* The reason behind using key prop in suspense is that all page navigations are automatically wrapped in transitions in Next.js (Refer suspense doc for more).
			 So in that case suspense will not rerendered the fallback and to fix that we pass a unique key, so whenever the key is different and Child component suspend then the fallback will be shown again  */}
			<Suspense fallback={<Spinner />} key={filter}>
				<CabinsList filter={filter} />
				<ReservationReminder />
			</Suspense>
		</div>
	);
};

export default Page;
