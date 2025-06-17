const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  console.log('Received blog creation request. Body:', req.body);
  console.log('User creating blog:', req.user);

  const { title, content, category, tags, image } = req.body;

  // Set initial status based on user role
  const initialStatus = req.user.role === 'admin' ? 'published' : 'pending';

  const blog = await Blog.create({
    title,
    content,
    category,
    tags,
    image,
    author: req.user._id,
    status: initialStatus,
  });

  if (blog) {
    res.status(201).json(blog);
  } else {
    res.status(400);
    throw new Error('Invalid blog data');
  }
});

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { content: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};
  const status = req.query.status ? { status: req.query.status } : { status: 'published' };

  const count = await Blog.countDocuments({ ...keyword, ...category, ...status });
  const blogs = await Blog.find({ ...keyword, ...category, ...status })
    .populate('author', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name');

  if (blog) {
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, category, tags, image, status } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to update this blog');
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;
    blog.image = image || blog.image;
    blog.status = status || blog.status;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to delete this blog');
    }

    await blog.remove();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Create new comment
// @route   POST /api/blogs/:id/comments
// @access  Private
const createBlogComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const comment = {
      text,
      user: req.user._id,
    };

    blog.comments.push(comment);
    await blog.save();
    res.status(201).json({ message: 'Comment added' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Like/Unlike blog
// @route   PUT /api/blogs/:id/like
// @access  Private
const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const alreadyLiked = blog.likes.includes(req.user._id);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      blog.likes.push(req.user._id);
    }

    await blog.save();
    res.json({ message: alreadyLiked ? 'Blog unliked' : 'Blog liked' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  createBlogComment,
  likeBlog,
}; 