import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  isOpen, 
  onClick, 
  unreadCount = 0 
}) => {
  return (
    <motion.button
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isOpen ? 0 : 1, 
        scale: isOpen ? 0.5 : 1,
        y: isOpen ? 20 : 0
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <MessageSquare size={24} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </motion.button>
  );
};
