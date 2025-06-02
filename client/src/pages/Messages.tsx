
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock recent chats data with enhanced information
  const recentChats = user?.role === 'student' ? [
    {
      id: 1,
      name: 'Jane Smith',
      role: 'alumni',
      company: 'Google',
      position: 'Software Engineer',
      lastMessage: 'Thanks for reaching out! I\'d be happy to help with your career questions.',
      timestamp: '2 hours ago',
      unread: true,
      online: true
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      role: 'alumni',
      company: 'Tesla',
      position: 'Senior Electrical Engineer',
      lastMessage: 'Let me know if you need any guidance on your projects.',
      timestamp: '1 day ago',
      unread: false,
      online: false
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'alumni',
      company: 'Microsoft',
      position: 'Product Manager',
      lastMessage: 'I can share some insights about product management roles.',
      timestamp: '3 days ago',
      unread: false,
      online: true
    }
  ] : [
    {
      id: 1,
      name: 'John Doe',
      role: 'student',
      usn: '1XX20CS001',
      year: '3rd Year',
      lastMessage: 'Thank you for the advice about internships!',
      timestamp: '1 hour ago',
      unread: true,
      online: true
    },
    {
      id: 2,
      name: 'Mike Johnson',
      role: 'student',
      usn: '1XX21CS015',
      year: '2nd Year',
      lastMessage: 'Could you review my resume when you have time?',
      timestamp: '3 hours ago',
      unread: false,
      online: false
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'student',
      usn: '1XX19CS042',
      year: '4th Year',
      lastMessage: 'Looking forward to your mentorship session!',
      timestamp: '1 day ago',
      unread: true,
      online: true
    }
  ];

  const handleChatClick = (chat: any) => {
    navigate('/chat', { state: { alumniName: chat.name, alumniId: chat.id } });
  };

  const handleNewMessage = () => {
    navigate('/alumni');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16 container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Messages</h1>
              <Button onClick={handleNewMessage} className="bg-brand-navy hover:bg-brand-navy/90">
                <Users className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
            <p className="text-muted-foreground">
              Your conversations with {user?.role === 'student' ? 'alumni mentors' : 'students you\'re mentoring'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Recent Chats
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search conversations..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent>
                  {recentChats.length > 0 ? (
                    <div className="space-y-2">
                      {recentChats.map((chat) => (
                        <div
                          key={chat.id}
                          onClick={() => handleChatClick(chat)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border transition-colors"
                        >
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-brand-navy text-white text-sm">
                                {chat.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {chat.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                              <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                            </div>
                            {user?.role === 'student' ? (
                              <p className="text-xs text-blue-600">{chat.company} • {chat.position}</p>
                            ) : (
                              <p className="text-xs text-blue-600">{chat.usn} • {chat.year}</p>
                            )}
                            <p className="text-xs text-muted-foreground truncate mt-1">
                              {chat.lastMessage}
                            </p>
                          </div>
                          {chat.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                      <p className="text-muted-foreground text-sm">
                        Start a conversation by visiting the {user?.role === 'student' ? 'Alumni' : 'Students'} directory
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Chat Preview/Stats */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Message Center</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground mb-6">
                      Choose a conversation from the left to start messaging
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-8 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-brand-navy">{recentChats.length}</div>
                        <div className="text-sm text-muted-foreground">Active Chats</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {recentChats.filter(chat => chat.online).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Online Now</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {recentChats.filter(chat => chat.unread).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Unread</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
