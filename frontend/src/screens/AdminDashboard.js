import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { usersAPI, eventsAPI } from "../utils/api";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogError, setBlogError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: '',
    capacity: '',
  });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState(null);
  const [eventSuccess, setEventSuccess] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPendingBlogs = async () => {
      try {
        setBlogLoading(true);
        const response = await axios.get('http://localhost:5000/api/blogs?status=pending', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPendingBlogs(response.data.blogs);
        setBlogLoading(false);
      } catch (err) {
        setBlogError('Failed to fetch pending blogs');
        setBlogLoading(false);
      }
    };
    fetchPendingBlogs();
  }, []);

  const handleBlogReview = (blog) => {
    setSelectedBlog(blog);
    setReviewDialogOpen(true);
  };

  const handleBlogStatusUpdate = async (status) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${selectedBlog._id}`, 
        { status },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setPendingBlogs(pendingBlogs.filter(blog => blog._id !== selectedBlog._id));
      setReviewDialogOpen(false);
      setSelectedBlog(null);
    } catch (err) {
      setBlogError('Failed to update blog status');
    }
  };

  const handleEventInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEventForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setEventForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setEventError(null);
    setEventSuccess(null);
    setEventLoading(true);
    try {
      // Create event data object
      const eventData = {
        title: eventForm.title,
        description: eventForm.description,
        date: eventForm.date,
        time: eventForm.time,
        venue: eventForm.venue,
        category: eventForm.category,
        capacity: parseInt(eventForm.capacity),
      };

      // If there's an image, upload it first
      if (eventForm.image) {
        try {
          // Convert image to base64
          const base64Image = await convertToBase64(eventForm.image);
          
          console.log('Attempting to upload image:', {
            fileName: eventForm.image.name,
            fileSize: eventForm.image.size,
            base64Length: base64Image.length
          });

          // Upload the image
          const uploadRes = await axios.post('http://localhost:5000/api/upload', {
            file: base64Image,
            fileName: eventForm.image.name
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          console.log('Image upload response:', uploadRes.data);
          
          // Add the image URL to event data
          eventData.image = uploadRes.data.url;
        } catch (uploadError) {
          console.error('Image upload error details:', {
            message: uploadError.message,
            response: uploadError.response?.data,
            status: uploadError.response?.status,
            headers: uploadError.response?.headers,
            config: {
              url: uploadError.config?.url,
              method: uploadError.config?.method,
              headers: uploadError.config?.headers
            }
          });
          setEventError('Failed to upload image: ' + (uploadError.response?.data?.message || uploadError.message));
          setEventLoading(false);
          return;
        }
      }

      // Create the event with the complete data
      await eventsAPI.create(eventData);

      setEventSuccess('Event created successfully!');
      setEventForm({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        category: '',
        capacity: '',
        image: null,
      });
    } catch (err) {
      setEventError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setEventLoading(false);
    }
  };

  const handlePromoteUser = async (userId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        { role: 'admin' },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Refresh the user list after successful promotion
      fetchUsers();
    } catch (err) {
      console.error('Failed to promote user:', err);
      setError('Failed to promote user');
    }
  };

  const handleDemoteUser = async (userId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        { role: 'user' },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Refresh the user list after successful demotion
      fetchUsers();
    } catch (err) {
      console.error('Failed to demote user:', err);
      setError('Failed to demote user');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Divider sx={{ mb: 4 }} />

      {/* Pending Blogs Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Pending Blog Reviews
        </Typography>
        {blogLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : blogError ? (
          <Alert severity="error">{blogError}</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Date Submitted</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingBlogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.author.name}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="primary"
                        onClick={() => handleBlogReview(blog)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {pendingBlogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No pending blogs to review
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Blog Review Dialog */}
      <Dialog 
        open={reviewDialogOpen} 
        onClose={() => setReviewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedBlog && (
          <>
            <DialogTitle>{selectedBlog.title}</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" gutterBottom>
                By {selectedBlog.author.name} • {new Date(selectedBlog.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedBlog.content}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Category: {selectedBlog.category}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Tags: {selectedBlog.tags.join(', ')}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => handleBlogStatusUpdate('rejected')} 
                color="error"
              >
                Reject
              </Button>
              <Button 
                onClick={() => handleBlogStatusUpdate('published')} 
                color="success"
                variant="contained"
              >
                Approve & Publish
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* User Management Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          User Management
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell align="center">
                      {user.role === "user" && (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          color="secondary"
                          onClick={() => handlePromoteUser(user._id)}
                        >
                          Promote to Admin
                        </Button>
                      )}
                      {user.role === "admin" && user._id !== localStorage.getItem('userId') && (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          color="warning"
                          onClick={() => handleDemoteUser(user._id)}
                        >
                          Demote to User
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Event Creation Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Create New Event
        </Typography>
        {eventError && <Alert severity="error" sx={{ mb: 2 }}>{eventError}</Alert>}
        {eventSuccess && <Alert severity="success" sx={{ mb: 2 }}>{eventSuccess}</Alert>}
        <Box component="form" onSubmit={handleEventSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
          <TextField label="Title" name="title" required fullWidth value={eventForm.title} onChange={handleEventInputChange} />
          <TextField label="Description" name="description" required fullWidth multiline rows={3} value={eventForm.description} onChange={handleEventInputChange} />
          <TextField label="Date" name="date" type="date" InputLabelProps={{ shrink: true }} required fullWidth value={eventForm.date} onChange={handleEventInputChange} />
          <TextField label="Time" name="time" type="time" InputLabelProps={{ shrink: true }} required fullWidth value={eventForm.time} onChange={handleEventInputChange} />
          <TextField label="Venue" name="venue" required fullWidth value={eventForm.venue} onChange={handleEventInputChange} />
          <TextField label="Category" name="category" required fullWidth value={eventForm.category} onChange={handleEventInputChange} />
          <TextField label="Capacity" name="capacity" type="number" required fullWidth value={eventForm.capacity} onChange={handleEventInputChange} />
          <Button variant="contained" component="label">
            Upload Event Image (Optional)
            <input type="file" name="image" hidden onChange={handleEventInputChange} />
          </Button>
          {eventForm.image && (
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Selected file: {eventForm.image.name}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" disabled={eventLoading}>
            {eventLoading ? 'Creating...' : 'Create Event'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default AdminDashboard;
