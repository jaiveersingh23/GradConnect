
const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name role batch branch')
      .sort({ createdAt: -1 });
    
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blogs/:id
// @desc    Get blog by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name role batch branch');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blogs
// @desc    Create a blog
// @access  Private (Alumni only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can write blogs' });
    }

    const { title, content, summary } = req.body;

    const blog = new Blog({
      title,
      content,
      summary,
      author: req.user._id
    });

    await blog.save();
    await blog.populate('author', 'name role batch branch');

    res.status(201).json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private (Blog author only)
router.put('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name role batch branch');

    res.json(updatedBlog);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private (Blog author only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
