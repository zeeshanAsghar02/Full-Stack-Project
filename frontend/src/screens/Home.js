import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Custom components for animation
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionCard = motion(Card);

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

function Home() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Weekly Quran Study Circle',
      date: 'Every Friday, 2:00 PM',
      location: 'University Mosque',
      image: '/images/quran-study.jpg',
      description: 'Join us for our weekly Quran study circle where we discuss and learn from the Holy Quran.',
    },
    {
      id: 2,
      title: 'Islamic Lecture Series',
      date: 'Next Saturday, 4:00 PM',
      location: 'Auditorium C',
      image: '/images/lecture.jpg',
      description: 'A special lecture on \"The Role of Youth in Modern Islamic Society\" by Dr. Ahmed Khan.',
    },
    {
      id: 3,
      title: 'Community Iftar Gathering',
      date: 'During Ramadan, 7:00 PM',
      location: 'University Cafeteria',
      image: '/images/iftar.jpg',
      description: 'Break your fast with the AUIS community in a blessed gathering.',
    },
  ];

  const recentBlogs = [
    {
      id: 1,
      title: 'The Importance of Community in Islam',
      image: '/images/community.jpg',
      excerpt: 'Exploring how community plays a vital role in strengthening our faith and brotherhood.',
      date: 'October 26, 2023',
      author: 'AUIS Team',
    },
    {
      id: 2,
      title: 'Balancing Studies and Faith',
      image: '/images/balance.jpg',
      excerpt: 'Tips for maintaining a strong connection with Allah while pursuing academic excellence.',
      date: 'October 20, 2023',
      author: 'Iman Ali',
    },
    {
      id: 3,
      title: 'Understanding the Quran: A Beginner\'s Guide',
      image: '/images/quran-guide.jpg',
      excerpt: 'A comprehensive guide for beginners to start their journey of understanding the Quran.',
      date: 'October 15, 2023',
      author: 'Dr. Aisha Khan',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: '#000000',
          color: 'white',
          py: { xs: 10, md: 16 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          mb: { xs: 4, md: 8 },
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="md">
          <MotionTypography 
            variant="h2" 
            component="h1" 
            gutterBottom
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontSize: { xs: '2.2rem', md: '3.5rem' },
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: { xs: 2, md: 4 },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              color: '#FFD700',
            }}
          >
            Welcome to Air University Islamic Society
          </MotionTypography>
          <MotionTypography 
            variant="h5" 
            paragraph
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            sx={{
              fontFamily: 'Raleway',
              fontWeight: 400,
              lineHeight: 1.8,
              mb: { xs: 4, md: 6 },
              opacity: 1,
              maxWidth: '700px',
              mx: 'auto',
              color: '#FFFFFF',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Promoting Islamic values and fostering a strong Muslim community within Air University
          </MotionTypography>
          <MotionButton
            component={RouterLink}
            to="/about"
            variant="contained"
            size="large"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            sx={{
              backgroundColor: 'secondary.main',
              color: 'primary.main',
              px: { xs: 4, md: 6 },
              py: { xs: 1.5, md: 2 },
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              borderRadius: 8,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: 'secondary.light',
                boxShadow: '0px 6px 16px rgba(0,0,0,0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Learn More
          </MotionButton>
        </Container>
      </Box>

      {/* Upcoming Events Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <ScrollAnimation delay={0.1}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 600,
                color: 'primary.main',
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 3,
                  background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
                  borderRadius: 2,
                },
              }}
            >
              Upcoming Events
            </Typography>
          </ScrollAnimation>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {upcomingEvents.map((event, index) => (
              <Grid item key={event.id} xs={12} sm={6} md={4}>
                <ScrollAnimation delay={0.1 * (index + 1)}>
                  <MotionCard
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      borderRadius: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.image}
                      alt={event.title}
                      sx={{
                        objectFit: 'cover',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3"
                        sx={{
                          fontFamily: 'Montserrat',
                          fontWeight: 600,
                          color: 'primary.main',
                          mb: 1.5,
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          fontFamily: 'Raleway',
                          mb: 1,
                        }}
                      >
                        {event.date} • {event.location}
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{
                          fontFamily: 'Raleway',
                          color: 'text.primary',
                          lineHeight: 1.6,
                          fontSize: '0.95rem',
                        }}
                      >
                        {event.description}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </ScrollAnimation>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Button
              component={RouterLink}
              to="/events"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                px: { xs: 4, md: 5 },
                py: { xs: 1.2, md: 1.5 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                borderRadius: 8,
                '&:hover': {
                  borderColor: 'primary.dark',
                  color: 'primary.dark',
                  backgroundColor: 'transparent',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              View All Events
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Recent Blog Posts Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <ScrollAnimation delay={0.1}>
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 600,
                color: 'primary.main',
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 3,
                  background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
                  borderRadius: 2,
                },
              }}
            >
              Recent Blog Posts
            </Typography>
          </ScrollAnimation>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {recentBlogs.map((blog, index) => (
              <Grid item key={blog.id} xs={12} sm={6} md={4}>
                <ScrollAnimation delay={0.1 * (index + 1)}>
                  <MotionCard
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      borderRadius: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={blog.image}
                      alt={blog.title}
                      sx={{
                        objectFit: 'cover',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3"
                        sx={{
                          fontFamily: 'Montserrat',
                          fontWeight: 600,
                          color: 'primary.main',
                          mb: 1.5,
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          fontFamily: 'Raleway',
                          mb: 1,
                        }}
                      >
                        {blog.date} • {blog.author}
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{
                          fontFamily: 'Raleway',
                          color: 'text.primary',
                          lineHeight: 1.6,
                          fontSize: '0.95rem',
                        }}
                      >
                        {blog.excerpt}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </ScrollAnimation>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Button
              component={RouterLink}
              to="/blog"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                px: { xs: 4, md: 5 },
                py: { xs: 1.2, md: 1.5 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                borderRadius: 8,
                '&:hover': {
                  borderColor: 'primary.dark',
                  color: 'primary.dark',
                  backgroundColor: 'transparent',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Read More
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 