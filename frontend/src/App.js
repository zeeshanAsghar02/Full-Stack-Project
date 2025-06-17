import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './features/store';
import { Box } from '@mui/material';

// Screens
import Home from './screens/Home';
import Events from './screens/Events';
import Blog from './screens/Blog';
import About from './screens/About';
import Contact from './screens/Contact';
import Login from './screens/Login';
import Register from './screens/Register';
import AdminDashboard from './screens/AdminDashboard';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A1A1A',
      light: '#2E2E2E',
      dark: '#000000',
    },
    secondary: {
      main: '#FFD700',
      light: '#FFE44D',
      dark: '#C7A600',
    },
    background: {
      default: '#F4F4F4',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#2E2E2E',
    },
  },
  typography: {
    fontFamily: "'Montserrat', 'Raleway', sans-serif",
    h1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
    },
    h5: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <div>Dashboard (Protected Route)</div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
