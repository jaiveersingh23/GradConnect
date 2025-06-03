
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { blogService } from '@/services/api';
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

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorTitle: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  image: string;
  authorId?: string;
}

interface BlogCardProps {
  blog: Blog;
  onDelete?: () => void;
}

const BlogCard = ({ blog, onDelete }: BlogCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await blogService.deleteBlog(blog.id);
      toast.success('Blog deleted successfully');
      onDelete?.();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    } finally {
      setIsDeleting(false);
    }
  };

  const canDelete = user?._id === blog.authorId || user?.role === 'alumni';

  return (
    <Card className="card-hover cursor-pointer relative" onClick={handleClick}>
      {canDelete && (
        <div className="absolute top-2 right-2 z-10">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700 bg-white/80 hover:bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this blog post? This action cannot be undone.
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
        </div>
      )}
      
      <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold leading-tight hover:text-brand-navy transition-colors">
          {blog.title}
        </h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{blog.excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-brand-navy text-white">
                {blog.author.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{blog.author}</p>
              <p className="text-xs text-muted-foreground">{blog.authorTitle}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(blog.publishDate).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {blog.readTime}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
