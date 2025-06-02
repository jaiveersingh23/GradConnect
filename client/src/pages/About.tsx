
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Users className="h-12 w-12 text-brand-navy" />,
      title: "Connect & Network",
      description: "Bridge the gap between current students and successful alumni through our comprehensive networking platform."
    },
    {
      icon: <Target className="h-12 w-12 text-brand-maroon" />,
      title: "Career Growth",
      description: "Access exclusive job opportunities, internships, and career guidance from industry professionals."
    },
    {
      icon: <Award className="h-12 w-12 text-brand-forest" />,
      title: "Mentorship",
      description: "Get personalized mentorship from alumni who have walked the same path and achieved success."
    },
    {
      icon: <Heart className="h-12 w-12 text-brand-gold" />,
      title: "Give Back",
      description: "Alumni can contribute to the community by sharing knowledge, posting jobs, and mentoring students."
    }
  ];

  const stats = [
    { number: "1000+", label: "Alumni Connected" },
    { number: "500+", label: "Students Helped" },
    { number: "250+", label: "Job Opportunities" },
    { number: "50+", label: "Events Hosted" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-brand-navy to-brand-navy/90 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About <span className="text-brand-gold">GradConnect</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Empowering students and alumni to build meaningful connections that drive career success and professional growth.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section className="py-16 container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              To create a thriving ecosystem where students and alumni can connect, collaborate, and support each other's professional journeys. We believe in the power of community and the impact of shared knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center card-hover">
                <CardHeader>
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-xl text-muted-foreground">
                Numbers that reflect our growing community and success stories
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-brand-navy mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                GradConnect was born from a simple observation: the most successful graduates often had strong connections with alumni who guided them through their career journey. However, these connections were often limited to personal networks or chance encounters.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We recognized the need for a structured platform that could systematically connect current students with successful alumni, creating opportunities for mentorship, job placements, and knowledge sharing that would benefit the entire university community.
              </p>
              <p className="text-lg leading-relaxed">
                Today, GradConnect serves as the bridge between past and present, enabling alumni to give back to their alma mater while helping current students accelerate their career growth through meaningful connections and shared experiences.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
