
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Calendar, MessageCircle, Briefcase, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const StudentPortal = () => {
  const { user } = useAuth();
  
  const features = [
    {
      icon: Briefcase,
      title: "Job Opportunities",
      description: "Browse internships and entry-level positions",
      link: "/jobs"
    },
    {
      icon: Users,
      title: "Alumni Network",
      description: "Connect with alumni for mentorship",
      link: "/alumni"
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Join workshops and networking events",
      link: "/events"
    },
    {
      icon: BookOpen,
      title: "Blog",
      description: "Read experiences and insights from alumni",
      link: "/blog"
    },
    {
      icon: MessageCircle,
      title: "Messages",
      description: "Direct messaging with alumni",
      link: "/messages"
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Track your progress and milestones",
      link: "#"
    }
  ];

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-16 container">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}!</h1>
            <p className="text-xl text-muted-foreground">
              Your gateway to career opportunities, mentorship, and professional growth.
            </p>
            {user?.usn && (
              <p className="text-sm text-muted-foreground mt-2">
                USN: {user.usn}
              </p>
            )}
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

export default StudentPortal;
