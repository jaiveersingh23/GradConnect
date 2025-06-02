
const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name role')
      .sort({ createdAt: -1 });
    
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name role email');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/jobs
// @desc    Create a job
// @access  Private (Alumni only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'alumni') {
      return res.status(403).json({ message: 'Only alumni can post jobs' });
    }

    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      responsibilities,
      applicationLink
    } = req.body;

    const job = new Job({
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      applicationLink,
      postedBy: req.user._id
    });

    await job.save();
    await job.populate('postedBy', 'name role');

    res.status(201).json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private (Job poster only)
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('postedBy', 'name role');

    res.json(updatedJob);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private (Job poster only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
