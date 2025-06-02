
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with other users. This may include your name, email address, university details, and professional information.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Usage Information</h4>
                <p className="text-muted-foreground">
                  We collect information about how you use our platform, including the pages you visit, features you use, and interactions with other users.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To provide and maintain our services</li>
                <li>To facilitate connections between students and alumni</li>
                <li>To send you important updates and notifications</li>
                <li>To improve our platform and user experience</li>
                <li>To ensure the security and safety of our users</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with other users as part of the platform's functionality (such as your profile information when you connect with others).
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@gradconnect.com
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
