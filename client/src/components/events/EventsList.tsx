
import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { eventService } from '@/services/api';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  organizer: {
    name: string;
    role: string;
  };
  attendees: any[];
  maxAttendees?: number;
}

interface EventCardProps {
  id: string; // Changed from number to string
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  speaker: string;
  speakerTitle: string;
  attendees: number;
  maxAttendees: number;
}

const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        Loading events...
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

  const eventProps: EventCardProps[] = events.map(event => ({
    id: event._id, // This is now a string, matching the interface
    title: event.title,
    type: event.type,
    date: event.date,
    time: event.time,
    location: event.location,
    description: event.description,
    speaker: event.organizer.name,
    speakerTitle: event.organizer.role,
    attendees: event.attendees.length,
    maxAttendees: event.maxAttendees || 100
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {eventProps.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-500">
          No events available at the moment.
        </div>
      ) : (
        eventProps.map((event) => (
          <EventCard key={event.id} event={event} />
        ))
      )}
    </div>
  );
};

export default EventsList;
