
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface Event {
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

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'workshop':
        return 'bg-blue-100 text-blue-800';
      case 'meetup':
        return 'bg-green-100 text-green-800';
      case 'lecture':
        return 'bg-purple-100 text-purple-800';
      case 'competition':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
          <div className="text-sm text-muted-foreground flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {event.attendees}/{event.maxAttendees}
          </div>
        </div>
        <CardTitle className="text-xl">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{event.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {event.time}
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="font-medium text-sm">{event.speaker}</p>
          <p className="text-xs text-muted-foreground">{event.speakerTitle}</p>
        </div>

        <Button className="w-full bg-brand-navy hover:bg-brand-navy/90">
          Register Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
