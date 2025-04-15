'use client';
import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatContainer } from './ChatContainer';
import { ChatInput } from './ChatInput';
import { SettingsPanel } from './SettingsPanel';
import { useChatStore } from '../store/chatStore';


export const ChatBot: React.FC = () => {
  const { messages, isLoading,clearMessages } = useChatStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  //const [sessionId, setSessionId] = useState<string | null>(null);
  
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
      <ChatInput disabled={isLoading} />
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};