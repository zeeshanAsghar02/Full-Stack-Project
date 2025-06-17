import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { eventsAPI } from '../utils/api';

// API URL for image paths
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Custom components for animation
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

const ScrollAnimation = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  };

  return (
    <MotionBox ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </MotionBox>
  );
};

function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dbEvents, setDbEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await eventsAPI.getAll();
        // Map backend events to match card fields
        const mapped = res.data.events.map(ev => ({
          id: ev._id,
          title: ev.title,
          date: ev.date ? new Date(ev.date).toLocaleDateString() + (ev.time ? (', ' + ev.time) : '') : '',
          location: ev.venue,
          image: ev.image || '/images/default-event.jpg', // ImageKit URL or default
          description: ev.description,
        }));
        setDbEvents(mapped);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const events = [
    ...dbEvents,
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <ScrollAnimation delay={0.1}>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 4,
              background: 'linear-gradient(90deg, #1A1A1A, #FFD700)',
              borderRadius: 2,
            },
          }}
        >
          <Typography 
            variant="h2"
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              color: '#1A1A1A',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '4rem' },
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
              }
            }}
          >
            Upcoming Events
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
            Discover and join our vibrant community events, lectures, and gatherings.
          </Typography>
        </Box>
      </ScrollAnimation>

      <ScrollAnimation delay={0.2}>
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                backgroundColor: 'background.paper',
                '& fieldset': {
                  borderColor: 'primary.light',
                },
                '&:hover fieldset': {
                  borderColor: 'secondary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'secondary.main',
                },
              },
            }}
            sx={{
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
              },
            }}
          />
        </Box>
      </ScrollAnimation>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4
      }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : filteredEvents.length === 0 ? (
          <Typography variant="h6" align="center" color="textSecondary">
            No events found
          </Typography>
        ) : (
          filteredEvents.map((event, index) => (
            <Box 
              key={event.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                gap: 4,
                flexWrap: 'wrap'
              }}
            >
              {[event, filteredEvents[index + 1]].filter(Boolean).map((eventItem, cardIndex) => (
                <ScrollAnimation key={eventItem.id} delay={0.1 * (index + cardIndex)}>
                  <MotionCard
                    sx={{
                      width: '450px',
                      height: '450px',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={eventItem.image}
                      alt={eventItem.title}
                      sx={{
                        width: '450px',
                        height: '180px',
                        objectFit: 'cover',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '& img': {
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }
                      }}
                    />
                    <CardContent 
                      sx={{ 
                        flexGrow: 1, 
                        p: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '220px',
                        overflow: 'hidden'
                      }}
                    >
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h2"
                        sx={{
                          fontFamily: 'Montserrat',
                          fontWeight: 600,
                          color: 'primary.main',
                          mb: 1,
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: '1.2rem'
                        }}
                      >
                        {eventItem.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                          fontFamily: 'Raleway',
                          fontSize: '0.95rem',
                          mb: 0.5,
                        }}
                      >
                        {eventItem.date}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                          fontFamily: 'Raleway',
                          fontSize: '0.95rem',
                          mb: 0.5,
                        }}
                      >
                        {eventItem.location}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{
                          fontFamily: 'Raleway',
                          color: 'text.primary',
                          lineHeight: 1.5,
                          fontSize: '1rem',
                          flexGrow: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {eventItem.description}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </ScrollAnimation>
              ))}
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
}

export default Events; 