import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const ScrollAnimation = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay: delay,
            ease: [0.6, -0.05, 0.01, 0.99],
          },
        },
      }}
    >
      {children}
    </MotionBox>
  );
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission logic
    console.log('Contact form submitted:', formData);
    setSnackbar({
      open: true,
      message: 'Thank you for your message. We will get back to you soon!',
      severity: 'success',
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#F4F4F4', // Light background to match About.js and screenshot
        py: 8,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <ScrollAnimation>
          <Box
            sx={{
              textAlign: 'center',
              mb: 12, // Main margin bottom for the whole heading section
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -20, // Relative to this Box
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100, // Matching About.js
                height: 4, // Matching About.js
                background: 'linear-gradient(90deg, #1A1A1A, #FFD700)', // Black to Gold
                borderRadius: 2,
              },
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: { xs: '2.5rem', md: '4rem' },
                color: '#1A1A1A',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                background: 'linear-gradient(45deg, #1A1A1A, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40%',
                  height: 2,
                  background: 'linear-gradient(90deg, transparent, #1A1A1A, transparent)',
                },
              }}
            >
              Contact Us
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Raleway', sans-serif",
                color: '#2E2E2E',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.8,
                fontWeight: 400,
                letterSpacing: '0.02em',
                fontStyle: 'italic',
              }}
            >
              We'd love to hear from you. Please fill out the form below to get in touch with us.
            </Typography>
          </Box>
        </ScrollAnimation>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ScrollAnimation delay={0.2}>
              <MotionPaper
                elevation={5}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  transform: 'perspective(1000px) rotateX(0deg)',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateX(5deg)',
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 600,
                    color: 'gold',
                    mb: 4,
                  }}
                >
                  Get in Touch
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontFamily: 'Raleway',
                    color: 'white',
                    lineHeight: 1.8,
                    mb: 4,
                  }}
                >
                  Have questions or want to get involved? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontFamily: 'Montserrat',
                      fontWeight: 600,
                      color: 'gold',
                      mb: 2,
                    }}
                  >
                    Contact Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <EmailIcon sx={{ color: 'gold' }} />
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: 'Raleway',
                          color: 'white',
                        }}
                      >
                        info@auis.org
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PhoneIcon sx={{ color: 'gold' }} />
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: 'Raleway',
                          color: 'white',
                        }}
                      >
                        +92 123 4567890
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <LocationOnIcon sx={{ color: 'gold' }} />
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: 'Raleway',
                          color: 'white',
                        }}
                      >
                        Air University, Islamabad
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </MotionPaper>
            </ScrollAnimation>
          </Grid>

          <Grid item xs={12} md={6}>
            <ScrollAnimation delay={0.4}>
              <MotionPaper
                elevation={5}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: '#1a1a1a',
                  transform: 'perspective(1000px) rotateX(0deg)',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateX(5deg)',
                  },
                }}
              >
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#444',
                            },
                            '&:hover fieldset': {
                              borderColor: 'gold',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'gold',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#aaa',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                          mb: 2,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#444',
                            },
                            '&:hover fieldset': {
                              borderColor: 'gold',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'gold',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#aaa',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                          mb: 2,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#444',
                            },
                            '&:hover fieldset': {
                              borderColor: 'gold',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'gold',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#aaa',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                          mb: 2,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#444',
                            },
                            '&:hover fieldset': {
                              borderColor: 'gold',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'gold',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#aaa',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                          mb: 2,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#444',
                            },
                            '&:hover fieldset': {
                              borderColor: 'gold',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'gold',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#aaa',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                          mb: 3,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      py: 1.5,
                      backgroundColor: 'gold',
                      color: 'black',
                      fontFamily: 'Montserrat',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      '&:hover': {
                        backgroundColor: 'darkgoldenrod',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </MotionPaper>
            </ScrollAnimation>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Contact;