
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import FeatureSection from '@/components/home/FeatureSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import JobsList from '@/components/jobs/JobsList';
import ChatButton from '@/components/home/ChatButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        <div className="container py-16">
          <JobsList />
        </div>
        <TestimonialsSection />
        <ChatButton />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
