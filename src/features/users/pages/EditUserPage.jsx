import React, { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@mui/material';
import { getUserById } from '../services/userService';
import { useCurrentUser } from '../../../app/providers/UserProvider';
import EditUserForm from '../../users/edit/EditUserForm';
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
