import React from 'react';
import { Message } from '@/types/types';
import { User, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useOpen } from '@/store/isOpen';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const {open} = useOpen()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`rounded-full w-8 h-8 flex items-center justify-center ${isUser ? 'bg-blue-500 ml-2' : 'bg-gray-600 mr-2'}`}>
          {isUser ? <User size={16} color="white" /> : <Bot size={16} color="white" />}
        </div>
        <div className={`p-4 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
          <ReactMarkdown
            components={{
              p: ({ ...props }) => <p className={`prose dark:prose-invert ${open?"":"max-w-60"}`} {...props} />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};