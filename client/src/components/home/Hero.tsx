
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-navy to-brand-navy/90 text-white">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Connect with Alumni, <br />
              <span className="text-brand-gold">Elevate Your Career</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-md">
              Join our community of students and alumni to access mentorship, job opportunities, and invaluable connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="bg-brand-gold text-black hover:bg-brand-gold/90">
                  Join Today
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-full flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-brand-navy p-4">
                <h3 className="font-bold text-white">Latest Opportunities</h3>
              </div>
              <div className="p-4 space-y-4">
                {['Software Engineer at TechCorp', 'Marketing Intern at BrandCo', 'Data Analyst at AnalyticsPro'].map((job, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200 hover:shadow transition-shadow">
                    <p className="font-medium">{job}</p>
                    <p className="text-sm text-gray-500">Posted {index + 1} day{index > 0 ? 's' : ''} ago</p>
                  </div>
                ))}
                <Link to="/jobs" className="block text-center text-brand-navy font-medium hover:underline">
                  View All Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
