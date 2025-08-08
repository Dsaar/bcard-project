import { useEffect, useState } from 'react';
import { getUserById } from '../services/userService';

export default function useFullUser(user) {
	const [fullUser, setFullUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			if (user?._id) {
				try {
					const fullData = await getUserById(user._id);
					setFullUser(fullData);
				} catch (err) {
					console.error("Failed to load full user profile:", err);
				}
			} else {
				setFullUser(null);
			}
		};
		fetchUser();
	}, [user]);

	return fullUser;
}
