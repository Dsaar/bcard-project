import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ROUTES from '../../router/routesDictionary';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { useCurrentUser } from '../../providers/UserProvider';

function Footer() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const theme = useTheme();

  return (
    <Paper
      component="footer"
      sx={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.paper
          : theme.palette.primary.main,
        color: theme.palette.getContrastText(
          theme.palette.mode === 'dark'
            ? theme.palette.background.paper
            : theme.palette.primary.main
        ),
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{
          backgroundColor: 'inherit',
          '& .MuiBottomNavigationAction-root': {
            color: theme.palette.getContrastText(
              theme.palette.mode === 'dark'
                ? theme.palette.background.paper
                : theme.palette.primary.main
            ),
          },
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate(ROUTES.root)}
        />
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          onClick={() => navigate(ROUTES.about)}
        />
        {(user?.isBusiness || user?.isAdmin) && (
          <BottomNavigationAction
            label="My Cards"
            icon={<RecentActorsIcon />}
            onClick={() => navigate(ROUTES.myCards)}
          />
        )}

        {user && (
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            onClick={() => navigate(ROUTES.favorite)}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
}

export default Footer;
