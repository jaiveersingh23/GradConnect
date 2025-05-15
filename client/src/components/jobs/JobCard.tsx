
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  postedBy: {
    name: string;
    role: string;
  };
  createdAt: string;
}

const JobCard: React.FC<{ job: JobProps }> = ({ job }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-brand-navy text-white hover:bg-brand-navy/90';
      case 'Part-time':
        return 'bg-brand-forest text-white hover:bg-brand-forest/90';
      case 'Internship':
        return 'bg-brand-gold text-black hover:bg-brand-gold/90';
      case 'Contract':
        return 'bg-brand-maroon text-white hover:bg-brand-maroon/90';
      default:
        return 'bg-gray-500 text-white hover:bg-gray-500/90';
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
            <CardDescription className="text-base">{job.company}</CardDescription>
          </div>
          <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Briefcase className="mr-1 h-4 w-4" />
          <span>{job.location}</span>
          <span className="mx-2">•</span>
          <span>Posted by {job.postedBy.name}</span>
          <span className="mx-2">•</span>
          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
