const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin routes
router.route('/')
  .get(protect, authorize('admin'), getUsers);

// Profile routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// User management routes (admin only)
router.route('/:id')
  .delete(protect, authorize('admin'), deleteUser)
  .get(protect, authorize('admin'), getUserById)
  .put(protect, authorize('admin'), updateUser);

module.exports = router; 