
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Only show navbar if user is logged in
  if (!user) {
    return null;
  }

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
            <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'nav-link-active' : ''}`}>
              Blog
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span>{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/messages">
                  Messages
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
