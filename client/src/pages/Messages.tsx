
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { messageService } from '@/services/api';

interface Conversation {
  _id: string;
  participants: Array<{
    _id: string;
    name: string;
    role: string;
    usn?: string;
    batch?: string;
    branch?: string;
  }>;
  lastMessage: string;
  lastMessageAt: string;
}

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await messageService.getConversations();
        console.log('Fetched conversations:', data);
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchConversations();
    }
  }, [user]);

  const handleChatClick = (conversation: Conversation) => {
    const otherParticipant = conversation.participants.find(p => p._id !== user?._id);
    if (otherParticipant) {
      navigate(`/chat/${otherParticipant._id}`, { 
        state: { 
          participantName: otherParticipant.name, 
          participantId: otherParticipant._id 
        } 
      });
    }
  };

  const handleNewMessage = () => {
    navigate('/alumni');
  };

  const formatMessageTime = (timestamp: string) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = Math.abs(now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
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
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto mb-4"></div>
                      <p>Loading conversations...</p>
                    </div>
                  ) : conversations.length > 0 ? (
                    <div className="space-y-2">
                      {conversations.map((conversation) => {
                        const otherParticipant = conversation.participants.find(p => p._id !== user?._id);
                        if (!otherParticipant) return null;
                        
                        return (
                          <div
                            key={conversation._id}
                            onClick={() => handleChatClick(conversation)}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border transition-colors"
                          >
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-brand-navy text-white text-sm">
                                  {otherParticipant.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-sm truncate">{otherParticipant.name}</h3>
                                <span className="text-xs text-muted-foreground">
                                  {formatMessageTime(conversation.lastMessageAt)}
                                </span>
                              </div>
                              <p className="text-xs text-blue-600 capitalize">{otherParticipant.role}</p>
                              <p className="text-xs text-muted-foreground truncate mt-1">
                                {conversation.lastMessage || 'No messages yet'}
                              </p>
                            </div>
                          </div>
                        );
                      })}
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
                        <div className="text-2xl font-bold text-brand-navy">{conversations.length}</div>
                        <div className="text-sm text-muted-foreground">Active Chats</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <div className="text-sm text-muted-foreground">Online Now</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">0</div>
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
