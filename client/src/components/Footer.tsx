
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-muted py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-semibold">GradConnect</h3>
            <p className="text-sm text-muted-foreground">
              Connecting students and alumni for better career opportunities and mentorship.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-foreground">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/alumni" className="text-muted-foreground hover:text-foreground">
                  Alumni
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">support@gradconnect.com</li>
              <li className="text-muted-foreground">+1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} GradConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
