
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, MessageSquare, User } from 'lucide-react';

const features = [
  {
    icon: <Briefcase className="h-10 w-10 text-brand-navy" />,
    title: 'Job Opportunities',
    description: 'Access exclusive job and internship postings from alumni and partner companies.',
  },
  {
    icon: <User className="h-10 w-10 text-brand-maroon" />,
    title: 'Alumni Mentorship',
    description: 'Connect with successful graduates for guidance, advice, and professional development.',
  },
  {
    icon: <Calendar className="h-10 w-10 text-brand-forest" />,
    title: 'Networking Events',
    description: 'Participate in virtual and in-person events to expand your professional network.',
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-brand-gold" />,
    title: 'Direct Messaging',
    description: 'Communicate directly with alumni and peers to build meaningful relationships.',
  },
];

const FeatureSection = () => {
  return (
    <section className="py-16 container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How GradConnect Helps You</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our platform offers everything you need to kickstart your career and build valuable connections.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="card-hover border-t-4 border-t-[color:var(--brand-color)]" style={{'--brand-color': index === 0 ? '#0a3d62' : index === 1 ? '#6F1E51' : index === 2 ? '#1e824c' : '#f39c12'} as React.CSSProperties}>
            <CardHeader className="pb-2">
              <div className="mb-2">{feature.icon}</div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
