const express = require('express');
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  createBlogComment,
  likeBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, createBlog);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);
router.route('/:id/comments').post(protect, createBlogComment);
router.route('/:id/like').put(protect, likeBlog);

module.exports = router; 