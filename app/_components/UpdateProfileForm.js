import { updateGuest } from '../_lib/actions';
import SubmitButton from './SubmitButton';

const UpdateProfileForm = ({ guest, children }) => {
	const { fullName, email, national_id, countryFlag } = guest;

	return (
		<form
			action={updateGuest}
			className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
		>
			<div className="space-y-2">
				<label>Full name</label>
				<input
					disabled
					name="fullName"
					defaultValue={fullName}
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<label>Email address</label>
				<input
					disabled
					name="email"
					defaultValue={email}
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>
			<di className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>
					<img
						src={countryFlag}
						alt="Country flag"
						className="h-5 rounded-sm"
					/>
				</div>
				{children}
			</di>

			<div className="space-y-2">
				<label htmlFor="nationalID">National ID number</label>
				<input
					name="nationalID"
					defaultValue={national_id}
					minLength={6}
					maxLength={12}
					required
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
				/>
			</div>

			<div className="flex justify-end items-center gap-6">
				<SubmitButton pendingLabel="Updating...">Update Profile</SubmitButton>
			</div>
		</form>
	);
};

export default UpdateProfileForm;
