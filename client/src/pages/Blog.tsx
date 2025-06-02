
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogList from '@/components/blog/BlogList';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Blog = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Alumni Blog</h1>
            {user?.role === 'alumni' && (
              <Link to="/write-blog">
                <Button className="bg-brand-navy hover:bg-brand-navy/90 gap-2">
                  <Plus className="h-4 w-4" />
                  Write Blog
                </Button>
              </Link>
            )}
          </div>
          <p className="text-xl text-muted-foreground">
            Read insights, experiences, and advice from our alumni community.
          </p>
        </div>
        <BlogList />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
