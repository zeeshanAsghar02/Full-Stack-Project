const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', protect, authorize('admin'), createEvent);
router.put('/:id', protect, authorize('admin'), updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

// Registration routes
router.post('/:id/register', protect, registerForEvent);
router.delete('/:id/register', protect, unregisterFromEvent);

module.exports = router; 