
const express = require('express');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/messages/conversations
// @desc    Get user's conversations
// @access  Private
router.get('/conversations', auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id
    })
    .populate('participants', 'name role usn batch branch')
    .sort({ lastMessageAt: -1 });
    
    res.json(conversations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/messages/conversations/:id
// @desc    Get messages in a conversation
// @access  Private
router.get('/conversations/:id', auth, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate('participants', 'name role');
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Check if user is participant
    if (!conversation.participants.some(p => p._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const messages = await Message.find({ conversationId: req.params.id })
      .populate('sender', 'name role')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/messages/conversations
// @desc    Create or get conversation
// @access  Private
router.post('/conversations', auth, async (req, res) => {
  try {
    const { participantId } = req.body;

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, participantId] }
    }).populate('participants', 'name role usn batch branch');

    if (!conversation) {
      conversation = new Conversation({
        participants: [req.user._id, participantId]
      });
      await conversation.save();
      await conversation.populate('participants', 'name role usn batch branch');
    }

    res.json(conversation);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/messages
// @desc    Send a message
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Check if user is participant
    if (!conversation.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const message = new Message({
      conversationId,
      sender: req.user._id,
      content
    });

    await message.save();
    await message.populate('sender', 'name role');

    // Update conversation
    conversation.lastMessage = content;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    res.status(201).json(message);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/messages/:id/read
// @desc    Mark message as read
// @access  Private
router.put('/:id/read', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.read = true;
    await message.save();

    res.json(message);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
