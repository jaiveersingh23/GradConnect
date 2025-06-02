
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Calendar, MessageCircle, Briefcase, Award, PlusCircle, CalendarPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AlumniPortal = () => {
  const { user } = useAuth();
  
  const features = [
    {
      icon: PlusCircle,
      title: "Post Job Opportunities",
      description: "Share job openings at your company",
      link: "/post-job"
    },
    {
      icon: Users,
      title: "Student Network",
      description: "Connect with current students for mentorship",
      link: "/alumni"
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Attend networking events and workshops",
      link: "/events"
    },
    {
      icon: CalendarPlus,
      title: "Host Events",
      description: "Organize workshops and networking sessions",
      link: "/host-event"
    },
    {
      icon: BookOpen,
      title: "Write Blog",
      description: "Share your experiences and insights",
      link: "/write-blog"
    },
    {
      icon: MessageCircle,
      title: "Messages",
      description: "Direct messaging with students and alumni",
      link: "/messages"
    }
  ];

  return (
    <ProtectedRoute allowedRoles={['alumni']}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}!</h1>
            <p className="text-xl text-muted-foreground">
              Give back to the community and help current students succeed.
            </p>
            <div className="mt-4 space-y-1">
              {user?.branch && (
                <p className="text-sm text-muted-foreground">
                  Branch: {user.branch}
                </p>
              )}
              {user?.batch && (
                <p className="text-sm text-muted-foreground">
                  Batch: {user.batch}
                </p>
              )}
              {user?.passingYear && (
                <p className="text-sm text-muted-foreground">
                  Passing Year: {user.passingYear}
                </p>
              )}
              {user?.program && (
                <p className="text-sm text-muted-foreground">
                  Program: {user.program}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-brand-navy rounded-lg">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Link to={feature.link}>
                    <Button className="w-full bg-brand-navy hover:bg-brand-navy/90">
                      Access
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AlumniPortal;
