
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { jobService } from '@/services/api';
import { useNavigate } from 'react-router-dom';

const JobPostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    applicationLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting job:', formData);
      
      // Prepare data for API
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        salary: formData.salary,
        description: formData.description,
        requirements: formData.requirements.split('\n').filter(req => req.trim()),
        responsibilities: formData.responsibilities.split('\n').filter(resp => resp.trim()),
        applicationLink: formData.applicationLink
      };

      const result = await jobService.createJob(jobData);
      console.log('Job created successfully:', result);
      
      toast.success('Job posted successfully!');
      
      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        type: '',
        salary: '',
        description: '',
        requirements: '',
        responsibilities: '',
        applicationLink: '',
      });

      // Redirect to jobs page after a short delay
      setTimeout(() => {
        navigate('/jobs');
      }, 1500);
      
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Post a New Job</CardTitle>
        <CardDescription>
          Share job opportunities with students and recent graduates
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Software Engineer"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="e.g. Tech Innovations Inc."
                required
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. San Francisco, CA or Remote"
                required
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Job Type</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('type', value)}
                value={formData.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary (Optional)</Label>
              <Input
                id="salary"
                name="salary"
                placeholder="e.g. $80,000 - $120,000"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the job responsibilities and details"
              rows={5}
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements (One per line)</Label>
            <Textarea
              id="requirements"
              name="requirements"
              placeholder="Bachelor's degree in Computer Science&#10;3+ years of experience&#10;Proficiency in React and Node.js"
              rows={4}
              required
              value={formData.requirements}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities (One per line)</Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              placeholder="Develop and maintain web applications&#10;Collaborate with cross-functional teams&#10;Write clean, maintainable code"
              rows={4}
              value={formData.responsibilities}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="applicationLink">Application Link (Optional)</Label>
            <Input
              id="applicationLink"
              name="applicationLink"
              type="url"
              placeholder="https://example.com/apply"
              value={formData.applicationLink}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-brand-navy hover:bg-brand-navy/90" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting Job...' : 'Post Job'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default JobPostForm;
