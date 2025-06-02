
import React from 'react';
import EventCard from './EventCard';

const EventsList = () => {
  const events = [
    {
      id: 1,
      title: "Tech Career Workshop",
      type: "Workshop",
      date: "2024-12-15",
      time: "2:00 PM",
      location: "Virtual",
      description: "Learn about the latest trends in technology careers and how to position yourself for success.",
      speaker: "Sarah Johnson",
      speakerTitle: "Senior Software Engineer at Google",
      attendees: 45,
      maxAttendees: 100
    },
    {
      id: 2,
      title: "Alumni Networking Meetup",
      type: "Meetup",
      date: "2024-12-20",
      time: "6:00 PM",
      location: "Campus Center, Room 101",
      description: "Connect with fellow alumni in your area and expand your professional network.",
      speaker: "Multiple Alumni",
      speakerTitle: "Various Industries",
      attendees: 28,
      maxAttendees: 50
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      type: "Lecture",
      date: "2024-12-25",
      time: "10:00 AM",
      location: "Virtual",
      description: "An introduction to data science concepts, tools, and career opportunities in the field.",
      speaker: "Dr. Michael Chen",
      speakerTitle: "Data Scientist at Meta",
      attendees: 82,
      maxAttendees: 150
    },
    {
      id: 4,
      title: "Startup Pitch Competition",
      type: "Competition",
      date: "2025-01-05",
      time: "1:00 PM",
      location: "Innovation Hub",
      description: "Present your startup ideas to a panel of investors and industry experts.",
      speaker: "Investor Panel",
      speakerTitle: "Various VC Firms",
      attendees: 15,
      maxAttendees: 25
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
