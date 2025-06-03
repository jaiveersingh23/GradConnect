
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock } from 'lucide-react';

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
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <Card className="card-hover cursor-pointer" onClick={handleClick}>
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
