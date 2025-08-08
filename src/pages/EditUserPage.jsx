import React, { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@mui/material';
import { getUserById } from '../users/services/userService';
import { useCurrentUser } from '../users/providers/UserProvider';
import EditUserForm from '../users/components/edituser/EditUserForm';
import { useNavigate } from 'react-router-dom';

function EditUserPage() {
	const { user } = useCurrentUser();
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (user?._id) {
			getUserById(user._id)
				.then(setUserData)
				.catch((err) => console.error('Failed to fetch user details:', err));
		}
	}, [user]);

	if (!userData) return <CircularProgress />;

	return (
		<Container sx={{ mt: -2 }}>
			<EditUserForm
				userData={userData}
				onSuccess={() => navigate('/profile')}
			/>
		</Container>
	);
}

export default EditUserPage;
