import { create } from 'zustand';
import { ChatState } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';

export const useChatStore = create<ChatState & {
  addUserId: (userId: string) => void;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}>((set) => ({
  messages: [],
  isLoading: false,
  userId: '',
  addMessage: (content, role) => set((state) => ({ 
    messages: [...state.messages, {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date()
    }]
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),
  addUserId: (userId)=>set({ userId: userId})
}));