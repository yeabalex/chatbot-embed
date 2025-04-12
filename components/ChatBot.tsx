'use client';
import React, { useState, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatContainer } from './ChatContainer';
import { ChatInput } from './ChatInput';
import { SettingsPanel } from './SettingsPanel';
import { useChatStore } from '../store/chatStore';
import { nanoid } from 'nanoid';
import axios from 'axios';

export const ChatBot: React.FC = () => {
  const { messages, isLoading, addMessage, setLoading, clearMessages } = useChatStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  useEffect(() => {
    const existingSessionId = sessionStorage.getItem('chatSessionId');
    if (existingSessionId) {
      setSessionId(existingSessionId);
      console.log('Using existing session ID:', existingSessionId);
    } else {
      const newSessionId = nanoid();
      sessionStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
      console.log('Generated new session ID:', newSessionId);
    }
  }, []);
 
  const handleSendMessage = async (content: string) => {
    const id = nanoid();
    addMessage(content, 'user');
    setLoading(true);
   
    try {
      if (!sessionId) {
        throw new Error('No session ID available');
      }
      
      const response = await axios.post('http://localhost:3000/api/v1/query', {
        message: content,
        sessionId: sessionId,
        user_id:"",
        url: "",
      });
      
      // Add response from server
      addMessage(response.data.response || "I'm the AI assistant. I'm here to help you.", 'assistant');
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage("Sorry, I couldn't process your request. Please try again later.", 'assistant');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle clearing chat - you might want to generate a new session ID when chat is cleared
  const handleClearChat = () => {
    clearMessages();
    // Optionally generate a new session ID when chat is cleared
    // const newSessionId = nanoid();
    // sessionStorage.setItem('chatSessionId', newSessionId);
    // setSessionId(newSessionId);
  };
 
  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:text-white overflow-hidden">
      <ChatHeader
        onClearChat={handleClearChat}
        onToggleSettings={() => setSettingsOpen(!settingsOpen)}
      />
      <ChatContainer messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading || !sessionId} />
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};