import React, { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatHeader } from '../ChatHeader';
import { ChatContainer } from '../ChatContainer';
import { ChatInput } from '../ChatInput';
import { SettingsPanel } from '../SettingsPanel';
import { ResizeHandle } from './ResizeHandle';
import { useChatStore } from '../../store/chatStore';
import { useOpen } from '@/store/isOpen';

interface ChatWidgetContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MIN_WIDTH = 320;
const MIN_HEIGHT = 400;
const DEFAULT_WIDTH = 380;
const DEFAULT_HEIGHT = 550;

export const ChatWidgetContainer: React.FC<ChatWidgetContainerProps> = ({ isOpen, onClose }) => {
  const { messages, isLoading, addMessage, setLoading, clearMessages } = useChatStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPosition = useRef({ x: 0, y: 0 });
  const {open, setOpen, toggleOpen} = useOpen()
  
  const prevDimensions = useRef(dimensions);
    
  
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    prevPosition.current = { x: e.clientX, y: e.clientY };
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - prevPosition.current.x;
      const deltaY = e.clientY - prevPosition.current.y;
      
      prevPosition.current = { x: e.clientX, y: e.clientY };
      
      setDimensions(prev => ({
        width: Math.max(MIN_WIDTH, prev.width + deltaX),
        height: Math.max(MIN_HEIGHT, prev.height + deltaY)
      }));
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const toggleExpand = () => {
    if (isExpanded) {
      // Restore previous dimensions
      setDimensions(prevDimensions.current);
    } else {
      // Save current dimensions before expanding
      prevDimensions.current = dimensions;
      // Expand to maximum size (80% of viewport)
      setDimensions({
        width: Math.min(window.innerWidth * 0.8, 800),
        height: Math.min(window.innerHeight * 0.8, 800)
      });
    }
    setIsExpanded(!isExpanded);
    toggleOpen();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          className="fixed bottom-24 right-6 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden z-50 flex flex-col"
          style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, type: 'spring', damping: 20 }}
        >
          <ChatHeader 
            onClearChat={clearMessages}
            onToggleSettings={() => setSettingsOpen(!settingsOpen)}
          />
        <ResizeHandle 
            isExpanded={isExpanded} 
            onToggleExpand={toggleExpand} 
            onResizeStart={handleResizeStart} 
          />
          <button 
            onClick={onClose}
            className="absolute top-5 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
          <ChatContainer messages={messages} isLoading={isLoading} />
          <ChatInput disabled={isLoading} />
          <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};