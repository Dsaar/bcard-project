import { Grid, Typography } from '@mui/material';
import InfoRow from './InfoRow';

function ProfileDetails({ sections }) {
	return (
		<Grid container spacing={4}>
			{sections.map((section, idx) => (
				<Grid key={idx} item xs={12} md={6} sx={section.sx}>
					<Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
						{section.title}
					</Typography>
					{section.fields.map((field, fIdx) => (
						<InfoRow
							key={fIdx}
							icon={field.icon}
							label={field.label}
							value={field.value}
						/>
					))}
				</Grid>
			))}
		</Grid>
	);
}

export default ProfileDetails;
