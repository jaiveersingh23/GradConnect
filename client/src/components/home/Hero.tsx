
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-navy to-brand-navy/90 text-white">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {user?.role === 'student' ? (
              <>
                Connect with Alumni, <br />
                <span className="text-brand-gold">Elevate Your Career</span>
              </>
            ) : (
              <>
                Give Back to Students, <br />
                <span className="text-brand-gold">Shape the Future</span>
              </>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            {user?.role === 'student' ? (
              'Join our community of students and alumni to access mentorship, job opportunities, and invaluable connections.'
            ) : (
              'Share your expertise, post job opportunities, and help current students succeed in their career journey.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to={user?.role === 'student' ? '/student-portal' : '/alumni-portal'}>
              <Button size="lg" className="bg-brand-gold text-black hover:bg-brand-gold/90">
                {user?.role === 'student' ? 'Explore Opportunities' : 'Start Contributing'}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
