import React, { useEffect, useState } from 'react';
import {
	Container,
	Box,
	CircularProgress,
	Button,
	Paper,
} from '@mui/material';
import { useCurrentUser } from '../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../router/routesDictionary';
import { getUserById, deleteUserById } from '../users/services/userService';
import { removeToken } from '../users/services/localStorageService';
import { useSnack } from '../providers/SnackBarProvider';

// Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';

// Components
import ProfileHeader from '../components/common/ProfileHeader';
import ProfileDetails from '../components/common/ProfileDetails';
import DeleteConfirmationDialog from '../components/common/DeleteConfirmationDialog';

function UserProfilePage() {
	const { user, setUser, setToken } = useCurrentUser();
	const [details, setDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [openDialog, setOpenDialog] = useState(false);
	const navigate = useNavigate();
	const setSnack = useSnack();

	useEffect(() => {
		if (user?._id) {
			getUserById(user._id)
				.then(setDetails)
				.catch(() => setSnack('error', 'Failed to fetch user details'))
				.finally(() => setLoading(false));
		} else setLoading(false);
	}, [user]);

	const handleDeleteUser = async () => {
		try {
			await deleteUserById(user._id);
			removeToken();
			setUser(null);
			setToken(null);
			setSnack('success', 'Account deleted successfully.');
			navigate('/');
		} catch {
			setSnack('error', 'Failed to delete account.');
		}
	};

	if (loading)
		return (
			<Box display="flex" justifyContent="center" mt={5}>
				<CircularProgress />
			</Box>
		);

	if (!details)
		return (
			<Container sx={{ mt: 5 }}>
				<p>Unable to load user details.</p>
			</Container>
		);

	const initials =
		!details.image?.url && details.name.first && details.name.last
			? `${details.name.first[0]}${details.name.last[0]}`
			: '';

	const sections = [
		{
			title: 'Contact Information',
			fields: [
				{ icon: <EmailIcon />, label: 'Email', value: details.email },
				{ icon: <PhoneIcon />, label: 'Phone', value: details.phone },
				{ icon: <BadgeIcon />, label: 'User ID', value: details._id },
			],
		},
		{
			title: 'Location',
			sx: { pl: { md: 22 }, width: '500px' },
			fields: [
				{ icon: <PublicIcon />, label: 'Country', value: details.address?.country },
				{ icon: <LocationCityIcon />, label: 'City', value: details.address?.city },
				{ icon: <HomeIcon />, label: 'Address', value: details.address?.street },
			],
		},
	];

	return (
		<Container sx={{ display: 'flex', justifyContent: 'center' }}>
			<Paper elevation={4} sx={{ p: 4, borderRadius: 3, maxWidth: '900px', width: '100%', mt: 5 }}>
				<ProfileHeader
					title="User Profile"
					image={details.image?.url}
					alt={details.image?.alt}
					initials={initials}
				/>
				<ProfileDetails sections={sections} />

				<Box display="flex" justifyContent="center" mt={4} gap={2}>
					<Button variant="outlined" onClick={() => navigate(ROUTES.profileEdit)} sx={{ px: 4, borderRadius: 3 }}>
						Edit Profile
					</Button>
					<Button variant="outlined" color="error" sx={{ px: 4, borderRadius: 3 }} onClick={() => setOpenDialog(true)}>
						Delete Account
					</Button>
				</Box>
			</Paper>

			<DeleteConfirmationDialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				onConfirm={handleDeleteUser}
			/>
		</Container>
	);
}

export default UserProfilePage;
