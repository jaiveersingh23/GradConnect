
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useConversation } from '@/hooks/useConversation';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/api';

const Chat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { participantId } = useParams();
  
  // Get participant info from navigation state or use default
  const { participantName, participantId: stateParticipantId } = location.state || {};
  const targetParticipantId = participantId || stateParticipantId;
  
  const { conversation, messages, loading, sendMessage } = useConversation(targetParticipantId);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [otherUserInfo, setOtherUserInfo] = useState<{name: string, role: string} | null>(null);

  // Fetch user info if we don't have it from conversation
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (targetParticipantId && !conversation) {
        try {
          const userInfo = await userService.getUserById(targetParticipantId);
          setOtherUserInfo({ name: userInfo.name, role: userInfo.role });
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [targetParticipantId, conversation]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && !sending) {
      setSending(true);
      try {
        await sendMessage(newMessage);
        setNewMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setSending(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = Math.abs(now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border">
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading conversation...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get the other participant - try from conversation first, then from fetched user info, then from navigation state
  const otherParticipant = conversation?.participants.find(p => p._id !== user?._id) || otherUserInfo;
  const displayName = otherParticipant?.name || participantName || 'User';
  const displayRole = otherParticipant?.role || 'User';

  console.log('Chat render debug:', {
    conversation,
    otherParticipant,
    otherUserInfo,
    displayName,
    user: user?._id
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border">
          <div className="bg-brand-navy text-white p-4 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)} 
              className="mr-2 text-white hover:bg-brand-navy/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarFallback className="bg-brand-gold text-brand-navy">
                  {displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{displayName}</h2>
                <p className="text-xs text-gray-200 capitalize">{displayRole}</p>
              </div>
            </div>
          </div>
          
          <div 
            id="chat-messages" 
            className="h-[calc(100vh-300px)] overflow-y-auto p-4 bg-gray-50"
          >
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => {
                const isCurrentUser = message.sender._id === user?._id;
                return (
                  <div 
                    key={message._id} 
                    className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarFallback className="bg-brand-gold text-brand-navy">
                          {message.sender.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div 
                      className={`max-w-[70%] px-4 py-2 rounded-lg ${
                        isCurrentUser
                          ? 'bg-brand-navy text-white rounded-tr-none' 
                          : 'bg-gray-200 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      {message.content}
                      <div className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {formatMessageTime(message.createdAt)}
                      </div>
                    </div>
                    
                    {isCurrentUser && (
                      <Avatar className="h-8 w-8 ml-2 mt-1">
                        <AvatarFallback className="bg-gray-300">Me</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                );
              })
            )}
          </div>
          
          <div className="p-3 border-t flex">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-grow"
              disabled={sending}
            />
            <Button 
              onClick={handleSendMessage} 
              className="ml-2 bg-brand-navy hover:bg-brand-navy/90"
              disabled={sending || !newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
