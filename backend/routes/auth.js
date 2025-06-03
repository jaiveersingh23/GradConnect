
const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['student', 'alumni']).withMessage('Role must be student or alumni')
], async (req, res) => {
  try {
    console.log('=== REGISTER REQUEST ===');
    console.log('Request body:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, usn, batch, passingYear, branch, program } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user object
    const userData = { name, email, password, role };
    
    if (role === 'student') {
      userData.usn = usn;
    } else if (role === 'alumni') {
      userData.batch = batch;
      userData.passingYear = passingYear;
      userData.branch = branch;
      userData.program = program;
    }

    console.log('Creating user with data:', { ...userData, password: '[HIDDEN]' });
    
    user = new User(userData);
    await user.save();

    console.log('User created successfully:', user.email);

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    console.log('=== LOGIN REQUEST RECEIVED ===');
    console.log('Request method:', req.method);
    console.log('Request headers:', req.headers);
    console.log('Request body:', { ...req.body, password: req.body.password ? '[HIDDEN]' : 'MISSING' });
    console.log('Request origin:', req.get('Origin'));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    console.log('Password provided:', !!password);

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user.email);
    console.log('User role:', user.role);
    console.log('Stored password hash exists:', !!user.password);
    console.log('Stored password hash length:', user.password ? user.password.length : 0);
    console.log('Input password length:', password ? password.length : 0);

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('Password comparison failed for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful for user:', email);
    const token = generateToken(user._id);
    console.log('Generated token length:', token.length);

    const response = {
      token,
      user
    };

    console.log('Sending response:', { token: '[HIDDEN]', user: user.email });
    res.json(response);
  } catch (error) {
    console.error('Login error:', error.message);
    console.error('Login error stack:', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    console.log('=== GET ME REQUEST ===');
    console.log('User from token:', req.user.email);
    res.json(req.user);
  } catch (error) {
    console.error('Get me error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
