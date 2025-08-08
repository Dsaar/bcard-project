import { Box, Avatar, Typography, Divider } from '@mui/material';

function ProfileHeader({ title, image, alt, initials }) {
	return (
		<>
			<Typography variant="h4" gutterBottom align="center">
				{title}
			</Typography>
			<Divider sx={{ mb: 3, width: '50%', mx: 'auto' }} />
			<Box display="flex" justifyContent="center" mb={3}>
				<Avatar
					src={image}
					alt={alt}
					sx={{ width: 120, height: 120, border: '2px solid #ccc' }}
				>
					{initials}
				</Avatar>
			</Box>
		</>
	);
}

export default ProfileHeader;
