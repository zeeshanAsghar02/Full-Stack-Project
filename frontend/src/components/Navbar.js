import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MosqueIcon from '@mui/icons-material/Mosque';
import { logoutUser } from '../utils/auth';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Events', path: '/events' },
  { title: 'Blog', path: '/blog' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

const settings = [
  { title: 'Profile', path: '/profile' },
  { title: 'Dashboard', path: '/dashboard' },
  { title: 'Logout', action: 'logout' },
];

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
    if (setting.action === 'logout') {
      dispatch(logoutUser());
      navigate('/');
    } else {
      navigate(setting.path);
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'primary.main',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Montserrat',
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              '&:hover': {
                color: 'secondary.main',
              },
            }}
          >
            AUIS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.title} 
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Montserrat',
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              '&:hover': {
                color: 'secondary.main',
              },
            }}
          >
            AUIS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  '&:hover': {
                    color: 'secondary.main',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
            {/* Admin Dashboard link for admin users */}
            {isAuthenticated && user?.role === 'admin' && (
              <Button
                key="Admin Dashboard"
                component={RouterLink}
                to="/admin"
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  '&:hover': {
                    color: 'secondary.main',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Admin Dashboard
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.firstName}
                      src="/static/images/avatar/2.jpg"
                      sx={{
                        border: '2px solid',
                        borderColor: 'secondary.main',
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ 
                    mt: '45px',
                    '& .MuiPaper-root': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.title}
                      onClick={() => handleSettingClick(setting)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                      }}
                    >
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  variant="outlined"
                  sx={{
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    '&:hover': {
                      borderColor: 'secondary.light',
                      color: 'secondary.light',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'secondary.light',
                    },
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 