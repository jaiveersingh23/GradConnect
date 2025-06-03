
import { useState, useEffect } from 'react';
import { messageService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    role: string;
  };
  content: string;
  createdAt: string;
  read: boolean;
}

interface Conversation {
  _id: string;
  participants: Array<{
    _id: string;
    name: string;
    role: string;
  }>;
}

export const useConversation = (participantId?: string) => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Create or get conversation
  const initializeConversation = async (targetParticipantId: string) => {
    if (!user) {
      console.log('Cannot initialize conversation: no user');
      return;
    }
    
    try {
      setLoading(true);
      console.log('=== INITIALIZING CONVERSATION ===');
      console.log('Current user:', user);
      console.log('Target participant ID:', targetParticipantId);
      
      const response = await messageService.createConversation({ participantId: targetParticipantId });
      console.log('Conversation response:', response);
      setConversation(response);
      
      // Load messages for this conversation
      const messagesResponse = await messageService.getConversationMessages(response._id);
      console.log('Messages loaded:', messagesResponse);
      setMessages(messagesResponse);
    } catch (error) {
      console.error('Error initializing conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = async (content: string) => {
    if (!conversation || !user) {
      console.error('Cannot send message: missing conversation or user', {
        conversation: !!conversation,
        user: !!user
      });
      return;
    }

    try {
      console.log('=== SENDING MESSAGE ===');
      console.log('Content:', content);
      console.log('Conversation ID:', conversation._id);
      console.log('Current user:', user);
      
      const newMessage = await messageService.sendMessage({
        conversationId: conversation._id,
        content
      });
      
      console.log('Message sent successfully:', newMessage);
      setMessages(prev => {
        const updated = [...prev, newMessage];
        console.log('Updated messages array:', updated);
        return updated;
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Load conversation on mount if participantId provided
  useEffect(() => {
    console.log('=== USECONVERSATION EFFECT ===');
    console.log('Participant ID:', participantId);
    console.log('User:', user);
    
    if (participantId && user) {
      initializeConversation(participantId);
    }
  }, [participantId, user]);

  return {
    conversation,
    messages,
    loading,
    sendMessage,
    initializeConversation
  };
};
