
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { jobService } from '@/services/api';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  postedBy: {
    name: string;
    role: string;
    _id?: string;
  };
  createdAt: string;
}

interface JobCardProps {
  job: JobProps;
  onDelete?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleViewDetails = () => {
    navigate(`/jobs/${job.id}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await jobService.deleteJob(job.id);
      toast.success('Job deleted successfully');
      onDelete?.();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    } finally {
      setIsDeleting(false);
    }
  };

  const canDelete = user?._id === job.postedBy._id || user?.role === 'alumni';

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
            <CardDescription className="text-base">{job.company}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
            {canDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Job Post</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this job post? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
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
        <Button 
          variant="outline" 
          className="w-full border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
