import React from 'react';
import { Container, Typography, Box, Grid, useTheme, Card, CardContent } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MosqueIcon from '@mui/icons-material/Mosque';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { styled } from '@mui/material/styles';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.shape.borderRadius,
    background: 'linear-gradient(45deg, #1a237e 0%, #0d47a1 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
  transition: 'all 0.3s ease',
}));

const ScrollAnimation = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
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

const About = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <MosqueIcon sx={{ fontSize: 50, color: '#1a237e' }} />,
      title: "Islamic Lectures",
      description: "Regular lectures and workshops on various Islamic topics"
    },
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 50, color: '#1a237e' }} />,
      title: "Quran Study",
      description: "Weekly Quran study circles and tafsir sessions"
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 50, color: '#1a237e' }} />,
      title: "Community Service",
      description: "Active participation in community service activities"
    },
    {
      icon: <CelebrationIcon sx={{ fontSize: 50, color: '#1a237e' }} />,
      title: "Social Events",
      description: "Regular social gatherings and Islamic celebrations"
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 50, color: '#1a237e' }} />,
      title: "Student Support",
      description: "Guidance and support for Muslim students"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#F4F4F4',
        py: 8,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <ScrollAnimation>
          <Box
            sx={{
              textAlign: 'center',
              mb: 12,
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
              About AUIS
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
              Promoting Islamic values and fostering a strong Muslim community within the university
            </Typography>
          </Box>
        </ScrollAnimation>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 12 }}>
          <Grid container spacing={4} sx={{ maxWidth: '1200px' }}>
            <Grid item xs={12} md={6}>
              <ScrollAnimation delay={0.2}>
                <MotionCard
                  sx={{
                    height: '400px',
                    background: 'white',
                    borderRadius: 4,
                    boxShadow: theme.shadows[4],
                    transform: 'perspective(1000px) rotateX(0deg)',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateX(5deg)',
                    },
                    maxWidth: '500px',
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: '#1A1A1A',
                        fontWeight: 600,
                        mb: 3,
                        borderBottom: '2px solid #FFD700',
                        pb: 2,
                        textAlign: 'center',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Our Mission
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: '#2E2E2E',
                        textAlign: 'center',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        letterSpacing: '0.02em',
                        fontWeight: 500,
                      }}
                    >
                      The Air University Islamic Society (AUIS) is dedicated to promoting Islamic values and fostering a strong Muslim community within the university. We aim to provide a platform for students to learn about Islam, engage in meaningful discussions, and participate in various Islamic activities.
                    </Typography>
                  </CardContent>
                </MotionCard>
              </ScrollAnimation>
            </Grid>

            <Grid item xs={12} md={6}>
              <ScrollAnimation delay={0.4}>
                <MotionCard
                  sx={{
                    height: '400px',
                    background: 'white',
                    borderRadius: 4,
                    boxShadow: theme.shadows[4],
                    transform: 'perspective(1000px) rotateX(0deg)',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateX(5deg)',
                    },
                    maxWidth: '500px',
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: '#1A1A1A',
                        fontWeight: 600,
                        mb: 3,
                        borderBottom: '2px solid #FFD700',
                        pb: 2,
                        textAlign: 'center',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Our Vision
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: '#2E2E2E',
                        textAlign: 'center',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        letterSpacing: '0.02em',
                        fontWeight: 500,
                      }}
                    >
                      To create an inclusive environment where students can grow spiritually, academically, and socially while maintaining strong Islamic values and principles. We strive to build a community that nurtures future leaders who will make positive contributions to society through their Islamic knowledge and ethical conduct.
                    </Typography>
                  </CardContent>
                </MotionCard>
              </ScrollAnimation>
            </Grid>
          </Grid>
        </Box>

        <ScrollAnimation delay={0.6}>
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                color: '#1A1A1A',
                fontWeight: 600,
                textAlign: 'center',
                mb: 6,
                position: 'relative',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 2,
                  background: 'linear-gradient(90deg, #1A1A1A, #FFD700)',
                  borderRadius: 2,
                },
              }}
            >
              What We Do
            </Typography>
            <Grid 
              container 
              spacing={4} 
              sx={{ 
                maxWidth: '1200px',
                mx: 'auto',
                justifyContent: 'center'
              }}
            >
              {features.map((feature, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    minWidth: { md: '350px' }
                  }}
                >
                  <ScrollAnimation delay={0.2 * index}>
                    <MotionCard
                      component={StyledCard}
                      sx={{
                        width: '100%',
                        maxWidth: '350px',
                        height: '300px',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'white',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: theme.shape.borderRadius,
                          background: 'linear-gradient(45deg, #1A1A1A 0%, #FFD700 100%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover::before': {
                          opacity: 1,
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 4,
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          position: 'relative',
                          zIndex: 1,
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            background: 'white',
                            boxShadow: theme.shadows[4],
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1) rotate(5deg)',
                            },
                            '& svg': {
                              color: '#1A1A1A',
                            }
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box 
                          sx={{ 
                            flex: 1, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center',
                            width: '100%'
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: 500,
                              color: '#1A1A1A',
                              mb: 2,
                              letterSpacing: '0.02em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: "'Raleway', sans-serif",
                              color: '#2E2E2E',
                              lineHeight: 1.6,
                              letterSpacing: '0.02em',
                              fontWeight: 500,
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </MotionCard>
                  </ScrollAnimation>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ScrollAnimation>
      </Container>
    </Box>
  );
};

export default About; 