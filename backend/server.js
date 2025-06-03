
// Verify Node.js version and dependencies
console.log('Node.js version:', process.version);
console.log('Starting GradConnect Backend...');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Verify Express is loaded correctly
console.log('Express version:', require('express/package.json').version);

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const jobRoutes = require('./routes/jobs');
const blogRoutes = require('./routes/blogs');
const eventRoutes = require('./routes/events');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// Middleware
app.use(helmet());
app.use(morgan('combined'));

// CORS configuration - Updated for Vercel deployment
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080',
    'https://grad-connect-seven.vercel.app',
    'https://grad-connect-jaiveersingh23s-projects.vercel.app',
    'https://grad-connect-git-main-jaiveersingh23s-projects.vercel.app',
    process.env.FRONTEND_URL,
    /\.railway\.app$/, // Allow all Railway app domains
    /\.up\.railway\.app$/, // Allow Railway preview URLs
    /\.vercel\.app$/ // Allow all Vercel domains
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // For legacy browser support
};

console.log('CORS origins:', corsOptions.origin);
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Root route for Railway
app.get('/', (req, res) => {
  res.json({ 
    message: 'GradConnect API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users',
      jobs: '/api/jobs',
      blogs: '/api/blogs',
      events: '/api/events',
      messages: '/api/messages'
    }
  });
});

// Test route for debugging
app.post('/api/test', (req, res) => {
  console.log('=== TEST ROUTE HIT ===');
  console.log('Body:', req.body);
  res.json({ message: 'Test route working', body: req.body });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error middleware triggered:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log('404 - Route not found:', req.method, req.originalUrl);
  res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gradconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  console.log('Environment variables loaded:');
  console.log('- MONGODB_URI:', !!process.env.MONGODB_URI);
  console.log('- JWT_SECRET:', !!process.env.JWT_SECRET);
  console.log('- FRONTEND_URL:', process.env.FRONTEND_URL);
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- PORT:', PORT);
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Server ready to accept requests`);
    if (process.env.RAILWAY_STATIC_URL) {
      console.log(`Railway URL: ${process.env.RAILWAY_STATIC_URL}`);
    }
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
