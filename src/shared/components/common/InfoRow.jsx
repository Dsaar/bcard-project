import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function InfoRow({ icon, label, value,width }) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f9f9f9',
				p: 2,
				borderRadius: 2,
				mb: 2,
				width: width || '100%',
				border: `1px solid ${theme.palette.divider}`
			}}
		>
			<Box
				sx={{
					width: 40,
					height: 40,
					bgcolor: theme.palette.primary.light,
					borderRadius: 2,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					mr: 2,
					color: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.common.white
				}}
			>
				{icon}
			</Box>
			<Box>
				<Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
					{label}
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: '500', color: theme.palette.text.primary }}>
					{value || '—'}
				</Typography>
			</Box>
		</Box>
	);
}
