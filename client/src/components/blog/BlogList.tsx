
import React from 'react';
import BlogCard from './BlogCard';

const BlogList = () => {
  const blogs = [
    {
      id: 1,
      title: "My Journey from Student to Senior Software Engineer",
      excerpt: "Sharing my experience transitioning from college to a successful career in tech, including challenges faced and lessons learned.",
      author: "Sarah Johnson",
      authorTitle: "Senior Software Engineer at Google",
      publishDate: "2024-12-01",
      readTime: "5 min read",
      tags: ["Career", "Tech", "Personal Growth"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Cracking the Technical Interview: A Complete Guide",
      excerpt: "Everything you need to know about preparing for technical interviews, from data structures to system design.",
      author: "Michael Chen",
      authorTitle: "Engineering Manager at Meta",
      publishDate: "2024-11-28",
      readTime: "8 min read",
      tags: ["Interview", "Programming", "Career Tips"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Working at a Startup vs Big Tech: My Experience",
      excerpt: "Comparing the pros and cons of working at startups versus large tech companies based on my career journey.",
      author: "Emily Rodriguez",
      authorTitle: "Product Manager at Stripe",
      publishDate: "2024-11-25",
      readTime: "6 min read",
      tags: ["Startup", "Big Tech", "Career Choice"],
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Breaking into Data Science: A Non-CS Graduate's Story",
      excerpt: "How I transitioned from a business background to becoming a data scientist at a Fortune 500 company.",
      author: "David Park",
      authorTitle: "Data Scientist at Amazon",
      publishDate: "2024-11-22",
      readTime: "7 min read",
      tags: ["Data Science", "Career Change", "Learning"],
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
