
import React, { useState, useEffect } from 'react';
import JobCard, { JobProps } from './JobCard';
import { jobService } from '@/services/api';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  postedBy: {
    _id: string;
    name: string;
    role: string;
  };
  createdAt: string;
}

const JobsList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobs();
      setJobs(data);
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobDeleted = () => {
    fetchJobs(); // Refresh the list after deletion
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        Loading job opportunities...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  const jobProps: JobProps[] = jobs.map(job => ({
    id: job._id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    postedBy: {
      _id: job.postedBy._id,
      name: job.postedBy.name,
      role: job.postedBy.role
    },
    createdAt: job.createdAt
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest Opportunities</h2>
      </div>
      {jobProps.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No job opportunities available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobProps.map(job => (
            <JobCard key={job.id} job={job} onDelete={handleJobDeleted} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsList;
