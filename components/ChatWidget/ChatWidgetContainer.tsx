'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatHeader } from '../ChatHeader';
import { ChatContainer } from '../ChatContainer';
import { ChatInput } from '../ChatInput';
import { SettingsPanel } from '../SettingsPanel';
import { useChatStore } from '../../store/chatStore';

interface ChatWidgetContainerProps {
  origin:string
  user_id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidgetContainer: React.FC<ChatWidgetContainerProps> = ({
  origin,
  user_id,
  isOpen,
  onClose,
}) => {
  const { messages, isLoading, clearMessages } = useChatStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, type: 'spring', damping: 20 }}
        >
          <ChatHeader
            onClearChat={clearMessages}
            onToggleSettings={() => setSettingsOpen(!settingsOpen)}
          />
          <button
            onClick={onClose}
            className="absolute top-5 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
          <div className="flex-1 overflow-hidden flex flex-col">
            <ChatContainer messages={messages} isLoading={isLoading} />
            <ChatInput disabled={isLoading} user_id={user_id} origin={origin}/>
          </div>
          <SettingsPanel
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
