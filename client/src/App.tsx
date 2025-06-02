
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import Alumni from "./pages/Alumni";
import Chat from "./pages/Chat";
import Events from "./pages/Events";
import StudentPortal from "./pages/StudentPortal";
import AlumniPortal from "./pages/AlumniPortal";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import WriteBlog from "./pages/WriteBlog";
import HostEvent from "./pages/HostEvent";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
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

  // If user is not logged in, redirect to login
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // If user is logged in, show authenticated routes
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Navigate to={user.role === 'student' ? '/student-portal' : '/alumni-portal'} replace />} />
      <Route path="/register" element={<Navigate to={user.role === 'student' ? '/student-portal' : '/alumni-portal'} replace />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/alumni" element={<Alumni />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/events" element={<Events />} />
      <Route path="/student-portal" element={<StudentPortal />} />
      <Route path="/alumni-portal" element={<AlumniPortal />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/write-blog" element={<WriteBlog />} />
      <Route path="/host-event" element={<HostEvent />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
