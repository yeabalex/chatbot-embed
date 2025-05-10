import React from 'react';
import { Message } from '@/types/types';
import { User, Bot, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useOpen } from '@/store/isOpen';
import { useState } from 'react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const { open } = useOpen();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const messageTime = message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  }) : '';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fadeIn`}
    >
      <div className={`flex max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
        <div 
          className={`flex-shrink-0 rounded-full w-9 h-9 flex items-center justify-center shadow-sm
          ${isUser ? 'bg-blue-600 ml-3' : 'bg-gray-700 mr-3'}`}
        >
          {isUser ? <User size={18} color="white" /> : <Bot size={18} color="white" />}
        </div>
        
        <div className={`relative ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`p-4 rounded-xl shadow-sm 
            ${isUser ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}
            ${open ? 'max-w-xl' : 'max-w-2xl'}`}>
            
            {!isUser && (
              <button 
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Copy message"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-500 dark:text-gray-400" />}
              </button>
            )}
            
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p className={`mb-4 last:mb-0 text-sm leading-relaxed 
                    ${isUser ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`} {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className={`font-semibold ${isUser ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} {...props} />
                ),
                a: ({ node, href, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${isUser ? 'text-blue-200 hover:text-blue-100' : 'text-blue-600 dark:text-blue-400'} hover:underline underline-offset-2`}
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc ml-6 mb-4 space-y-2 text-sm" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal ml-6 mb-4 space-y-2 text-sm" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="pl-1" {...props} />
                ),
                h1: ({ node, ...props }) => (
                  <h1 className={`text-xl font-bold mt-6 mb-3 ${isUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`} {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className={`text-lg font-semibold mt-5 mb-2 ${isUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`} {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className={`text-md font-semibold mt-4 mb-2 ${isUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`} {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className={`border-l-4 ${isUser ? 'border-blue-400' : 'border-gray-300 dark:border-gray-600'} pl-4 py-1 my-3 italic`} {...props} />
                ),
                pre: ({ node, ...props }) => (
                  <pre className="bg-gray-800 text-gray-100 dark:bg-gray-900 rounded-md p-3 mb-4 overflow-x-auto text-sm font-mono" {...props} />
                ),
                hr: ({ node, ...props }) => (
                  <hr className="my-4 border-t border-gray-300 dark:border-gray-700" {...props} />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          
          {messageTime && (
            <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right mr-1' : 'ml-1'}`}>
              {messageTime}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};