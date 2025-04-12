"use client";
import React, { useState } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatWidgetContainer } from "./ChatWidgetContainer";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  // This function would be called when a new message arrives
  const handleNewMessage = () => {
    if (!isOpen) {
      setUnreadCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <ChatBubble
        isOpen={isOpen}
        onClick={toggleChat}
        unreadCount={unreadCount}
      />
      <ChatWidgetContainer isOpen={isOpen} onClose={() => {setIsOpen(false)}} />
    </>
  );
};
