import { Box } from '@mui/material';
import { useTheme } from '../providers/CustomThemeProvider';

function FormPageLayout({ children ,sx={}}) {
	const { isDark } = useTheme();

	return (
		<Box
			sx={{
				flexGrow: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: isDark ? '#333333' : '#e3f2fd',
				padding: 2,
				minHeight: '100%',
				width: '100%',
				...sx,
			}}
		>
			<Box>
				{children}
			</Box>
		</Box>
	);
}

export default FormPageLayout;