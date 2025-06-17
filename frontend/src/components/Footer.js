import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapComponent from './MapComponent';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1A1A1A',
        color: 'white',
        py: 6,
        mt: 'auto',
        position: 'relative',
        bottom: 0,
        width: '100%',
        fontFamily: 'Raleway, Montserrat, Arial, sans-serif',
        boxShadow: '0 4px 24px 0 rgba(26,26,26,0.15)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FFD700', letterSpacing: 1, fontFamily: 'Montserrat, sans-serif' }}>
              Air University Islamic Society
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'white', lineHeight: 1.7, fontFamily: 'Raleway, sans-serif' }}>
              Promoting Islamic values and fostering a strong Muslim community within Air University. Join us in our mission to create a positive impact through faith and knowledge.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook" sx={{ '&:hover': { color: '#FFD700', background: 'rgba(255,215,0,0.08)' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" sx={{ '&:hover': { color: '#FFD700', background: 'rgba(255,215,0,0.08)' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram" sx={{ '&:hover': { color: '#FFD700', background: 'rgba(255,215,0,0.08)' } }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FFD700', letterSpacing: 1, fontFamily: 'Montserrat, sans-serif' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ transition: 'color 0.2s', fontWeight: 500, fontFamily: 'Raleway, sans-serif', '&:hover': { color: '#FFD700', pl: 1 } }}>
                Home
              </Link>
              <Link component={RouterLink} to="/events" color="inherit" underline="none" sx={{ transition: 'color 0.2s', fontWeight: 500, fontFamily: 'Raleway, sans-serif', '&:hover': { color: '#FFD700', pl: 1 } }}>
                Events
              </Link>
              <Link component={RouterLink} to="/blog" color="inherit" underline="none" sx={{ transition: 'color 0.2s', fontWeight: 500, fontFamily: 'Raleway, sans-serif', '&:hover': { color: '#FFD700', pl: 1 } }}>
                Blog
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" underline="none" sx={{ transition: 'color 0.2s', fontWeight: 500, fontFamily: 'Raleway, sans-serif', '&:hover': { color: '#FFD700', pl: 1 } }}>
                About Us
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="none" sx={{ transition: 'color 0.2s', fontWeight: 500, fontFamily: 'Raleway, sans-serif', '&:hover': { color: '#FFD700', pl: 1 } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FFD700', letterSpacing: 1, fontFamily: 'Montserrat, sans-serif' }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon sx={{ color: '#FFD700' }} />
                <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Raleway, sans-serif' }}>
                  Main Campus PAF Complex E-9, Islamabad, Pakistan
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ color: '#FFD700' }} />
                <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Raleway, sans-serif' }}>
                  051-111-247-864
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#FFD700' }} />
                <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Raleway, sans-serif' }}>
                  info@auis.edu.pk
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Map Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#FFD700', letterSpacing: 1, fontFamily: 'Montserrat, sans-serif' }}>
              Location Map
            </Typography>
            <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 12px 0 rgba(26,26,26,0.10)', mt: 1, height: '200px' }}>
              <MapComponent />
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 215, 0, 0.2)',
            mt: 4,
            pt: 3,
            textAlign: 'center',
            fontSize: '1rem',
            letterSpacing: 1,
            color: '#FFD700',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          <Typography variant="body2" sx={{ color: '#FFD700', fontWeight: 400, fontFamily: 'Montserrat, sans-serif' }}>
            © {new Date().getFullYear()} Air University Islamic Society. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;