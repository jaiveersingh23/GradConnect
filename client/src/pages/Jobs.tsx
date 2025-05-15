
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobsList from '@/components/jobs/JobsList';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Jobs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Job & Internship Opportunities</h1>
            <Link to="/post-job">
              <Button className="bg-brand-navy hover:bg-brand-navy/90 gap-2">
                <Plus className="h-4 w-4" />
                Post a Job
              </Button>
            </Link>
          </div>
          <p className="text-xl text-muted-foreground">
            Discover career opportunities posted by alumni and partner companies.
          </p>
        </div>
        <JobsList />
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
