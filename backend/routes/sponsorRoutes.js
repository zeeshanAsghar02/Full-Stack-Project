const express = require('express');
const router = express.Router();
const {
  createSponsor,
  getSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
  addEventToSponsor,
  removeEventFromSponsor,
} = require('../controllers/sponsorController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getSponsors);
router.get('/:id', getSponsorById);

// Protected routes (admin only)
router.post('/', protect, authorize('admin'), createSponsor);
router.put('/:id', protect, authorize('admin'), updateSponsor);
router.delete('/:id', protect, authorize('admin'), deleteSponsor);

// Event management routes (admin only)
router.put('/:id/events', protect, authorize('admin'), addEventToSponsor);
router.delete('/:id/events/:eventId', protect, authorize('admin'), removeEventFromSponsor);

module.exports = router; 