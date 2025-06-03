
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PenTool, Save } from 'lucide-react';
import { toast } from 'sonner';
import { blogService } from '@/services/api';

const WriteBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.summary) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);

    try {
      console.log('Submitting blog:', formData);
      
      const result = await blogService.createBlog(formData);
      console.log('Blog created successfully:', result);
      
      toast.success('Blog post published successfully!');
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        summary: ''
      });

      // Redirect to blog page after a short delay
      setTimeout(() => {
        navigate('/blog');
      }, 1500);
      
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Failed to publish blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['alumni']}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <PenTool className="h-8 w-8" />
                Write Blog Post
              </h1>
              <p className="text-muted-foreground">
                Share your experiences and insights with the student community
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create New Blog Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter your blog post title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea
                      id="summary"
                      placeholder="Write a brief summary of your blog post..."
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your blog content here..."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Author: {user?.name}
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => navigate('/blog')}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-brand-navy hover:bg-brand-navy/90" disabled={isSubmitting}>
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? 'Publishing...' : 'Publish Blog'}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default WriteBlog;
