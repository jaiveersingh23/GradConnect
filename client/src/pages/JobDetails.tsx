
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Briefcase, MapPin, Calendar, User } from 'lucide-react';
import { jobService } from '@/services/api';

interface JobDetail {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applicationLink?: string;
  postedBy: {
    name: string;
    role: string;
    email?: string;
  };
  createdAt: string;
}

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await jobService.getJobById(id);
        setJob(data);
      } catch (err) {
        setError('Failed to fetch job details');
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 container">
          <div className="text-center">Loading job details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
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
                {job.salary && (
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-4 w-4" />
                    {job.salary}
                  </div>
                )}
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
          {job.requirements && job.requirements.length > 0 && (
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
          )}

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
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
          )}

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Contact Person:</strong> {job.postedBy.name}</p>
                {job.postedBy.email && <p><strong>Email:</strong> {job.postedBy.email}</p>}
                <p><strong>Role:</strong> {job.postedBy.role}</p>
              </div>
              <div className="mt-6">
                {job.applicationLink ? (
                  <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-brand-navy hover:bg-brand-navy/90">
                      Apply Now
                    </Button>
                  </a>
                ) : (
                  <Button className="bg-brand-navy hover:bg-brand-navy/90">
                    Apply Now
                  </Button>
                )}
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
