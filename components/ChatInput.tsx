'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { useChatStore } from '@/store/chatStore';

interface ChatInputProps {
  origin?:string,
  user_id?: string;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ origin, user_id, disabled = false }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [session_id, setSession_id] = useState<string | null>(null);
  const { addMessage, setLoading } = useChatStore();

    useEffect(() => {
      const existingSessionId = sessionStorage.getItem('chatSessionId');
      if (existingSessionId) {
        setSession_id(existingSessionId);
        console.log('Using existing session ID:', existingSessionId);
      } else {
        const newSessionId = nanoid();
        sessionStorage.setItem('chatSessionId', newSessionId);
        setSession_id(newSessionId);
        console.log('Generated new session ID:', newSessionId);
      }
    }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (input.trim() && !disabled) {
          addMessage(input.trim(), 'user')
          try {
            console.log("fram here");
            if (!session_id) {
              throw new Error('No session ID available');
            }
            
            const response = await axios.post('http://localhost:3001/api/v1/query', {
              input_text: input.trim(),
              session_id: session_id,
              user_id: user_id,
              url:origin
            });
            
            // Add response from server
            addMessage(response.data.externalData.answer, 'assistant');
          } catch (error) {
            console.error('Error sending message:', error);
            addMessage("Sorry, I couldn't process your request. Please try again later.", 'assistant');
          }finally {
            setLoading(false);
          }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto-resize the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-800 p-4">
      <div className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Message the AI..."
          disabled={disabled}
          rows={1}
          className="w-full p-3 pr-12 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className={`absolute right-3 p-1 rounded-full ${
            !input.trim() || disabled ? 'text-gray-400' : 'text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};