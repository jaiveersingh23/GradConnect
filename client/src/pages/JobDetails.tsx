
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Briefcase, MapPin, Calendar, User } from 'lucide-react';

// Mock job data - in a real app, this would come from an API
const mockJobDetails = {
  '1': {
    id: '1',
    title: 'Software Engineer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time' as const,
    salary: '$80,000 - $120,000',
    description: 'We are looking for a talented Software Engineer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '2+ years of experience in web development',
      'Proficiency in React, Node.js, and TypeScript',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Strong problem-solving skills'
    ],
    responsibilities: [
      'Develop and maintain web applications',
      'Collaborate with cross-functional teams',
      'Write clean, maintainable code',
      'Participate in code reviews',
      'Troubleshoot and debug applications'
    ],
    postedBy: {
      name: 'Sarah Johnson',
      role: 'Alumni',
      email: 'sarah.johnson@techinnovations.com'
    },
    createdAt: '2023-05-10T12:00:00Z'
  },
  '2': {
    id: '2',
    title: 'Data Science Intern',
    company: 'DataWorks',
    location: 'Remote',
    type: 'Internship' as const,
    salary: '$25/hour',
    description: 'Join our data science team as an intern and gain hands-on experience with machine learning, data analysis, and visualization.',
    requirements: [
      'Currently pursuing a degree in Data Science, Statistics, or related field',
      'Knowledge of Python and data science libraries (pandas, numpy, scikit-learn)',
      'Familiarity with SQL and databases',
      'Basic understanding of machine learning concepts',
      'Strong analytical and communication skills'
    ],
    responsibilities: [
      'Assist in data collection and cleaning',
      'Perform exploratory data analysis',
      'Build and test machine learning models',
      'Create data visualizations and reports',
      'Present findings to the team'
    ],
    postedBy: {
      name: 'Michael Chen',
      role: 'Alumni',
      email: 'michael.chen@dataworks.com'
    },
    createdAt: '2023-05-08T09:30:00Z'
  },
  '3': {
    id: '3',
    title: 'Marketing Coordinator',
    company: 'Brand Builders',
    location: 'New York, NY',
    type: 'Full-time' as const,
    salary: '$45,000 - $60,000',
    description: 'We are seeking a creative and organized Marketing Coordinator to help execute marketing campaigns and support our brand initiatives.',
    requirements: [
      'Bachelor\'s degree in Marketing, Communications, or related field',
      '1-2 years of marketing experience',
      'Proficiency in social media platforms and marketing tools',
      'Strong written and verbal communication skills',
      'Experience with Adobe Creative Suite is a plus'
    ],
    responsibilities: [
      'Coordinate marketing campaigns across multiple channels',
      'Manage social media accounts and content',
      'Assist with event planning and execution',
      'Create marketing materials and presentations',
      'Analyze campaign performance and report metrics'
    ],
    postedBy: {
      name: 'Alex Rodriguez',
      role: 'Alumni',
      email: 'alex.rodriguez@brandbuilders.com'
    },
    createdAt: '2023-05-07T15:45:00Z'
  },
  '4': {
    id: '4',
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    location: 'Chicago, IL',
    type: 'Part-time' as const,
    salary: '$30/hour',
    description: 'Join our design team to create beautiful and intuitive user experiences for our web and mobile applications.',
    requirements: [
      'Bachelor\'s degree in Design, HCI, or related field',
      '2+ years of UX/UI design experience',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Strong portfolio showcasing design projects',
      'Understanding of user-centered design principles'
    ],
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and mockups',
      'Collaborate with developers and product managers',
      'Maintain and evolve design systems'
    ],
    postedBy: {
      name: 'Emily Wilson',
      role: 'Alumni',
      email: 'emily.wilson@creativesolutions.com'
    },
    createdAt: '2023-05-05T11:20:00Z'
  }
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const job = id ? mockJobDetails[id as keyof typeof mockJobDetails] : null;

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 container">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-6">The job you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/jobs')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-brand-navy text-white';
      case 'Part-time':
        return 'bg-brand-forest text-white';
      case 'Internship':
        return 'bg-brand-gold text-black';
      case 'Contract':
        return 'bg-brand-maroon text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/jobs')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold mb-2">{job.title}</CardTitle>
                  <CardDescription className="text-xl">{job.company}</CardDescription>
                </div>
                <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-1 h-4 w-4" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  Posted by {job.postedBy.name}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{job.description}</p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Contact Person:</strong> {job.postedBy.name}</p>
                <p><strong>Email:</strong> {job.postedBy.email}</p>
                <p><strong>Role:</strong> {job.postedBy.role}</p>
              </div>
              <div className="mt-6">
                <Button className="bg-brand-navy hover:bg-brand-navy/90">
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetails;
