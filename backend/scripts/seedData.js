
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Job = require('../models/Job');
const Blog = require('../models/Blog');
const Event = require('../models/Event');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gradconnect');
    
    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});
    await Blog.deleteMany({});
    await Event.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john.student@university.edu',
        password: await bcrypt.hash('student123', 10),
        role: 'student',
        usn: '1XX20CS001',
        bio: ''
      },
      {
        name: 'Jane Smith',
        email: 'jane.alumni@university.edu',
        password: await bcrypt.hash('alumni123', 10),
        role: 'alumni',
        batch: '2018-2022',
        passingYear: '2022',
        branch: 'Computer Science',
        program: 'BE',
        bio: 'Software Engineer at Google with 3+ years of experience in full-stack development.'
      },
      {
        name: 'Mike Johnson',
        email: 'mike.student@university.edu',
        password: await bcrypt.hash('student456', 10),
        role: 'student',
        usn: '1XX21CS015',
        bio: ''
      },
      {
        name: 'Sarah Wilson',
        email: 'sarah.alumni@university.edu',
        password: await bcrypt.hash('alumni456', 10),
        role: 'alumni',
        batch: '2016-2020',
        passingYear: '2020',
        branch: 'Electrical Engineering',
        program: 'BE',
        bio: 'Senior Electrical Engineer at Tesla. Specialized in battery technology.'
      }
    ]);

    console.log('Users created');

    // Get alumni users for jobs and blogs
    const alumni = users.filter(user => user.role === 'alumni');

    // Create jobs
    const jobs = await Job.insertMany([
      {
        title: 'Software Engineer',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$80,000 - $120,000',
        description: 'We are looking for a talented Software Engineer to join our growing team.',
        requirements: [
          'Bachelor\'s degree in Computer Science',
          '2+ years of experience in web development',
          'Proficiency in React, Node.js, and TypeScript'
        ],
        responsibilities: [
          'Develop and maintain web applications',
          'Collaborate with cross-functional teams',
          'Write clean, maintainable code'
        ],
        postedBy: alumni[0]._id
      },
      {
        title: 'Data Science Intern',
        company: 'DataWorks',
        location: 'Remote',
        type: 'Internship',
        salary: '$25/hour',
        description: 'Join our data science team as an intern.',
        requirements: [
          'Currently pursuing a degree in Data Science',
          'Knowledge of Python and data science libraries',
          'Familiarity with SQL and databases'
        ],
        responsibilities: [
          'Assist in data collection and cleaning',
          'Perform exploratory data analysis',
          'Build and test machine learning models'
        ],
        postedBy: alumni[1]._id
      }
    ]);

    console.log('Jobs created');

    // Create blogs
    const blogs = await Blog.insertMany([
      {
        title: 'My Journey from Student to Software Engineer',
        content: 'Detailed content about the journey...',
        summary: 'A comprehensive guide on transitioning from university to tech industry.',
        author: alumni[0]._id
      },
      {
        title: 'Breaking into the Electric Vehicle Industry',
        content: 'Detailed content about EV industry...',
        summary: 'Insights into career opportunities in the growing EV sector.',
        author: alumni[1]._id
      }
    ]);

    console.log('Blogs created');

    // Create events
    const events = await Event.insertMany([
      {
        title: 'Tech Career Workshop',
        description: 'Learn about different career paths in technology.',
        date: new Date('2024-07-15'),
        time: '2:00 PM',
        location: 'Main Auditorium',
        type: 'Workshop',
        organizer: alumni[0]._id,
        maxAttendees: 50
      },
      {
        title: 'Alumni Networking Event',
        description: 'Connect with fellow alumni and current students.',
        date: new Date('2024-07-20'),
        time: '6:00 PM',
        location: 'Campus Center',
        type: 'Networking',
        organizer: alumni[1]._id,
        maxAttendees: 100
      }
    ]);

    console.log('Events created');
    console.log('Seed data created successfully!');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;
