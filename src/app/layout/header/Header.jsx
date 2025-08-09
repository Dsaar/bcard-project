import React, { useState } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Button,
	TextField,
	IconButton,
	Avatar,
	Drawer,
	useMediaQuery,
	useTheme as useMuiTheme,
	InputAdornment
} from '@mui/material';
import NavLinkTemplate from '../../../shared/components/NavLinkTemplate';
import ROUTES from '../../../app/router/routesDictionary';
import { useTheme } from '../../../app/providers/CustomThemeProvider';
import { useCurrentUser } from '../../providers/UserProvider';
import { removeToken } from '../../../features/users/services/localStorageService';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { getNavLinks } from '../helpers/navLinkHelper';
import MobileDrawer from '../components/MobileDrawer';
import useFullUser from '../../../features/users/hooks/useFullUser';
import useSearchQuery from '../../../shared/hooks/useSearchQuery';
import useDebounce from '../../../shared/hooks/useDebounce';
import SearchIcon from "@mui/icons-material/Search";



function Header() {
	const { toggleMode, isDark } = useTheme();
	const { user, setUser, setToken } = useCurrentUser();
	const fullUser = useFullUser(user);
	const navigate = useNavigate();
	const { query, setQuery } = useSearchQuery();
	const debouncedQuery = useDebounce(query, 300); 
	const muiTheme = useMuiTheme();
	const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleLogout = () => {
		removeToken();
		setUser(null);
		setToken(null);
		navigate('/');
	};

	const navLinks = getNavLinks(user);

	return (
		<AppBar position="sticky" color="primary" elevation={10}>
			<Toolbar>
				{isMobile ? (
					<>
						<IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'white' }}>
							<MenuIcon />
						</IconButton>
						<Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
							<MobileDrawer
								query={query}
								setQuery={setQuery}
								navLinks={navLinks}
								onNavigate={(path) => { navigate(path); setDrawerOpen(false); }}
								onLogout={handleLogout}
								user={user}
							/>
						</Drawer>
					</>
				) : (
					<Box sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
						{navLinks.map((link) => (
							<NavLinkTemplate key={link.to} to={link.to} label={link.label} />
						))}
					</Box>
				)}

				{!isMobile && (
					<TextField
						placeholder="Search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						size="small"
						sx={{
							bgcolor: isDark ? '#333' : 'white',
							borderRadius: 1,
							input: { color: isDark ? 'white' : 'black' }, 
							'& .MuiSvgIcon-root': { color: isDark ? 'white' : 'black' },
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				)}

				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 2 }}>
					{user && (
						<IconButton onClick={() => navigate(ROUTES.profile)}>
							{fullUser?.image?.url ? (
								<Avatar
									src={fullUser.image.url}
									alt={fullUser.image.alt || 'Profile'}
									sx={{ width: 40, height: 40 }}
								/>
							) : (
								<AccountCircleIcon sx={{ color: 'white', fontSize: 40 }} />
							)}
						</IconButton>
					)}

					{user ? (
						<Button onClick={handleLogout} sx={{ color: 'white' }}>
							Logout
						</Button>
					) : (
						<>
							<Button onClick={() => navigate(ROUTES.register)} sx={{ color: 'white' }}>
								SIGNUP
							</Button>
							<Button onClick={() => navigate(ROUTES.login)} sx={{ color: 'white' }}>
								LOGIN
							</Button>
						</>
					)}

					<IconButton onClick={toggleMode} sx={{ color: 'white' }}>
						{isDark ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
