import { authAPI } from './api';
import store from '../features/store';
import {
  login,
  register,
  logout,
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from '../features/authSlice';

// Login user
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const resultAction = await dispatch(login(credentials));
    if (login.fulfilled.match(resultAction)) {
      return { success: true };
    } else {
      return { success: false, error: resultAction.payload };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    const resultAction = await dispatch(register(userData));
    if (register.fulfilled.match(resultAction)) {
      return { success: true };
    } else {
      return { success: false, error: resultAction.payload };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await authAPI.logout(); // Call the backend logout endpoint
    dispatch(logout());
  } catch (error) {
    console.error('Logout failed:', error);
    // Optionally dispatch a logout failure action
    dispatch(logout()); // Still clear frontend state even if backend logout fails
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await authAPI.getCurrentUser();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || 'Failed to get user data' };
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await authAPI.updateProfile(userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || 'Failed to update profile' };
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Get user role
export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.role || null;
};

// Check if user is admin
export const isAdmin = () => {
  const role = getUserRole();
  return role === 'admin';
};

export const verifyEmail = async (token) => {
  try {
    const response = await authAPI.verifyEmail(token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Email verification failed');
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await authAPI.forgotPassword(email);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to send password reset email');
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await authAPI.resetPassword(token, password);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};

export const updatePassword = async (passwordData) => {
  try {
    const response = await authAPI.updatePassword(passwordData);
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update password');
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
}; 