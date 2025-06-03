
import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { blogService } from '@/services/api';

interface Blog {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: {
    _id: string;
    name: string;
    role: string;
    batch?: string;
    branch?: string;
  };
  createdAt: string;
}

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorTitle: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  image: string;
  authorId: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogDeleted = () => {
    fetchBlogs(); // Refresh the list after deletion
  };

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
    id: blog._id,
    title: blog.title,
    excerpt: blog.summary,
    author: blog.author.name,
    authorId: blog.author._id,
    authorTitle: `${blog.author.role}${blog.author.batch ? ` - ${blog.author.batch}` : ''}${blog.author.branch ? ` - ${blog.author.branch}` : ''}`,
    publishDate: blog.createdAt,
    readTime: `${Math.ceil(blog.content.length / 1000)} min read`,
    tags: ['Career', 'Experience'],
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
          <BlogCard key={blog.id} blog={blog} onDelete={handleBlogDeleted} />
        ))
      )}
    </div>
  );
};

export default BlogList;
