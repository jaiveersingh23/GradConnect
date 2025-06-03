
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { blogService } from '@/services/api';

interface Blog {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: {
    name: string;
    role: string;
    batch?: string;
    branch?: string;
  };
  createdAt: string;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await blogService.getBlogById(id);
        setBlog(data);
      } catch (err) {
        setError('Failed to fetch blog post');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 container">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto mb-4"></div>
            <p>Loading blog post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 container">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The requested blog post could not be found.'}</p>
            <Button onClick={() => navigate('/blog')} className="bg-brand-navy hover:bg-brand-navy/90">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="mb-6 -ml-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
            
            <h1 className="text-4xl font-bold mb-6 leading-tight">{blog.title}</h1>
            
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-brand-navy text-white">
                    {blog.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{blog.author.name}</h3>
                  <p className="text-muted-foreground">
                    {blog.author.role}
                    {blog.author.batch && ` - ${blog.author.batch}`}
                    {blog.author.branch && ` - ${blog.author.branch}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(blog.createdAt)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {calculateReadTime(blog.content)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none mb-12">
            <div className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed">
              {blog.summary}
            </div>
            
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;