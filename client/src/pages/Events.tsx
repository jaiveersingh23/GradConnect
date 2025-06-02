
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsList from '@/components/events/EventsList';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Events = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Upcoming Events</h1>
            {user?.role === 'alumni' && (
              <Link to="/host-event">
                <Button className="bg-brand-navy hover:bg-brand-navy/90 gap-2">
                  <Plus className="h-4 w-4" />
                  Host Event
                </Button>
              </Link>
            )}
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Join workshops, meetups, lectures, and networking events to enhance your skills and expand your network.
          </p>
        </div>
        <EventsList />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
