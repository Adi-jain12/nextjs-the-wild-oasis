import SelectCountry from '@/app/_components/SelectCountry';
import UpdateProfileForm from '@/app/_components/UpdateProfileForm';
import { getGuest } from '@/app/_lib/api-client';
import { auth } from '@/app/_lib/auth';

export const metadata = {
	title: 'Update profile',
};

const Page = async () => {
	const session = await auth();
	const guest = await getGuest(session.user.email);

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-4">
				Update your guest profile
			</h2>

			<p className="text-lg mb-8 text-primary-200">
				Providing the following information will make your check-in process
				faster and smoother. See you soon!
			</p>

			<UpdateProfileForm guest={guest}>
				<SelectCountry
					name="nationality"
					id="nationality"
					required
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
					defaultCountry={guest.nationality}
				/>
			</UpdateProfileForm>
		</div>
	);
};

export default Page;
