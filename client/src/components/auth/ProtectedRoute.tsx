
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('student' | 'alumni')[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center container">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle>Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You need to be logged in to access this page.
            </p>
            <Link to="/login">
              <Button className="w-full bg-brand-navy hover:bg-brand-navy/90">
                Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center container">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <ShieldAlert className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <CardTitle>Unauthorized Access</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-muted-foreground">
              This page is for {allowedRoles.join(' and ')} only.
            </p>
            <Link to={user.role === 'student' ? '/student-portal' : '/alumni-portal'}>
              <Button className="w-full bg-brand-navy hover:bg-brand-navy/90">
                Go to Your Portal
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
