import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import { alpha } from '@mui/material';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

const pages = ['Forum', 'Decks', 'Profile'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {

  const { isAuthenticated } = useAuth0();

  return (
    <AppBar position="sticky" elevation={1}
      sx={{ bgcolor: alpha("#adbbebff", 0.8) }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <img
            src="/logo.png"
            width="20%"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: "flex" },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CardBrowser
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
            </IconButton>
          </Box>
          <Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CardBrowser
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              Decks
              </Button>
              <Button
                href='https://ygoprodeck.com/forum.php'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              Forum
              </Button>
              <Button
                href='/profile'
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
              Profile
              </Button>
          </Box>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
