
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobPostForm from '@/components/jobs/JobPostForm';

const PostJob = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Post a Job or Internship</h1>
          <p className="text-xl text-muted-foreground">
            Share opportunities with students and recent graduates
          </p>
        </div>
        <JobPostForm />
      </main>
      <Footer />
    </div>
  );
};

export default PostJob;
