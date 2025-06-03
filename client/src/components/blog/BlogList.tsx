
import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
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

interface BlogCardProps {
  id: string; // Changed from number to string
  title: string;
  excerpt: string;
  author: string;
  authorTitle: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  image: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogService.getBlogs();
        setBlogs(data);
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        Loading blog posts...
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

  const blogProps: BlogCardProps[] = blogs.map(blog => ({
    id: blog._id, // This is now a string, matching the interface
    title: blog.title,
    excerpt: blog.summary,
    author: blog.author.name,
    authorTitle: `${blog.author.role}${blog.author.batch ? ` - ${blog.author.batch}` : ''}${blog.author.branch ? ` - ${blog.author.branch}` : ''}`,
    publishDate: blog.createdAt,
    readTime: `${Math.ceil(blog.content.length / 1000)} min read`,
    tags: ['Career', 'Experience'], // You might want to add tags to your Blog model
    image: "/placeholder.svg"
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogProps.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-500">
          No blog posts available at the moment.
        </div>
      ) : (
        blogProps.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))
      )}
    </div>
  );
};

export default BlogList;
