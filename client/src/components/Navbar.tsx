
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-content-center rounded-md bg-brand-navy text-white">
              GC
            </div>
            <span className="font-bold text-xl">GradConnect</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}>
              Home
            </Link>
            <Link to="/jobs" className={`nav-link ${isActive('/jobs') ? 'nav-link-active' : ''}`}>
              Jobs
            </Link>
            <Link to="/events" className={`nav-link ${isActive('/events') ? 'nav-link-active' : ''}`}>
              Events
            </Link>
            <Link to="/alumni" className={`nav-link ${isActive('/alumni') ? 'nav-link-active' : ''}`}>
              Alumni
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="gap-2 bg-brand-navy hover:bg-brand-navy/90">
              <User className="h-4 w-4" />
              <span>Register</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
