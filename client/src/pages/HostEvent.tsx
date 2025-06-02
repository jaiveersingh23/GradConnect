
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, Save } from 'lucide-react';
import { toast } from 'sonner';

const HostEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    type: '',
    capacity: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.venue || !formData.type) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Here you would normally save to a database
    toast.success('Event hosted successfully!');
    navigate('/events');
  };

  return (
    <ProtectedRoute allowedRoles={['alumni']}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <CalendarPlus className="h-8 w-8" />
                Host Event
              </h1>
              <p className="text-muted-foreground">
                Organize workshops, networking sessions, and educational events for students
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create New Event</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter event title..."
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="venue">Venue *</Label>
                      <Input
                        id="venue"
                        placeholder="Enter event venue..."
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">Event Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="seminar">Seminar</SelectItem>
                          <SelectItem value="networking">Networking Session</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="panel">Panel Discussion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        placeholder="Maximum attendees"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your event, topics to be covered, and what attendees will learn..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Host: {user?.name}
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => navigate('/alumni-portal')}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-brand-navy hover:bg-brand-navy/90">
                        <Save className="h-4 w-4 mr-2" />
                        Host Event
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default HostEvent;
