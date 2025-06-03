
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { eventService } from '@/services/api';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Event {
  id: string;
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
  organizerId?: string;
  isRegistered?: boolean;
}

interface EventCardProps {
  event: Event;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const EventCard = ({ event, onUpdate, onDelete }: EventCardProps) => {
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(event.isRegistered || false);

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
      case 'networking':
        return 'bg-green-100 text-green-800';
      case 'seminar':
        return 'bg-purple-100 text-purple-800';
      case 'career fair':
        return 'bg-orange-100 text-orange-800';
      case 'alumni meet':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      if (isRegistered) {
        await eventService.unregisterFromEvent(event.id);
        setIsRegistered(false);
        toast.success('Successfully unregistered from event');
      } else {
        await eventService.registerForEvent(event.id);
        setIsRegistered(true);
        toast.success('Successfully registered for event');
      }
      onUpdate?.();
    } catch (error) {
      console.error('Error with event registration:', error);
      toast.error('Failed to update registration');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await eventService.deleteEvent(event.id);
      toast.success('Event deleted successfully');
      onDelete?.();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setIsDeleting(false);
    }
  };

  const canDelete = user?._id === event.organizerId || user?.role === 'alumni';
  const eventIsFull = event.attendees >= event.maxAttendees;

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {event.attendees}/{event.maxAttendees}
            </div>
            {canDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Event</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this event? This action cannot be undone and all registrations will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
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

        <Button 
          className={`w-full ${isRegistered ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-navy hover:bg-brand-navy/90'}`}
          onClick={handleRegister}
          disabled={isRegistering || (!isRegistered && eventIsFull)}
        >
          {isRegistering ? 'Processing...' : 
           isRegistered ? 'Unregister' : 
           eventIsFull ? 'Event Full' : 'Register Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
