
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
