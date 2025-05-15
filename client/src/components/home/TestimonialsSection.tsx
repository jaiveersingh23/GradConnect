
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "GradConnect helped me find my first job through an alumni connection. The mentorship I received was invaluable for my career.",
    name: "Alex Johnson",
    role: "Software Developer",
    gradYear: "Class of 2022"
  },
  {
    quote: "As an alumnus, I enjoy giving back to my university community by posting job openings and mentoring students. This platform makes it seamless.",
    name: "Maria Garcia",
    role: "Marketing Director",
    gradYear: "Class of 2015"
  },
  {
    quote: "The networking events organized through GradConnect introduced me to industry leaders and helped me secure an amazing internship opportunity.",
    name: "James Wilson",
    role: "Finance Intern",
    gradYear: "Current Student"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from students and alumni who have found success through our platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4 text-brand-navy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="36" viewBox="0 0 45 36" fill="currentColor">
                    <path d="M13.5 0C6.04 0 0 6.04 0 13.5C0 20.96 6.04 27 13.5 27C15.05 27 18 26.5 18 26.5V36H27V20.25C27 9.05 17.78 0 13.5 0ZM13.5 18C11.02 18 9 15.98 9 13.5C9 11.02 11.02 9 13.5 9C15.98 9 18 11.02 18 13.5C18 15.98 15.98 18 13.5 18ZM40.5 0C33.04 0 27 6.04 27 13.5C27 20.96 33.04 27 40.5 27C42.05 27 45 26.5 45 26.5V36H36V20.25C36 9.05 45.22 0 40.5 0ZM40.5 18C38.02 18 36 15.98 36 13.5C36 11.02 38.02 9 40.5 9C42.98 9 45 11.02 45 13.5C45 15.98 42.98 18 40.5 18Z" fillOpacity="0.15"/>
                  </svg>
                </div>
                <p className="mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-brand-navy text-white grid place-content-center text-lg font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.gradYear}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
