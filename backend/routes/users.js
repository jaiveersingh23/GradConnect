
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/alumni
// @desc    Get all alumni
// @access  Private
router.get('/alumni', auth, async (req, res) => {
  try {
    const alumni = await User.find({ role: 'alumni' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(alumni);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/students
// @desc    Get all students
// @access  Private
router.get('/students', auth, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, bio },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
