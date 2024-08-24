const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCabin(id) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/cabin/${id}`);
		if (!response.ok) {
			throw new Error('Error fetching cabin data');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getCabins() {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/cabin`);
		if (!response.ok) {
			throw new Error('Error fetching cabins data');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getGuest(email) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/guest/getGuest`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			throw new Error('Error fetching guest data');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function signInCredentials(userCredentials) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/auth/signin`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userCredentials),
		});

		if (!response.ok) {
			throw new Error('Error fetching user data');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function signUpCredentials(userCredentials) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userCredentials),
		});

		if (!response.ok) {
			throw new Error('Error creating user');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getBookings(id) {
	try {
		const response = await fetch(
			`${API_BASE_URL}/api/v1/booking/allBookings/${id}`
		);

		if (!response.ok) {
			throw new Error('Error fetching bookings');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getBooking(id) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/booking/${id}`);

		if (!response.ok) {
			throw new Error('Error fetching booking');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getSettings() {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/settings`);

		if (!response.ok) {
			throw new Error('Error fetching settings');
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getBookedDatesByCabinId(id) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/booking/cabin/${id}`);

		if (!response.ok) {
			throw new Error('Error fetching booked dates');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function createGuest(newGuest) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/guest`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newGuest),
		});

		if (!response.ok) {
			throw new Error('Error creating guest');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getCountries() {
	try {
		const response = await fetch(
			'https://restcountries.com/v2/all?fields=name,flag'
		);
		const countries = await response.json();
		return countries;
	} catch {
		throw new Error('Could not fetch countries');
	}
}
