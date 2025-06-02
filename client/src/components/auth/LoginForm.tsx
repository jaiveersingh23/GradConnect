
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast.success('Logged in successfully!');
        // The App component will handle redirection based on user role
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login to GradConnect</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@university.edu"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-brand-navy hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-brand-navy hover:bg-brand-navy/90" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-navy hover:underline font-medium">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      {/* Demo credentials */}
      <Card className="w-full max-w-md mx-auto bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Demo Accounts</CardTitle>
          <CardDescription>
            Use these credentials to test the login functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Student Account:</h4>
            <p className="text-sm text-muted-foreground">
              Email: john.student@university.edu<br/>
              Password: student123
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Alumni Account:</h4>
            <p className="text-sm text-muted-foreground">
              Email: jane.alumni@university.edu<br/>
              Password: alumni123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
