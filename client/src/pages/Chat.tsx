
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { alumniName, alumniId } = location.state || { alumniName: 'Alumni', alumniId: 0 };
  
  const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: Date }[]>([
    { sender: 'system', text: `Start a conversation with ${alumniName}`, timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add user message
      const userMessage = { sender: 'user', text: newMessage, timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate alumni response after a short delay
      setTimeout(() => {
        const responses = [
          "Thanks for reaching out! How can I help you with your career questions?",
          "Good to connect with you! Feel free to ask me about my experience.",
          "Hi there! I'd be happy to chat about opportunities in my field.",
          "Hello! I'm glad to share my insights about the industry with you."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { 
          sender: 'alumni', 
          text: randomResponse, 
          timestamp: new Date() 
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

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
                  {alumniName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{alumniName}</h2>
                <p className="text-xs text-gray-200">Alumni</p>
              </div>
            </div>
          </div>
          
          <div 
            id="chat-messages" 
            className="h-[calc(100vh-300px)] overflow-y-auto p-4 bg-gray-50"
          >
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'alumni' && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarFallback className="bg-brand-gold text-brand-navy">
                      {alumniName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-brand-navy text-white rounded-tr-none' 
                      : message.sender === 'alumni'
                        ? 'bg-gray-200 text-gray-800 rounded-tl-none'
                        : 'bg-gray-100 text-gray-500 mx-auto text-center py-1 italic max-w-md'
                  }`}
                >
                  {message.text}
                  <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 ml-2 mt-1">
                    <AvatarFallback className="bg-gray-300">Me</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t flex">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-grow"
            />
            <Button 
              onClick={handleSendMessage} 
              className="ml-2 bg-brand-navy hover:bg-brand-navy/90"
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
