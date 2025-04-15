'use client';
import React from "react";
import { Bot, Trash2, Settings } from "lucide-react";

interface ChatHeaderProps {
  onClearChat: () => void;
  onToggleSettings: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onClearChat,
  onToggleSettings,
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="rounded-full bg-blue-500 p-2">
          <Bot size={20} color="white" />
        </div>
        <h1 className="text-xl font-semibold">AI Assistant</h1>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onToggleSettings}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Settings size={20} />
        </button>
        <button
          onClick={onClearChat}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};
