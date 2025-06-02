
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using GradConnect, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Permission is granted to temporarily use GradConnect for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">As a user of GradConnect, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Respect other users and maintain professional conduct</li>
                <li>Not engage in harassment, spam, or inappropriate behavior</li>
                <li>Not post false or misleading information</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Content Ownership</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You retain ownership of any content you post on GradConnect. However, by posting content, you grant us a non-exclusive, royalty-free license to use, display, and distribute your content on the platform for the purpose of providing our services.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The materials on GradConnect are provided on an 'as is' basis. GradConnect makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at legal@gradconnect.com
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
