
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="grid h-12 w-12 place-content-center rounded-md bg-brand-navy text-white text-xl font-bold">
            GC
          </div>
          <span className="font-bold text-3xl">GradConnect</span>
        </div>
        <p className="text-muted-foreground">
          Connect with alumni, discover opportunities, and build your career
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
