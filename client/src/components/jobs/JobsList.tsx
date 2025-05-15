
import React from 'react';
import JobCard, { JobProps } from './JobCard';

// Mock data
const mockJobs: JobProps[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    postedBy: {
      name: 'Sarah Johnson',
      role: 'Alumni'
    },
    createdAt: '2023-05-10T12:00:00Z'
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'DataWorks',
    location: 'Remote',
    type: 'Internship',
    postedBy: {
      name: 'Michael Chen',
      role: 'Alumni'
    },
    createdAt: '2023-05-08T09:30:00Z'
  },
  {
    id: '3',
    title: 'Marketing Coordinator',
    company: 'Brand Builders',
    location: 'New York, NY',
    type: 'Full-time',
    postedBy: {
      name: 'Alex Rodriguez',
      role: 'Alumni'
    },
    createdAt: '2023-05-07T15:45:00Z'
  },
  {
    id: '4',
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    location: 'Chicago, IL',
    type: 'Part-time',
    postedBy: {
      name: 'Emily Wilson',
      role: 'Alumni'
    },
    createdAt: '2023-05-05T11:20:00Z'
  }
];

const JobsList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest Opportunities</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
