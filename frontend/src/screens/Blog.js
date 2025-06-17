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
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

// Custom components for animation
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

const ScrollAnimation = ({ children, delay = 0, sx = {} }) => {
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
    <MotionBox ref={ref} initial="hidden" animate={controls} variants={variants} sx={sx}>
      {children}
    </MotionBox>
  );
};

function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    image: null,
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/blogs?status=published');
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blogs');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateBlog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setCreateDialogOpen(false);
    setBlogForm({
      title: '',
      content: '',
      category: '',
      tags: '',
      image: null,
    });
    setFormError(null);
    setFormSuccess(null);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setBlogForm(prev => ({ ...prev, image: files[0] }));
    } else {
      setBlogForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      let imageUrl = '';
      if (blogForm.image) {
        try {
          const base64Image = await convertToBase64(blogForm.image);
          const uploadRes = await axios.post('http://localhost:5000/api/upload', {
            file: base64Image,
            fileName: blogForm.image.name
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          imageUrl = uploadRes.data.url;
        } catch (uploadError) {
          setFormError('Failed to upload image: ' + (uploadError.response?.data?.message || uploadError.message));
          setIsSubmitting(false);
          return;
        }
      }

      const blogData = {
        title: blogForm.title,
        content: blogForm.content,
        category: blogForm.category,
        tags: blogForm.tags.split(',').map(tag => tag.trim()),
      };

      if (imageUrl) {
        blogData.image = imageUrl;
      }

      await axios.post('http://localhost:5000/api/blogs', blogData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setFormSuccess('Blog submitted successfully! It will be reviewed by an admin.');
      setTimeout(() => {
        handleCloseDialog();
        // Refresh the blogs list
        fetchBlogs();
      }, 2000);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = blogs.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

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
            Our Blog
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
            Stay updated with the latest news, articles, and insights from AUIS.
          </Typography>
        </Box>
      </ScrollAnimation>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search articles..."
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
          sx={{ flex: '1 1 0%' }}
        />
        <ScrollAnimation delay={0.2}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateBlog}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              px: 3,
              py: 1.5,
              borderRadius: 2,
              minWidth: '160px',
              flex: '0 0 auto',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Create Blog
          </Button>
        </ScrollAnimation>
      </Box>

      {/* Blog Creation Dialog */}
      <Dialog 
        open={createDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
          }
        }}
      >
        <DialogTitle sx={{ 
          m: 0, 
          p: 3, 
          backgroundColor: 'primary.main',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Create New Blog Post
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          {formSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {formSuccess}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={blogForm.title}
                  onChange={handleFormChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content"
                  name="content"
                  value={blogForm.content}
                  onChange={handleFormChange}
                  required
                  multiline
                  rows={6}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={blogForm.category}
                    onChange={handleFormChange}
                    required
                    label="Category"
                  >
                    <MenuItem value="Islamic Thought">Islamic Thought</MenuItem>
                    <MenuItem value="Student Voice">Student Voice</MenuItem>
                    <MenuItem value="Reflections">Reflections</MenuItem>
                    <MenuItem value="News">News</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tags (comma-separated)"
                  name="tags"
                  value={blogForm.tags}
                  onChange={handleFormChange}
                  placeholder="e.g., Education, Faith, Student Life"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                    },
                  }}
                >
                  Upload Featured Image
                  <input
                    type="file"
                    name="image"
                    hidden
                    onChange={handleFormChange}
                    accept="image/*"
                  />
                </Button>
                {blogForm.image && (
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    Selected file: {blogForm.image.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                onClick={handleCloseDialog}
                sx={{
                  px: 3,
                  py: 1,
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  px: 4,
                  py: 1,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Blog'}
              </Button>
            </Box>
        </Box>
        </DialogContent>
      </Dialog>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {filteredPosts.map((post, index) => (
          <Grid item key={post._id} xs={12} sm={6}>
            <ScrollAnimation delay={0.1 * (index + 1)}>
              <MotionCard
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 8px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={post.image || '/images/default-blog.jpg'}
                  alt={post.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    sx={{
                      fontFamily: 'Montserrat',
                      fontWeight: 600,
                      color: 'primary.main',
                      mb: 1.5,
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      fontFamily: 'Raleway',
                      fontSize: '0.9rem',
                      mb: 1,
                    }}
                  >
                    By {post.author?.name} • {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    paragraph
                    sx={{
                      fontFamily: 'Raleway',
                      color: 'text.primary',
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                      flexGrow: 1,
                    }}
                  >
                    {post.content.substring(0, 200)}...
                  </Typography>
                  <Box sx={{ mb: 2, mt: 2 }}>
                    {post.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          mr: 1, 
                          mb: 1,
                          backgroundColor: 'secondary.light',
                          color: 'primary.dark',
                          fontWeight: 500,
                          fontSize: '0.8rem',
                          borderRadius: '4px',
                        }}
                      />
                    ))}
                  </Box>
                  <MotionButton
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      px: { xs: 3, md: 4 },
                      py: { xs: 1, md: 1.2 },
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      borderRadius: 8,
                      boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        boxShadow: '0px 6px 16px rgba(0,0,0,0.3)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Read More
                  </MotionButton>
                </CardContent>
              </MotionCard>
            </ScrollAnimation>
          </Grid>
        ))}
      </Grid>

      {filteredPosts.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No articles found matching your search criteria.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Blog; 