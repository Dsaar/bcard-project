import { Box } from '@mui/material';
import React from 'react';
import { useTheme } from '../../providers/CustomThemeProvider';

function Main({ children }) {
  const { isDark } = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: isDark ? '#333333' : '#e3f2fd',
        flexGrow: 1, 
        minHeight: '100vh',         // ensures full height
        paddingBottom: '80px',      // leaves space for fixed footer
      }}
    >
      {children}
    </Box>
  );
}

export default Main;
