import React from 'react';
import { Box, TextField, Divider, List, ListItemButton, ListItemText, Button } from '@mui/material';

export default function MobileDrawer({ query, setQuery, navLinks, onNavigate, onLogout, user }) {
	return (
		<Box sx={{ width: 250, p: 2 }}>
			<TextField
				placeholder="Search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				fullWidth
				size="small"
				sx={{ mb: 2 }}
			/>
			<Divider sx={{ mb: 2 }} />
			<List>
				{navLinks.map((link) => (
					<ListItemButton
						key={link.to}
						onClick={() => onNavigate(link.to)}
					>
						<ListItemText primary={link.label} />
					</ListItemButton>
				))}
			</List>
			<Divider sx={{ my: 2 }} />
			{user ? (
				<Button onClick={onLogout} fullWidth variant="outlined">
					Logout
				</Button>
			) : (
				<Box>
					<Button onClick={() => onNavigate('/register')} fullWidth variant="contained" sx={{ mb: 1 }}>
						SIGNUP
					</Button>
					<Button onClick={() => onNavigate('/login')} fullWidth variant="outlined">
						LOGIN
					</Button>
				</Box>
			)}
		</Box>
	);
}
